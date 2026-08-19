import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Sliders,
  Filter,
  Search,
  Bookmark,
  Heart,
  Share2,
  Volume2,
  Clock,
  CheckCircle2,
  Globe,
  Tag,
  Shield,
  Layers,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  BookOpen,
  X,
  Plus
} from 'lucide-react';
import {
  OmniDiscoverFeedItem,
  OmniPersonalisationControls,
  OmniDiscoverSourceType
} from '../../../types';
import { omniContentPublishingService } from '../../../sdk/browser-services/OmniContentPublishingService';

interface OmniDiscoverFeedViewProps {
  onOpenArticle?: (item: OmniDiscoverFeedItem) => void;
  onOpenCreatorStudio?: () => void;
}

export const OmniDiscoverFeedView: React.FC<OmniDiscoverFeedViewProps> = ({
  onOpenArticle,
  onOpenCreatorStudio
}) => {
  const [controls, setControls] = useState<OmniPersonalisationControls>(
    omniContentPublishingService.getPersonalisationControls()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [feedItems, setFeedItems] = useState<OmniDiscoverFeedItem[]>([]);
  const [showControlsModal, setShowControlsModal] = useState<boolean>(false);
  const [activeArticleModal, setActiveArticleModal] = useState<OmniDiscoverFeedItem | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    'all',
    'Technology',
    'Finance',
    'Science',
    'Education',
    'Agriculture',
    'Lifestyle',
    'Business'
  ];

  const refreshFeed = () => {
    const items = omniContentPublishingService.getPersonalisedFeed(
      selectedCategory,
      searchQuery
    );
    setFeedItems(items);
  };

  useEffect(() => {
    refreshFeed();
  }, [selectedCategory, searchQuery, controls]);

  const handleUpdateControls = (updates: Partial<OmniPersonalisationControls>) => {
    const updated = omniContentPublishingService.updatePersonalisationControls(updates);
    setControls(updated);
  };

  const handleResetControls = () => {
    omniContentPublishingService.resetReadingBehaviour();
    setControls(omniContentPublishingService.getPersonalisationControls());
  };

  const handleToggleBookmark = (id: string) => {
    omniContentPublishingService.toggleBookmarkFeedItem(id);
    refreshFeed();
  };

  const handleToggleLike = (id: string) => {
    omniContentPublishingService.toggleLikeFeedItem(id);
    refreshFeed();
  };

  const handleToggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
    }
  };

  const getSourceBadgeColor = (type: OmniDiscoverSourceType) => {
    switch (type) {
      case 'omni_creator':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'omni_media':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800';
      case 'publisher':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'organisation':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-700';
    }
  };

  const formatSourceName = (type: OmniDiscoverSourceType, name: string) => {
    switch (type) {
      case 'omni_creator':
        return `Creator • ${name}`;
      case 'omni_media':
        return `OMNI Media • ${name}`;
      case 'publisher':
        return `Publisher • ${name}`;
      case 'organisation':
        return `Organisation • ${name}`;
      default:
        return name;
    }
  };

  return (
    <div id="omni-discover-feed-view" className="space-y-6">
      {/* 1. Header Banner with Personalisation & Search Controls */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950/40 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>OMNI DISCOVER ENGINE</span>
            {controls.privacyMode ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                Zero-Telemetry Privacy Mode Active
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                Personalised ({controls.locationRegion} • {controls.language.toUpperCase()})
              </span>
            )}
          </div>
          <h2 className="text-xl font-black text-stone-100 tracking-tight">
            Curated Intelligence Stream
          </h2>
          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            Multi-source aggregation across sovereign creators, peer-reviewed publishers, verified organisations, and AI research synthesis.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-discover-controls"
            onClick={() => setShowControlsModal(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Personalisation Controls</span>
          </button>

          {onOpenCreatorStudio && (
            <button
              id="btn-open-creator-studio-shortcut"
              onClick={onOpenCreatorStudio}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Article</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map(cat => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
                  isSelected
                    ? 'bg-stone-100 text-stone-900 shadow-md font-black'
                    : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800 hover:bg-stone-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, authors, or tags..."
            className="w-full pl-9 pr-3 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Audio Narration Player Bar (Active if playing) */}
      {playingAudioId && (
        <div className="p-3.5 rounded-xl bg-indigo-950/80 border border-indigo-700/80 flex items-center justify-between gap-4 text-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0 animate-pulse">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-stone-100">
                Playing AI Audio Narration: {feedItems.find(i => i.id === playingAudioId)?.title}
              </div>
              <div className="text-[11px] text-indigo-300">
                Neural voice synthesis running via OMNI Multimodal Engine • High-fidelity stream
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-indigo-900 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-indigo-400 animate-pulse" />
            </div>
            <button
              onClick={() => setPlayingAudioId(null)}
              className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 hover:text-white text-xs font-semibold"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* 4. Content Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {feedItems.map(item => {
          const isAudioActive = playingAudioId === item.id;
          return (
            <div
              key={item.id}
              className="group p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-black/40"
            >
              {/* Top Meta & Thumbnail */}
              <div className="space-y-3">
                {/* Cover Image Container */}
                <div
                  onClick={() => setActiveArticleModal(item)}
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-stone-950"
                >
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border uppercase tracking-wider ${getSourceBadgeColor(
                        item.sourceType
                      )}`}
                    >
                      {formatSourceName(item.sourceType, item.sourceName)}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-stone-200 text-[10px] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.readingTimeMinutes} min read</span>
                  </div>
                </div>

                {/* Author Info & Category */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.authorAvatar}
                      alt={item.authorName}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-stone-700"
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-stone-200 text-xs">{item.authorName}</span>
                      {item.authorVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-400">{item.publishedAt}</span>
                </div>

                {/* Headline & Excerpt */}
                <div
                  onClick={() => setActiveArticleModal(item)}
                  className="cursor-pointer space-y-1.5"
                >
                  <h3 className="text-sm font-bold text-stone-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                {/* AI Key Takeaways Pills */}
                {item.aiKeyTakeaways && item.aiKeyTakeaways.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Key Insights</span>
                    </div>
                    <ul className="text-[11px] text-stone-300 space-y-0.5 list-disc list-inside">
                      {item.aiKeyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx} className="truncate">
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleLike(item.id)}
                    className={`flex items-center gap-1 hover:text-rose-400 transition-colors ${
                      item.isLiked ? 'text-rose-400' : ''
                    }`}
                    title="Like article"
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-rose-400' : ''}`} />
                    <span className="text-[11px]">{item.likesCount}</span>
                  </button>

                  <button
                    onClick={() => handleToggleAudio(item.id)}
                    className={`flex items-center gap-1 hover:text-indigo-400 transition-colors ${
                      isAudioActive ? 'text-indigo-400 font-bold' : ''
                    }`}
                    title="Listen to AI Audio Narration"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isAudioActive ? 'Playing' : 'Listen'}</span>
                  </button>

                  <button
                    onClick={() => handleToggleBookmark(item.id)}
                    className={`hover:text-amber-400 transition-colors ${
                      item.isBookmarked ? 'text-amber-400' : ''
                    }`}
                    title="Save to Reading List"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${item.isBookmarked ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => setActiveArticleModal(item)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Read full</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {feedItems.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
          <Compass className="w-8 h-8 text-stone-500 mx-auto" />
          <div className="text-sm font-bold text-stone-200">No matching articles found</div>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Try adjusting your search keywords, clearing blocked source filters, or broadening your topic categories in Personalisation Controls.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 5. Personalisation Controls Drawer / Modal */}
      {showControlsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold text-stone-100">Personalisation & Feed Controls</h3>
                  <p className="text-xs text-stone-400">
                    Fine-tune algorithmic weighting, privacy isolation, and trusted content sources
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowControlsModal(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Privacy Mode Toggle */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-100">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Telemetry Privacy Mode</span>
                </div>
                <p className="text-xs text-stone-400">
                  Disables reading behavior tracking and correlation cookies. Feed is generated using randomized diverse sampling.
                </p>
              </div>
              <button
                onClick={() => handleUpdateControls({ privacyMode: !controls.privacyMode })}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${
                  controls.privacyMode ? 'bg-emerald-600' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    controls.privacyMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Geographic & Language Personalisation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">Geographic Focus</label>
                <select
                  value={controls.locationRegion}
                  onChange={e => handleUpdateControls({ locationRegion: e.target.value })}
                  className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Global">Global Curation</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe (Sovereign Enclaves)</option>
                  <option value="Asia-Pacific">Asia-Pacific</option>
                  <option value="Latin America">Latin America</option>
                  <option value="Africa">Africa</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">Preferred Language</label>
                <select
                  value={controls.language}
                  onChange={e => handleUpdateControls({ language: e.target.value })}
                  className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="en">English (US / UK)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語 (Japanese)</option>
                  <option value="zh">中文 (Chinese)</option>
                </select>
              </div>
            </div>

            {/* Source Weighting Toggles */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-300">Content Sources</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'omniCreator', label: 'OMNI Sovereign Creators', desc: 'Independent authors & podcasters' },
                  { key: 'omniMedia', label: 'OMNI Research & Media', desc: 'Verified labs & internal reports' },
                  { key: 'publishers', label: 'Peer Publishers', desc: 'arXiv, MIT Tech, Nature, FT' },
                  { key: 'organisations', label: 'Global Organisations', desc: 'UN FAO, IEEE, CERN, WHO' }
                ].map(src => {
                  const isChecked = (controls.sourcePreferences as any)[src.key];
                  return (
                    <div
                      key={src.key}
                      onClick={() =>
                        handleUpdateControls({
                          sourcePreferences: {
                            ...controls.sourcePreferences,
                            [src.key]: !isChecked
                          }
                        })
                      }
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-stone-950 border-indigo-800/80 text-stone-200'
                          : 'bg-stone-950/40 border-stone-800 text-stone-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-100">{src.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-indigo-600 rounded"
                        />
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{src.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Topic Weights Sliders */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-300">Topic Interest Weights</label>
              <div className="space-y-2.5">
                {Object.entries(controls.topicWeights).map(([topic, weight]) => (
                  <div key={topic} className="flex items-center justify-between gap-4 text-xs">
                    <span className="w-28 text-stone-300 font-medium">{topic}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={weight}
                      onChange={e =>
                        handleUpdateControls({
                          topicWeights: {
                            ...controls.topicWeights,
                            [topic]: parseInt(e.target.value, 10)
                          }
                        })
                      }
                      className="flex-1 accent-indigo-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                    />
                    <span className="w-8 text-right font-mono text-stone-400">{weight}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Reset & Close */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={handleResetControls}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Reading Profile</span>
              </button>

              <button
                onClick={() => setShowControlsModal(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Apply Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Deep Article Reader Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/90 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border uppercase tracking-wider ${getSourceBadgeColor(
                    activeArticleModal.sourceType
                  )}`}
                >
                  {formatSourceName(activeArticleModal.sourceType, activeArticleModal.sourceName)}
                </span>
                <span className="text-xs text-stone-400">
                  {activeArticleModal.readingTimeMinutes} min read • {activeArticleModal.publishedAt}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(activeArticleModal.id)}
                  className={`p-2 rounded-xl border border-stone-800 transition-colors ${
                    activeArticleModal.isBookmarked
                      ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-200">
              {/* Cover Hero */}
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src={activeArticleModal.coverImageUrl}
                  alt={activeArticleModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Author */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-black text-stone-100 tracking-tight leading-tight">
                  {activeArticleModal.title}
                </h1>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={activeArticleModal.authorAvatar}
                    alt={activeArticleModal.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-stone-700"
                  />
                  <div>
                    <div className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
                      <span>{activeArticleModal.authorName}</span>
                      <span className="text-xs text-stone-400 font-mono">
                        {activeArticleModal.authorHandle}
                      </span>
                      {activeArticleModal.authorVerified && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                    <div className="text-xs text-stone-400">
                      Author & Sovereign Contributor on OMNI Network
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Key Insights Box */}
              {activeArticleModal.aiKeyTakeaways && (
                <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Executive AI Summary & Key Findings</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-indigo-100/90 list-disc list-inside">
                    {activeArticleModal.aiKeyTakeaways.map((takeaway, idx) => (
                      <li key={idx}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Body Text */}
              <div className="text-sm sm:text-base leading-relaxed text-stone-300 space-y-4 font-serif">
                {activeArticleModal.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-2">
                {activeArticleModal.tags.map(t => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-900/90 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleLike(activeArticleModal.id)}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-colors ${
                    activeArticleModal.isLiked
                      ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                      : 'bg-stone-800 border-stone-700 text-stone-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${activeArticleModal.isLiked ? 'fill-rose-300' : ''}`} />
                  <span>{activeArticleModal.likesCount}</span>
                </button>

                <button
                  onClick={() => handleToggleAudio(activeArticleModal.id)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 font-bold hover:bg-stone-700 flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>Listen to Audio</span>
                </button>
              </div>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-1.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white font-bold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
