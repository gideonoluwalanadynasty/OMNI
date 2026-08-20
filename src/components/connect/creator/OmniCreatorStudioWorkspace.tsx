import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Video,
  FileText,
  Mail,
  GraduationCap,
  Package,
  Radio,
  Mic,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  DollarSign,
  CheckCircle2,
  Send,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Tag,
  Filter,
  Search,
  Zap,
  Globe
} from 'lucide-react';
import { CreatorContentItem, OmniContentType, ContentPublishStatus, ContentAccessTier, CrossPlatformDestination } from '../../../types/omni_creator';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  contentItems: CreatorContentItem[];
  activeProfile: ConnectProfile;
  onCreateContent: (item: CreatorContentItem) => void;
  onSelectForRepurpose: (item: CreatorContentItem) => void;
  onPublishNow: (id: string) => void;
}

export const OmniCreatorStudioWorkspace: React.FC<Props> = ({
  contentItems,
  activeProfile,
  onCreateContent,
  onSelectForRepurpose,
  onPublishNow
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Form State for new content
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<OmniContentType>('video');
  const [formCategory, setFormCategory] = useState('AI & Engineering');
  const [formDescription, setFormDescription] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formMediaUrl, setFormMediaUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-glowing-signals-32127-large.mp4');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
  const [formAccessTier, setFormAccessTier] = useState<ContentAccessTier>('free');
  const [formPriceUsd, setFormPriceUsd] = useState(0);
  const [formTags, setFormTags] = useState('AI, Sovereign, Engineering');
  const [formScheduleDate, setFormScheduleDate] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<CrossPlatformDestination[]>([
    'omni_feed',
    'omni_channels',
    'video_hub'
  ]);

  const handleToggleDestination = (dest: CrossPlatformDestination) => {
    setSelectedDestinations(prev =>
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const handleCreateSubmit = (e: React.FormEvent, isScheduled: boolean) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newItem: CreatorContentItem = {
      id: `cnt-${Date.now()}`,
      creatorId: activeProfile.id,
      creatorName: activeProfile.displayName,
      creatorAvatar: activeProfile.avatarUrl,
      creatorHandle: activeProfile.username,
      title: formTitle.trim(),
      type: formType,
      category: formCategory,
      description: formDescription.trim() || 'Created in OMNI Creator Studio',
      contentBody: formBody.trim(),
      mediaUrl: formMediaUrl.trim(),
      thumbnailUrl: formThumbnailUrl.trim(),
      durationSec: formType === 'video' ? 1800 : formType === 'short_video' ? 60 : undefined,
      readTimeMinutes: formType === 'article' || formType === 'newsletter' ? 8 : undefined,
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      status: isScheduled ? 'scheduled' : 'published',
      accessTier: formAccessTier,
      priceUsd: formAccessTier === 'paywalled' || formAccessTier === 'course_enrollment' ? Number(formPriceUsd) : undefined,
      scheduledFor: isScheduled ? formScheduleDate || new Date(Date.now() + 86400000).toISOString() : undefined,
      publishedAt: isScheduled ? undefined : new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      crossPlatformDestinations: selectedDestinations,
      viewsCount: 0,
      impressionsCount: 0,
      watchTimeMinutes: 0,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      bookmarksCount: 0,
      revenueGeneratedUsd: 0,
      conversionsCount: 0,
      seoScore: 92
    };

    onCreateContent(newItem);
    setIsComposerOpen(false);
    // Reset Form
    setFormTitle('');
    setFormDescription('');
    setFormBody('');
  };

  const filteredItems = contentItems.filter(item => {
    const matchesType = selectedTypeFilter === 'all' || item.type === selectedTypeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const contentTypesConfig: Array<{ type: OmniContentType; label: string; icon: any; color: string }> = [
    { type: 'video', label: 'Videos', icon: Video, color: 'text-rose-400' },
    { type: 'short_video', label: 'Shorts & Reels', icon: Zap, color: 'text-amber-400' },
    { type: 'livestream', label: 'Livestreams', icon: Radio, color: 'text-red-400' },
    { type: 'podcast', label: 'Podcasts & Audio', icon: Mic, color: 'text-purple-400' },
    { type: 'article', label: 'Articles', icon: FileText, color: 'text-sky-400' },
    { type: 'newsletter', label: 'Newsletters', icon: Mail, color: 'text-emerald-400' },
    { type: 'course', label: 'Courses', icon: GraduationCap, color: 'text-indigo-400' },
    { type: 'digital_product', label: 'Digital Products', icon: Package, color: 'text-teal-400' }
  ];

  return (
    <div id="omni-creator-studio-workspace" className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              OMNI CREATOR STUDIO PRO
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              9 FORMATS SUPPORTED
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Professional Creation, Planning & Publishing Engine
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Produce, edit, schedule, and cross-publish videos, masterclasses, podcasts, newsletters, and digital products with sovereign direct-to-wallet monetization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsComposerOpen(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Content</span>
          </button>
        </div>
      </div>

      {/* Quick Format Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {contentTypesConfig.map(cfg => {
          const Icon = cfg.icon;
          const isSelected = selectedTypeFilter === cfg.type;
          const count = contentItems.filter(i => i.type === cfg.type).length;

          return (
            <button
              key={cfg.type}
              onClick={() => setSelectedTypeFilter(selectedTypeFilter === cfg.type ? 'all' : cfg.type)}
              className={`p-3.5 rounded-2xl border transition text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-900/40 border-indigo-500 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${cfg.color}`} />
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-xs font-bold text-white truncate">{cfg.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content Library & Search Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Content Library ({filteredItems.length})
            </h3>
            {selectedTypeFilter !== 'all' && (
              <span className="text-xs px-2.5 py-0.5 bg-indigo-600/20 text-indigo-300 rounded-full font-semibold border border-indigo-500/30">
                Filtered: {selectedTypeFilter}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, tag or keyword..."
                className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            {selectedTypeFilter !== 'all' && (
              <button
                onClick={() => setSelectedTypeFilter('all')}
                className="text-xs text-slate-400 hover:text-white underline font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Content Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail / Header */}
                <div className="relative h-44 bg-slate-900 overflow-hidden">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-950/40 text-indigo-400">
                      <Sparkles className="w-10 h-10" />
                    </div>
                  )}

                  {/* Format Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-md border border-slate-700">
                      {item.type.replace('_', ' ')}
                    </span>
                    {item.accessTier !== 'free' && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500 text-slate-950">
                        {item.accessTier === 'subscribers_only' ? 'Patrons Only' : `$${item.priceUsd}`}
                      </span>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        item.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : item.status === 'scheduled'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-700/80 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Duration / Read Time Badge */}
                  {item.durationSec && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-white backdrop-blur-sm">
                      {Math.floor(item.durationSec / 60)}m {item.durationSec % 60}s
                    </div>
                  )}
                  {item.readTimeMinutes && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-white backdrop-blur-sm">
                      {item.readTimeMinutes} min read
                    </div>
                  )}
                </div>

                {/* Content Metadata */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.category}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Metrics & Action Buttons */}
              <div className="p-5 pt-0 space-y-3">
                <div className="grid grid-cols-4 gap-2 py-2 border-y border-slate-800 text-center">
                  <div>
                    <div className="text-xs font-bold text-white">{item.viewsCount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Views</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.likesCount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Likes</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.sharesCount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Shares</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400">${item.revenueGeneratedUsd.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Revenue</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => onSelectForRepurpose(item)}
                    className="flex-1 px-3 py-2 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Repurpose</span>
                  </button>

                  {item.status === 'scheduled' || item.status === 'draft' ? (
                    <button
                      onClick={() => onPublishNow(item.id)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Live
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Content Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  OMNI Studio Content Creator & Publisher
                </h3>
                <p className="text-xs text-slate-400">
                  Author rich multi-format content and broadcast across sovereign mesh channels.
                </p>
              </div>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={e => handleCreateSubmit(e, false)}>
              {/* Format Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Select Content Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {contentTypesConfig.map(cfg => {
                    const Icon = cfg.icon;
                    const isSelected = formType === cfg.type;
                    return (
                      <button
                        type="button"
                        key={cfg.type}
                        onClick={() => setFormType(cfg.type)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Decentralized Multi-Agent Swarms in Production"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Category / Niche</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="AI & Engineering">AI & Engineering</option>
                    <option value="Finance & Web3">Finance & Web3</option>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Faith & Leadership">Faith & Leadership</option>
                    <option value="Business & Marketing">Business & Marketing</option>
                    <option value="Music & Audio">Music & Audio</option>
                  </select>
                </div>
              </div>

              {/* Description / Summary */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Description / Summary</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Provide a compelling overview for your audience..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Extended Body for Articles/Newsletters */}
              {(formType === 'article' || formType === 'newsletter' || formType === 'course') && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Full Content Body (Markdown Supported)</label>
                  <textarea
                    rows={4}
                    value={formBody}
                    onChange={e => setFormBody(e.target.value)}
                    placeholder="Write your article, newsletter markdown, or curriculum overview..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Media URL & Thumbnail URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Media CDN URL (Video/Audio/File)</label>
                  <input
                    type="text"
                    value={formMediaUrl}
                    onChange={e => setFormMediaUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Thumbnail Cover URL</label>
                  <input
                    type="text"
                    value={formThumbnailUrl}
                    onChange={e => setFormThumbnailUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Access Tier & Monetization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Access & Monetization Tier</label>
                  <select
                    value={formAccessTier}
                    onChange={e => setFormAccessTier(e.target.value as ContentAccessTier)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="free">Public Free (Ad-Supported)</option>
                    <option value="subscribers_only">Subscribers / Patrons Only</option>
                    <option value="paywalled">Paywalled Purchase ($)</option>
                    <option value="course_enrollment">Course Enrollment Tier ($)</option>
                  </select>
                </div>

                {(formAccessTier === 'paywalled' || formAccessTier === 'course_enrollment') && (
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Price (USD)</label>
                    <input
                      type="number"
                      min="1"
                      value={formPriceUsd}
                      onChange={e => setFormPriceUsd(Number(e.target.value))}
                      placeholder="e.g. 49"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                )}
              </div>

              {/* Cross-Platform Destinations */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Cross-Platform Multi-Broadcast Architecture
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'omni_feed' as CrossPlatformDestination, label: 'OMNI Feed' },
                    { id: 'omni_channels' as CrossPlatformDestination, label: 'OMNI Channels' },
                    { id: 'video_hub' as CrossPlatformDestination, label: 'Video Hub' },
                    { id: 'newsletter_blast' as CrossPlatformDestination, label: 'Newsletter Blast' },
                    { id: 'podcast_rss' as CrossPlatformDestination, label: 'Podcast RSS Feed' },
                    { id: 'youtube_sync' as CrossPlatformDestination, label: 'YouTube Sync' },
                    { id: 'x_sync' as CrossPlatformDestination, label: 'X (Twitter) Broadcast' },
                    { id: 'linkedin_sync' as CrossPlatformDestination, label: 'LinkedIn Article' }
                  ].map(dest => {
                    const isSelected = selectedDestinations.includes(dest.id);
                    return (
                      <button
                        type="button"
                        key={dest.id}
                        onClick={() => handleToggleDestination(dest.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {dest.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={e => setFormTags(e.target.value)}
                    placeholder="AI, Sovereign, Masterclass"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Schedule For (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formScheduleDate}
                    onChange={e => setFormScheduleDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={e => handleCreateSubmit(e, true)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Queue for Schedule</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Immediately</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
