import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Atom,
  HeartPulse,
  Film,
  Coffee,
  Plane,
  Sprout,
  Sparkles,
  Volume2,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2,
  Layers,
  FileText,
  Quote,
  Activity,
  Calendar,
  X
} from 'lucide-react';
import {
  OmniAiMagazineCategory,
  OmniAiMagazineIssue,
  OmniAiMagazineArticle
} from '../../../types';
import { omniContentPublishingService } from '../../../sdk/browser-services/OmniContentPublishingService';

export const OmniAiMagazineView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<OmniAiMagazineCategory>('technology');
  const [activeArticleModal, setActiveArticleModal] = useState<OmniAiMagazineArticle | null>(null);
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  const [selectedIssueNumber, setSelectedIssueNumber] = useState<number>(48);

  const categories = omniContentPublishingService.getAllMagazineCategories();
  const currentIssue: OmniAiMagazineIssue = omniContentPublishingService.getMagazineIssue(selectedCategory);

  const getCategoryIcon = (cat: OmniAiMagazineCategory) => {
    switch (cat) {
      case 'technology':
        return <Cpu className="w-4 h-4" />;
      case 'business':
        return <Briefcase className="w-4 h-4" />;
      case 'finance':
        return <TrendingUp className="w-4 h-4" />;
      case 'education':
        return <GraduationCap className="w-4 h-4" />;
      case 'science':
        return <Atom className="w-4 h-4" />;
      case 'health':
        return <HeartPulse className="w-4 h-4" />;
      case 'entertainment':
        return <Film className="w-4 h-4" />;
      case 'lifestyle':
        return <Coffee className="w-4 h-4" />;
      case 'travel':
        return <Plane className="w-4 h-4" />;
      case 'agriculture':
        return <Sprout className="w-4 h-4" />;
    }
  };

  const getCategoryAccent = (cat: OmniAiMagazineCategory) => {
    switch (cat) {
      case 'technology':
        return {
          bg: 'bg-indigo-950/40',
          border: 'border-indigo-800/80',
          text: 'text-indigo-400',
          badge: 'bg-indigo-950 text-indigo-300 border-indigo-700'
        };
      case 'business':
        return {
          bg: 'bg-blue-950/40',
          border: 'border-blue-800/80',
          text: 'text-blue-400',
          badge: 'bg-blue-950 text-blue-300 border-blue-700'
        };
      case 'finance':
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-800/80',
          text: 'text-emerald-400',
          badge: 'bg-emerald-950 text-emerald-300 border-emerald-700'
        };
      case 'education':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-800/80',
          text: 'text-amber-400',
          badge: 'bg-amber-950 text-amber-300 border-amber-700'
        };
      case 'science':
        return {
          bg: 'bg-cyan-950/40',
          border: 'border-cyan-800/80',
          text: 'text-cyan-400',
          badge: 'bg-cyan-950 text-cyan-300 border-cyan-700'
        };
      case 'health':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-800/80',
          text: 'text-rose-400',
          badge: 'bg-rose-950 text-rose-300 border-rose-700'
        };
      case 'entertainment':
        return {
          bg: 'bg-purple-950/40',
          border: 'border-purple-800/80',
          text: 'text-purple-400',
          badge: 'bg-purple-950 text-purple-300 border-purple-700'
        };
      case 'lifestyle':
        return {
          bg: 'bg-teal-950/40',
          border: 'border-teal-800/80',
          text: 'text-teal-400',
          badge: 'bg-teal-950 text-teal-300 border-teal-700'
        };
      case 'travel':
        return {
          bg: 'bg-sky-950/40',
          border: 'border-sky-800/80',
          text: 'text-sky-400',
          badge: 'bg-sky-950 text-sky-300 border-sky-700'
        };
      case 'agriculture':
        return {
          bg: 'bg-lime-950/40',
          border: 'border-lime-800/80',
          text: 'text-lime-400',
          badge: 'bg-lime-950 text-lime-300 border-lime-700'
        };
    }
  };

  const currentAccent = getCategoryAccent(selectedCategory);

  return (
    <div id="omni-ai-magazine-view" className="space-y-8">
      {/* 1. Header Banner & Topic Navigation Strip (10 Requested Categories) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
              <BookOpen className="w-4 h-4" />
              <span>OMNI AI MAGAZINE EDITORIAL ENCLAVE</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                10 Synthesised Domains
              </span>
            </div>
            <h2 className="text-2xl font-black text-stone-100 tracking-tight">
              Peer-Reviewed AI Magazines
            </h2>
            <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
              Curated and synthesized by autonomous intelligence swarms across peer research, industry telemetry, and sovereign creator submissions.
            </p>
          </div>

          {/* Issue Archive Selector */}
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 p-1.5 rounded-2xl shrink-0 text-xs">
            <span className="text-stone-400 pl-2 text-[11px] font-mono">Edition:</span>
            {[48, 47, 46].map(num => (
              <button
                key={num}
                onClick={() => setSelectedIssueNumber(num)}
                className={`px-2.5 py-1 rounded-xl font-mono text-xs font-bold transition-all ${
                  selectedIssueNumber === num
                    ? 'bg-stone-100 text-stone-900'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                #{num}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Topic Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const accent = getCategoryAccent(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? `${accent.bg} ${accent.border} shadow-lg shadow-black/40 ring-1 ring-white/20`
                    : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-800/80 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${isSelected ? accent.badge : 'bg-stone-800 text-stone-400'}`}>
                    {getCategoryIcon(cat.id)}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-100 capitalize">{cat.id}</div>
                  <div className="text-[10px] text-stone-400 truncate">{cat.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Magazine Cover Story & Editorial Brief Section */}
      <div className="space-y-6">
        {/* Editorial Briefing Banner */}
        <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={currentIssue.curatorAvatar}
              alt={currentIssue.curatorName}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-2xl object-cover border border-stone-700 shrink-0"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-200">{currentIssue.curatorName}</span>
                <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 text-[10px] font-mono">
                  {currentIssue.curatorRole}
                </span>
              </div>
              <p className="text-xs text-stone-300 italic">
                "{currentIssue.curatorEditorial}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>{currentIssue.editionName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>{currentIssue.totalArticlesCount} In-Depth Articles</span>
            </div>
          </div>
        </div>

        {/* Hero Cover Story Showcase */}
        <div className="p-6 rounded-3xl bg-stone-900/95 border border-stone-800 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Big Hero Image */}
            <div
              onClick={() => setActiveArticleModal(currentIssue.coverStory)}
              className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group bg-stone-950"
            >
              <img
                src={currentIssue.coverStory.coverImageUrl}
                alt={currentIssue.coverStory.headline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border uppercase tracking-wider ${currentAccent.badge}`}>
                  Cover Feature • Issue #{selectedIssueNumber}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-stone-200 text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentIssue.coverStory.readTimeMinutes} min deep read</span>
              </div>
            </div>

            {/* Right: Editorial Metadata & Actions */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase font-bold text-stone-400 tracking-wider">
                  Lead Empirical Paper
                </span>
                <h1
                  onClick={() => setActiveArticleModal(currentIssue.coverStory)}
                  className="text-xl sm:text-2xl font-black text-stone-100 hover:text-indigo-300 transition-colors cursor-pointer leading-tight tracking-tight"
                >
                  {currentIssue.coverStory.headline}
                </h1>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {currentIssue.coverStory.leadParagraph}
                </p>
              </div>

              {/* Infographic Metric Cards */}
              {currentIssue.coverStory.infographicData && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {currentIssue.coverStory.infographicData.map((info, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-0.5"
                    >
                      <div className="text-lg font-black text-indigo-400 font-mono">
                        {info.metric}
                      </div>
                      <div className="text-[11px] font-bold text-stone-200">{info.label}</div>
                      <div className="text-[10px] text-stone-500 truncate">{info.context}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Buttons Deck */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setActiveArticleModal(currentIssue.coverStory)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full Article & Citations</span>
                </button>

                <button
                  onClick={() => setPlayingAudio(!playingAudio)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    playingAudio
                      ? 'bg-indigo-950 border-indigo-700 text-indigo-300 animate-pulse'
                      : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>{playingAudio ? 'Playing Narration' : 'Listen Audio Brief (12 min)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Featured Articles in this Category Issue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Selected Papers & Analyses in OMNI {selectedCategory.toUpperCase()}</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">Issue #{selectedIssueNumber} Archive</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentIssue.featuredArticles.map(art => (
              <div
                key={art.id}
                onClick={() => setActiveArticleModal(art)}
                className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-400 text-[10px] font-mono capitalize">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {art.readTimeMinutes} min read
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-100 group-hover:text-indigo-300 transition-colors leading-snug">
                    {art.headline}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2">
                    {art.subheadline}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-stone-300 font-medium text-[11px]">{art.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-indigo-400 font-bold text-[11px]">
                    Read Briefing <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Full Article Modal with Citations & Markdown */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/90 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border uppercase tracking-wider ${currentAccent.badge}`}>
                  OMNI {activeArticleModal.category} Magazine
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {activeArticleModal.editionIssue} • {activeArticleModal.publishedDate}
                </span>
              </div>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-stone-200">
              {/* Header Titles */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-stone-100 tracking-tight leading-tight">
                  {activeArticleModal.headline}
                </h1>
                <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-sans">
                  {activeArticleModal.subheadline}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3">
                  <img
                    src={activeArticleModal.author.avatar}
                    alt={activeArticleModal.author.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-2xl object-cover border border-stone-700"
                  />
                  <div>
                    <div className="text-sm font-bold text-stone-100">
                      {activeArticleModal.author.name}
                    </div>
                    <div className="text-xs text-indigo-400">
                      {activeArticleModal.author.role}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {activeArticleModal.author.credentials}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Art */}
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <img
                  src={activeArticleModal.coverImageUrl}
                  alt={activeArticleModal.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              {activeArticleModal.keyTakeaways && (
                <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Editorial Intelligence Key Findings</span>
                  </div>
                  <ul className="space-y-2 text-xs text-indigo-100/90 list-disc list-inside">
                    {activeArticleModal.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Markdown Body Text */}
              <div className="text-base leading-relaxed text-stone-300 space-y-5 font-serif">
                {activeArticleModal.fullBodyMarkdown.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-black text-stone-100 font-sans pt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('#### ')) {
                    return (
                      <h4 key={idx} className="text-sm font-bold text-indigo-300 font-sans pt-2">
                        {paragraph.replace('#### ', '')}
                      </h4>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>

              {/* Citations & Peer DOI Links */}
              {activeArticleModal.citations && activeArticleModal.citations.length > 0 && (
                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Verified Academic Citations & Peer DOIs</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {activeArticleModal.citations.map((cite, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-0.5">
                          <div className="font-semibold text-stone-200">{cite.title}</div>
                          <div className="text-[11px] text-stone-400">{cite.source}</div>
                        </div>
                        <a
                          href={cite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-stone-800 text-indigo-300 hover:text-indigo-200 text-xs font-mono shrink-0"
                        >
                          DOI Link
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-900/90 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-mono">OMNI Sovereign Publishing Archive</span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
              >
                Close Magazine Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
