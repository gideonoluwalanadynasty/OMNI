import React, { useState, useEffect } from 'react';
import {
  PenTool,
  Mail,
  BookOpen,
  Mic,
  Video,
  Sparkles,
  Search,
  Image as ImageIcon,
  Calendar,
  BarChart3,
  Plus,
  Trash2,
  Save,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  Globe,
  Sliders,
  DollarSign,
  TrendingUp,
  Users,
  Copy,
  Check,
  Play,
  Volume2,
  Film,
  Zap,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import {
  OmniCreatorPost,
  OmniCreatorContentType,
  OmniSeoAnalysisReport
} from '../../../types';
import { omniContentPublishingService } from '../../../sdk/browser-services/OmniContentPublishingService';

export const OmniCreatorStudioView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'editor' | 'library' | 'analytics'>('editor');
  const [contentType, setContentType] = useState<OmniCreatorContentType>('blog');
  const [posts, setPosts] = useState<OmniCreatorPost[]>([]);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  // Editor form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tagsInput, setTagsInput] = useState('Technology, AI, Sovereign');
  const [primaryKeyword, setPrimaryKeyword] = useState('sovereign AI');
  const [coverImageUrl, setCoverImageUrl] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  );

  // Podcast / Video specific state
  const [audioUrl, setAudioUrl] = useState('https://assets.omni.com/podcasts/episode-sample.mp3');
  const [videoUrl, setVideoUrl] = useState('https://assets.omni.com/videos/stream-sample.mp4');
  const [newsletterIssue, setNewsletterIssue] = useState(33);

  // OMNI AI Suite Panel State
  const [aiTool, setAiTool] = useState<'writing' | 'seo' | 'image' | 'schedule'>('writing');
  const [aiTone, setAiTone] = useState<'Executive' | 'Provocative' | 'Academic' | 'Casual' | 'Technical'>('Executive');
  const [aiGeneratedOutput, setAiGeneratedOutput] = useState<string>('');
  const [aiHeadlineSuggestions, setAiHeadlineSuggestions] = useState<string[]>([]);
  const [seoReport, setSeoReport] = useState<OmniSeoAnalysisReport | null>(null);
  const [imageStyle, setImageStyle] = useState<'Minimalist Cyber' | 'Photorealistic Editorial' | 'Clean Vector' | 'Cinematic 3D' | 'Abstract Geometric'>('Minimalist Cyber');
  const [generatedImagePrompt, setGeneratedImagePrompt] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState('2026-08-18T10:00');
  const [scheduleTimezone, setScheduleTimezone] = useState('UTC (Zurich Standard Time)');
  const [isCopied, setIsCopied] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const refreshPosts = () => {
    const list = omniContentPublishingService.getCreatorPosts();
    setPosts(list);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const handleSelectPostToEdit = (post: OmniCreatorPost) => {
    setActivePostId(post.id);
    setContentType(post.contentType);
    setTitle(post.title);
    setSubtitle(post.subtitle || '');
    setBody(post.body);
    setExcerpt(post.excerpt || '');
    setTagsInput(post.tags.join(', '));
    setPrimaryKeyword(post.seo.primaryKeyword || 'technology');
    setCoverImageUrl(post.coverImageUrl);
    if (post.newsletterMetadata) setNewsletterIssue(post.newsletterMetadata.issueNumber);
    if (post.podcastMetadata) setAudioUrl(post.podcastMetadata.audioUrl);
    if (post.videoMetadata) setVideoUrl(post.videoMetadata.videoUrl);
    setActiveSubTab('editor');
  };

  const handleCreateNew = (type: OmniCreatorContentType) => {
    setActivePostId(null);
    setContentType(type);
    setTitle('');
    setSubtitle('');
    setBody('');
    setExcerpt('');
    setTagsInput('Technology, Sovereign');
    setPrimaryKeyword('technology');
    setAiGeneratedOutput('');
    setSeoReport(null);
    setActiveSubTab('editor');
  };

  const handleSaveDraft = () => {
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const postData: Partial<OmniCreatorPost> = {
      id: activePostId || undefined,
      contentType,
      title: title.trim() || 'Untitled Post',
      subtitle,
      body,
      excerpt: excerpt || body.slice(0, 140) + '...',
      coverImageUrl,
      tags,
      status: 'draft',
      seo: {
        metaTitle: title || 'Untitled',
        metaDescription: excerpt || body.slice(0, 140),
        primaryKeyword,
        seoScore: seoReport?.score || 78,
        readabilityGrade: seoReport?.readabilityGrade || 'Grade 8',
        searchIntent: (seoReport?.searchIntent as any) || 'informational'
      }
    };

    if (contentType === 'newsletter') {
      postData.newsletterMetadata = { issueNumber: newsletterIssue };
    } else if (contentType === 'podcast') {
      postData.podcastMetadata = {
        audioUrl,
        durationSeconds: 1800,
        episodeNumber: 19,
        seasonNumber: 2,
        audioWaveform: [30, 45, 80, 95, 60, 40, 70, 85, 90, 65, 40, 55],
        transcript: body,
        chapters: [{ timestamp: '00:00', title: 'Episode Overview' }]
      };
    } else if (contentType === 'video_channel') {
      postData.videoMetadata = {
        videoUrl,
        thumbnailUrl: coverImageUrl,
        durationMinutes: 14,
        channelName: 'Sovereign Studio TV',
        subscribersCount: 3820,
        chapters: [{ timestamp: '00:00', title: 'Introduction' }]
      };
    }

    const saved = omniContentPublishingService.saveCreatorPost(postData);
    setActivePostId(saved.id);
    refreshPosts();
    showNotification('Draft saved successfully to sovereign storage.');
  };

  const handlePublishNow = () => {
    handleSaveDraft();
    if (activePostId) {
      omniContentPublishingService.publishPost(activePostId);
      refreshPosts();
      showNotification('Published live to OMNI Discover and subscriber feed!');
    }
  };

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // OMNI AI Handlers
  const handleRunAiWriting = (mode: 'expand' | 'tone' | 'headline' | 'summarize' | 'polish') => {
    const textToProcess = body || title || 'Sovereign multi-agent operating systems in 2026';
    const res = omniContentPublishingService.generateAiWritingAssistance(mode, textToProcess, aiTone);
    if (res.suggestions) {
      setAiHeadlineSuggestions(res.suggestions);
    }
    setAiGeneratedOutput(res.result);
  };

  const handleRunAiSeo = () => {
    const report = omniContentPublishingService.analyzeSeo(title, body, primaryKeyword);
    setSeoReport(report);
  };

  const handleGenerateCoverArt = () => {
    const res = omniContentPublishingService.generateAiCoverPrompt(title || 'Sovereign AI', imageStyle);
    setGeneratedImagePrompt(res.prompt);
    setCoverImageUrl(res.imageUrl);
    showNotification(`Generated AI cover art with ${imageStyle} style.`);
  };

  const handleApplyHeadline = (hl: string) => {
    const clean = hl.replace(/^\d+\.\s*/, '');
    setTitle(clean);
    showNotification('Applied AI headline to title field.');
  };

  const handleAppendAiOutput = () => {
    setBody(prev => (prev ? prev + '\n\n' + aiGeneratedOutput : aiGeneratedOutput));
    showNotification('Appended AI generated text into body editor.');
  };

  return (
    <div id="omni-creator-studio-view" className="space-y-6">
      {/* 1. Header Banner & Studio Navigation Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-purple-950/40 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>OMNI CREATOR & PUBLISHING STUDIO</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
              Multi-Format Engine
            </span>
          </div>
          <h2 className="text-xl font-black text-stone-100 tracking-tight">
            Publish Across Blogs, Newsletters, Podcasts & Videos
          </h2>
          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            Create multi-channel sovereign content backed by OMNI AI writing co-pilots, real-time SEO scoring, and cryptographic monetization.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1.5 rounded-2xl shrink-0 text-xs">
          <button
            onClick={() => setActiveSubTab('editor')}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'editor'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Studio Editor</span>
          </button>

          <button
            onClick={() => setActiveSubTab('library')}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'library'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Published Posts ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Creator Telemetry</span>
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {notificationMsg && (
        <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* 2. SUB-TAB: STUDIO EDITOR */}
      {activeSubTab === 'editor' && (
        <div className="space-y-6">
          {/* Format Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'blog', label: 'Blog & Article', icon: <PenTool className="w-4 h-4" /> },
              { id: 'newsletter', label: 'Email Newsletter', icon: <Mail className="w-4 h-4" /> },
              { id: 'magazine', label: 'Magazine Editorial', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'podcast', label: 'Audio Podcast', icon: <Mic className="w-4 h-4" /> },
              { id: 'video_channel', label: 'Video Channel Clip', icon: <Video className="w-4 h-4" /> }
            ].map(fmt => {
              const isSelected = contentType === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setContentType(fmt.id as OmniCreatorContentType)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                    isSelected
                      ? 'bg-stone-100 text-stone-900 font-black shadow-md'
                      : 'bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {fmt.icon}
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Split: Editor on Left, OMNI AI Suite on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Rich Workspace Editor */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
                {/* Top Action Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 text-[10px] font-mono uppercase">
                      {contentType}
                    </span>
                    <span className="text-xs text-stone-400">
                      {activePostId ? `Editing Draft (${activePostId})` : 'New Draft Session'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveDraft}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-700"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Draft</span>
                    </button>

                    <button
                      onClick={handlePublishNow}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-purple-600/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish Live</span>
                    </button>
                  </div>
                </div>

                {/* Title & Subtitle Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Post Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. The Architecture of Sovereign Multi-Agent Operating Systems"
                      className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-sm font-bold text-stone-100 placeholder-stone-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Subtitle / Deck Line
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={e => setSubtitle(e.target.value)}
                      placeholder="e.g. How zero-trust hardware enclaves eliminate central SaaS dependencies"
                      className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Specific Format Fields */}
                {contentType === 'newsletter' && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-purple-300 font-bold">
                      <Mail className="w-4 h-4" />
                      <span>Newsletter Issue Number</span>
                    </div>
                    <input
                      type="number"
                      value={newsletterIssue}
                      onChange={e => setNewsletterIssue(parseInt(e.target.value, 10))}
                      className="w-20 p-1 bg-stone-950 border border-purple-700 rounded-lg text-center font-mono text-xs text-stone-200"
                    />
                  </div>
                )}

                {contentType === 'podcast' && (
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/60 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold">
                      <Mic className="w-4 h-4" />
                      <span>Podcast Audio Source & Master Track</span>
                    </div>
                    <input
                      type="text"
                      value={audioUrl}
                      onChange={e => setAudioUrl(e.target.value)}
                      placeholder="https://assets.omni.com/audio/master.mp3"
                      className="w-full p-2 bg-stone-950 border border-indigo-700 rounded-lg font-mono text-[11px] text-stone-200"
                    />
                  </div>
                )}

                {contentType === 'video_channel' && (
                  <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/60 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-rose-300 font-bold">
                      <Video className="w-4 h-4" />
                      <span>Video Stream & Master MP4 / HLS Stream</span>
                    </div>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                      placeholder="https://assets.omni.com/videos/stream.m3u8"
                      className="w-full p-2 bg-stone-950 border border-rose-700 rounded-lg font-mono text-[11px] text-stone-200"
                    />
                  </div>
                )}

                {/* Markdown / Body Text Editor */}
                <div>
                  <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    Content Body (Markdown Supported)
                  </label>
                  <textarea
                    rows={12}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder="# Start writing your article, show notes, or newsletter broadcast here..."
                    className="w-full p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-xs font-mono text-stone-200 placeholder-stone-600 focus:outline-none focus:border-purple-500 leading-relaxed resize-y"
                  />
                </div>

                {/* Tags & Primary Keyword */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={e => setTagsInput(e.target.value)}
                      placeholder="Technology, AI, Security"
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      Primary Target Keyword
                    </label>
                    <input
                      type="text"
                      value={primaryKeyword}
                      onChange={e => setPrimaryKeyword(e.target.value)}
                      placeholder="sovereign AI"
                      className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Integrated OMNI AI Suite */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
                {/* AI Suite Selector Pills */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-stone-100">OMNI AI Creator Suite</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 text-[11px]">
                  {[
                    { id: 'writing', label: 'Writing AI' },
                    { id: 'seo', label: 'SEO Audit' },
                    { id: 'image', label: 'Cover Gen' },
                    { id: 'schedule', label: 'Scheduler' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setAiTool(tab.id as any)}
                      className={`py-1.5 rounded-lg font-bold text-center transition-all ${
                        aiTool === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* AI SUBTOOL 1: WRITING ASSISTANCE */}
                {aiTool === 'writing' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Tone of Voice
                      </label>
                      <select
                        value={aiTone}
                        onChange={e => setAiTone(e.target.value as any)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Executive">Executive (Authoritative & Data-Driven)</option>
                        <option value="Provocative">Provocative (Challenging Status Quo)</option>
                        <option value="Academic">Academic (Rigorous & Cited)</option>
                        <option value="Casual">Casual (Conversational & Friendly)</option>
                        <option value="Technical">Technical (Architecture & Code Deep Dive)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleRunAiWriting('headline')}
                        className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left transition-colors border border-stone-700 flex flex-col justify-between"
                      >
                        <span className="font-bold text-purple-300">5 Viral Headlines</span>
                        <span className="text-[10px] text-stone-400">Generate punchy hooks</span>
                      </button>

                      <button
                        onClick={() => handleRunAiWriting('expand')}
                        className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left transition-colors border border-stone-700 flex flex-col justify-between"
                      >
                        <span className="font-bold text-indigo-300">Expand Draft</span>
                        <span className="text-[10px] text-stone-400">Add technical depth</span>
                      </button>

                      <button
                        onClick={() => handleRunAiWriting('tone')}
                        className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left transition-colors border border-stone-700 flex flex-col justify-between"
                      >
                        <span className="font-bold text-emerald-300">Tone Morph</span>
                        <span className="text-[10px] text-stone-400">Apply {aiTone} tone</span>
                      </button>

                      <button
                        onClick={() => handleRunAiWriting('summarize')}
                        className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-left transition-colors border border-stone-700 flex flex-col justify-between"
                      >
                        <span className="font-bold text-amber-300">Key Takeaways</span>
                        <span className="text-[10px] text-stone-400">3-bullet summary</span>
                      </button>
                    </div>

                    {/* Headline Suggestions List */}
                    {aiHeadlineSuggestions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                        <div className="font-bold text-purple-400 text-[11px] uppercase tracking-wider">
                          Click to apply AI headline
                        </div>
                        <div className="space-y-1.5">
                          {aiHeadlineSuggestions.map((hl, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleApplyHeadline(hl)}
                              className="p-2 rounded-lg bg-stone-900 hover:bg-purple-950/60 border border-stone-800 hover:border-purple-700 cursor-pointer text-[11px] text-stone-300 transition-colors"
                            >
                              {hl}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Generated AI Result Output */}
                    {aiGeneratedOutput && (
                      <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-purple-300">
                          <span>AI Synthesised Text</span>
                          <button
                            onClick={handleAppendAiOutput}
                            className="px-2 py-0.5 rounded bg-purple-600 text-white hover:bg-purple-500 font-semibold"
                          >
                            Append to Body
                          </button>
                        </div>
                        <div className="p-2.5 rounded-lg bg-stone-950 text-[11px] text-stone-300 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                          {aiGeneratedOutput}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI SUBTOOL 2: SEO OPTIMIZATION AUDIT */}
                {aiTool === 'seo' && (
                  <div className="space-y-4 text-xs">
                    <button
                      onClick={handleRunAiSeo}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Run Real-Time SEO & Readability Audit</span>
                    </button>

                    {seoReport ? (
                      <div className="space-y-3">
                        {/* Score Header Card */}
                        <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-stone-400">Overall SEO Score</div>
                            <div className="text-2xl font-black text-emerald-400 font-mono">
                              {seoReport.score} / 100
                            </div>
                          </div>
                          <div className="text-right space-y-0.5">
                            <div className="text-[11px] text-stone-400">Readability Grade</div>
                            <div className="text-xs font-bold text-stone-200">
                              {seoReport.readabilityGrade}
                            </div>
                            <div className="text-[10px] text-indigo-400 font-mono">
                              Keyword Density: {seoReport.keywordDensity}%
                            </div>
                          </div>
                        </div>

                        {/* Strengths */}
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-emerald-400 uppercase">
                            Strengths Detected
                          </div>
                          {seoReport.strengths.map((str, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-[11px] text-emerald-200 flex items-center gap-1.5"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{str}</span>
                            </div>
                          ))}
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-1">
                          <div className="text-[11px] font-bold text-amber-400 uppercase">
                            Optimization Suggestions
                          </div>
                          {seoReport.suggestions.map((sug, idx) => (
                            <div
                              key={idx}
                              className="p-2 rounded-lg bg-amber-950/30 border border-amber-800/60 text-[11px] text-amber-200"
                            >
                              • {sug}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-xl bg-stone-950 border border-stone-800 text-stone-400 text-xs">
                        Click the button above to run an instant keyword density, SERP snippet, and Flesch readability evaluation.
                      </div>
                    )}
                  </div>
                )}

                {/* AI SUBTOOL 3: COVER ART GENERATOR */}
                {aiTool === 'image' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Aesthetic Style Preset
                      </label>
                      <select
                        value={imageStyle}
                        onChange={e => setImageStyle(e.target.value as any)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="Minimalist Cyber">Minimalist Cyber (Neon & Obsidian)</option>
                        <option value="Photorealistic Editorial">Photorealistic Editorial (National Geographic style)</option>
                        <option value="Clean Vector">Clean Vector (Flat Architectural Duotone)</option>
                        <option value="Cinematic 3D">Cinematic 3D (Octane Render HDR)</option>
                        <option value="Abstract Geometric">Abstract Geometric (Bioluminescent Glass)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateCoverArt}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Synthesize High-Res Cover Art</span>
                    </button>

                    {/* Image Preview */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-stone-400 uppercase">Cover Art Preview</div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                        <img
                          src={coverImageUrl}
                          alt="Cover Art Preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* AI SUBTOOL 4: SCHEDULER & CROSS-DISTRIBUTION */}
                {aiTool === 'schedule' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Release Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={e => setScheduleDate(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-purple-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                        Target Timezone
                      </label>
                      <select
                        value={scheduleTimezone}
                        onChange={e => setScheduleTimezone(e.target.value)}
                        className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200"
                      >
                        <option value="UTC">UTC (Zurich Standard Time)</option>
                        <option value="America/New_York">Eastern Time (US / New York)</option>
                        <option value="America/Los_Angeles">Pacific Time (US / San Francisco)</option>
                        <option value="Asia/Tokyo">JST (Tokyo)</option>
                        <option value="Europe/London">GMT (London)</option>
                      </select>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-bold text-stone-300 uppercase">Cross-Distribution Sync</div>
                      <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-purple-600" />
                          <span className="text-stone-200">Auto-push to OMNI Discover Feed</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-purple-600" />
                          <span className="text-stone-200">Dispatch Email Broadcast to Paid Subscribers</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-purple-600" />
                          <span className="text-stone-200">Broadcast RSS / ActivityPub to Fediverse</span>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleSaveDraft();
                        showNotification(`Post scheduled for release on ${scheduleDate} (${scheduleTimezone}).`);
                      }}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
                    >
                      Confirm Post Schedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-TAB: POSTS LIBRARY */}
      {activeSubTab === 'library' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Published Articles, Audio & Videos ({posts.length})</span>
            </h3>
            <button
              onClick={() => handleCreateNew('blog')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(p => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950">
                    <img
                      src={p.coverImageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/80 text-purple-300 border border-purple-800/80 text-[10px] font-mono uppercase">
                        {p.contentType}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-emerald-300 text-[10px] font-mono">
                      {p.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-100 line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2">{p.excerpt}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                    <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                      <div className="font-bold text-stone-200">{p.stats.views}</div>
                      <div className="text-[10px] text-stone-500">Views</div>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                      <div className="font-bold text-indigo-400">{p.stats.completionRate}%</div>
                      <div className="text-[10px] text-stone-500">Read Ratio</div>
                    </div>
                    <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                      <div className="font-bold text-emerald-400">${p.stats.earnings}</div>
                      <div className="text-[10px] text-stone-500">Earnings</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleSelectPostToEdit(p)}
                    className="text-purple-400 hover:text-purple-300 font-bold"
                  >
                    Edit Draft
                  </button>

                  <button
                    onClick={() => {
                      omniContentPublishingService.deleteCreatorPost(p.id);
                      refreshPosts();
                      showNotification('Deleted post.');
                    }}
                    className="text-rose-400 hover:text-rose-300"
                    title="Delete Post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: CREATOR TELEMETRY & ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-6">
          {/* High-level KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Total Content Impressions</span>
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-stone-100 font-mono">13,780</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+28.4% this month</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Average Read Completion</span>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-indigo-400 font-mono">74.2%</div>
              <div className="text-[11px] text-stone-400">High engagement benchmark</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Active Paid Subscribers</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">552</div>
              <div className="text-[11px] text-emerald-400">+18 joined this week</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Gross Net Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">$944.20</div>
              <div className="text-[11px] text-stone-400">Zero middle-man fee cut</div>
            </div>
          </div>

          {/* Retention & Telemetry Breakdown */}
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>Audience Attention & Drop-off Retention Curve</span>
            </h3>

            {/* Visual Bar Chart */}
            <div className="space-y-3 pt-2">
              {[
                { label: 'Introduction (0% - 25%)', rate: '94%', count: '12.9k readers' },
                { label: 'Core Technical Analysis (25% - 50%)', rate: '81%', count: '11.1k readers' },
                { label: 'Empirical Results & Proofs (50% - 75%)', rate: '74%', count: '10.2k readers' },
                { label: 'Conclusion & Actionable Steps (75% - 100%)', rate: '68%', count: '9.3k readers' }
              ].map((step, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-300 font-semibold">{step.label}</span>
                    <span className="font-mono text-purple-400 font-bold">{step.rate} ({step.count})</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                      style={{ width: step.rate }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
