import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  BarChart2,
  Calendar,
  ShoppingBag,
  Radio,
  Send,
  CheckCircle2,
  Sliders,
  Plus,
  Flame,
  Globe,
  Languages,
  Eye,
  Clock,
  ShieldCheck,
  MoreHorizontal,
  ThumbsUp,
  Award,
  Volume2,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Wand2,
  AlertCircle
} from 'lucide-react';
import {
  OmniSocialPost,
  OmniMoment,
  OmniStatusItem,
  FeedAlgorithmConfig,
  OmniPostFormat
} from '../../types/omni_social_engine';
import { ConnectProfile } from '../../types/omni_connect';
import { OmniStatusViewerModal } from './OmniStatusViewerModal';
import { OmniFeedAlgorithmModal } from './OmniFeedAlgorithmModal';
import { OmniPostComposerModal } from './OmniPostComposerModal';

interface Props {
  posts: OmniSocialPost[];
  moments: OmniMoment[];
  statusTray: Array<{
    authorProfileId: string;
    authorHandle: string;
    authorName: string;
    authorAvatar: string;
    authorBadge?: string;
    hasUnseen: boolean;
    items: OmniStatusItem[];
  }>;
  activeProfile: ConnectProfile;
  algoConfig: FeedAlgorithmConfig;
  onReact: (postId: string, reaction: any) => void;
  onComment: (postId: string, commentText: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onRsvpEvent: (postId: string) => void;
  onTranslatePost: (postId: string, targetLang: string) => string;
  onSummarizePost: (postId: string) => string;
  onCreatePost: (newPostData: any) => void;
  onCreateStatus: (statusData: any) => void;
  onViewStatusItem: (statusId: string) => void;
  onReactStatusItem: (statusId: string, emoji: string) => void;
  onUpdateAlgoConfig: (updates: Partial<FeedAlgorithmConfig>) => void;
  onMuteTopic: (topic: string) => void;
  onUnmuteTopic: (topic: string) => void;
  onMuteUser: (handle: string) => void;
  onUnmuteUser: (handle: string) => void;
  onNavigateTab?: (tab: string) => void;
  aiTools: {
    generateCaption: (prompt: string, tone: string) => string;
    improveWriting: (text: string, tone: any) => string;
    generateHashtags: (text: string) => string[];
    translateText: (text: string, lang: string) => string;
    generateVisualConcept: (desc: string) => { title: string; prompt: string; previewUrl: string };
  };
}

export const OmniConnectFeedView: React.FC<Props> = ({
  posts,
  moments,
  statusTray,
  activeProfile,
  algoConfig,
  onReact,
  onComment,
  onShare,
  onSave,
  onVotePoll,
  onRsvpEvent,
  onTranslatePost,
  onSummarizePost,
  onCreatePost,
  onCreateStatus,
  onViewStatusItem,
  onReactStatusItem,
  onUpdateAlgoConfig,
  onMuteTopic,
  onUnmuteTopic,
  onMuteUser,
  onUnmuteUser,
  onNavigateTab,
  aiTools
}) => {
  // Modal states
  const [showComposerModal, setShowComposerModal] = useState(false);
  const [showAlgoModal, setShowAlgoModal] = useState(false);
  const [activeStoryGroup, setActiveStoryGroup] = useState<any | null>(null);
  const [showCreateStatusModal, setShowCreateStatusModal] = useState(false);
  const [newStatusText, setNewStatusText] = useState('');
  const [newStatusBg, setNewStatusBg] = useState('bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950');

  // Inline comment state
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInputText, setCommentInputText] = useState('');

  // Carousel index tracker per post ID
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  // Translation / Summary per post ID
  const [postTranslations, setPostTranslations] = useState<Record<string, string>>({});
  const [postSummaries, setPostSummaries] = useState<Record<string, string>>({});

  // Quick Composer box state
  const [inlinePostText, setInlinePostText] = useState('');

  const handleInlinePostSubmit = () => {
    if (!inlinePostText.trim()) return;
    onCreatePost({
      format: 'text',
      contentText: inlinePostText.trim(),
      media: [],
      hashtags: ['OMNIConnect', 'SovereignEcosystem'],
      mentions: [],
      audience: 'public'
    });
    setInlinePostText('');
  };

  const handleCreateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;
    onCreateStatus({
      authorProfileId: activeProfile.id,
      authorHandle: `@${activeProfile.username}`,
      authorName: activeProfile.displayName,
      authorAvatar: activeProfile.avatarUrl,
      authorBadge: activeProfile.verificationBadge,
      type: 'text',
      text: newStatusText.trim(),
      backgroundColor: newStatusBg,
      audience: 'public',
      durationHours: 24
    });
    setNewStatusText('');
    setShowCreateStatusModal(false);
  };

  const handleToggleComments = (postId: string) => {
    setExpandedCommentsPostId(prev => (prev === postId ? null : postId));
  };

  const handleSendComment = (postId: string) => {
    if (!commentInputText.trim()) return;
    onComment(postId, commentInputText.trim());
    setCommentInputText('');
  };

  const handleTranslate = (postId: string) => {
    if (postTranslations[postId]) {
      // Toggle off
      setPostTranslations(prev => {
        const copy = { ...prev };
        delete copy[postId];
        return copy;
      });
      return;
    }
    const res = onTranslatePost(postId, 'es');
    setPostTranslations(prev => ({ ...prev, [postId]: res }));
  };

  const handleSummarize = (postId: string) => {
    if (postSummaries[postId]) {
      setPostSummaries(prev => {
        const copy = { ...prev };
        delete copy[postId];
        return copy;
      });
      return;
    }
    const res = onSummarizePost(postId);
    setPostSummaries(prev => ({ ...prev, [postId]: res }));
  };

  return (
    <div id="omni-connect-feed-view" className="max-w-4xl mx-auto space-y-6">
      {/* 1. EPHEMERAL 24H STATUS TRAY (STORIES) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 px-1 text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            24h Ephemeral Status Updates
          </span>
          <span className="text-[11px] text-slate-400">Auto-expires in 24 hours</span>
        </div>

        {/* Stories Horizontal Scroll */}
        <div className="flex items-center gap-4 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {/* Add Own Status Button */}
          <button
            onClick={() => setShowCreateStatusModal(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          >
            <div className="relative w-16 h-16 rounded-full p-0.5 border-2 border-dashed border-indigo-500/60 group-hover:border-indigo-400 flex items-center justify-center transition-colors">
              <img
                src={activeProfile.avatarUrl}
                alt="My Profile"
                className="w-full h-full rounded-full object-cover brightness-90 group-hover:brightness-100 transition-all"
              />
              <div className="absolute bottom-0 right-0 p-1 rounded-full bg-indigo-600 text-white shadow-md border-2 border-slate-900 group-hover:scale-110 transition-transform">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-300 group-hover:text-white truncate max-w-[70px]">
              Add Status
            </span>
          </button>

          {/* User Status Bubbles */}
          {statusTray.map(group => (
            <button
              key={group.authorProfileId}
              onClick={() => setActiveStoryGroup(group)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            >
              <div
                className={`w-16 h-16 rounded-full p-0.5 transition-all group-hover:scale-105 ${
                  group.hasUnseen
                    ? 'bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 ring-2 ring-indigo-500/40 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-700'
                }`}
              >
                <img
                  src={group.authorAvatar}
                  alt={group.authorName}
                  className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                />
              </div>
              <span className="text-[11px] font-medium text-slate-300 group-hover:text-white truncate max-w-[74px]">
                {group.authorName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. SHORT-FORM MOMENTS REELS STRIP (QUICK ACCESS) */}
      {moments.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <Flame className="w-4 h-4" />
              </span>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">OMNI Moments Reels</h3>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('moments')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
              >
                View Fullscreen Reels <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {moments.slice(0, 4).map(m => (
              <div
                key={m.id}
                onClick={() => onNavigateTab && onNavigateTab('moments')}
                className="relative aspect-[9/14] rounded-2xl overflow-hidden border border-slate-800 group cursor-pointer shadow-lg hover:border-indigo-500/60 transition-all"
              >
                <img
                  src={m.thumbnailUrl || m.videoUrl}
                  alt={m.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-3">
                  <div className="flex items-center gap-1 self-end bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white">
                    <Play className="w-2.5 h-2.5 fill-white" /> {m.likesCount}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block truncate">{m.authorName}</span>
                    <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">{m.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. QUICK CREATE POST BOX & ALGORITHM DRAWER BUTTON */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={activeProfile.avatarUrl}
            alt={activeProfile.displayName}
            className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/60 shadow-md"
          />
          <div className="flex-1 space-y-2">
            <textarea
              rows={2}
              value={inlinePostText}
              onChange={e => setInlinePostText(e.target.value)}
              placeholder={`Share what's on your mind, ${activeProfile.displayName.split(' ')[0]}...`}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-2xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowComposerModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-semibold"
              title="Media Gallery"
            >
              <ImageIcon className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Media</span>
            </button>
            <button
              onClick={() => setShowComposerModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-semibold"
              title="Interactive Poll"
            >
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Poll</span>
            </button>
            <button
              onClick={() => setShowComposerModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-semibold"
              title="Event Invitation"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Event</span>
            </button>
            <button
              onClick={() => setShowComposerModal(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-semibold"
              title="Store Product"
            >
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Store</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Algorithm Switchboard Button */}
            <button
              onClick={() => setShowAlgoModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span className="capitalize">{algoConfig.currentMode.replace('_', ' ')} Feed</span>
            </button>

            <button
              onClick={handleInlinePostSubmit}
              disabled={!inlinePostText.trim()}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Post
            </button>
          </div>
        </div>
      </div>

      {/* 4. MAIN FEED POSTS STREAM */}
      <div className="space-y-6">
        {posts.map(post => {
          const isTranslated = !!postTranslations[post.id];
          const isSummarized = !!postSummaries[post.id];
          const displayedText = isTranslated
            ? postTranslations[post.id]
            : post.contentText;

          const totalReactions: number = (Object.values(post.reactions || {}) as number[]).reduce((a: number, b: number) => a + (Number(b) || 0), 0);
          const commentsCount = post.comments.length;

          return (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 transition-all hover:border-slate-700/80"
            >
              {/* Post Top Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/60 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">{post.authorName}</h4>
                      {post.authorBadge && (
                        <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.authorHandle}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="capitalize text-slate-500">
                        {post.audience === 'public' ? '🌍 Public' : '🤝 Connections'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Options Menu Dropdown */}
                <div className="flex items-center gap-1">
                  {/* Algorithmic Score Badge */}
                  <span
                    title="Algorithmic Recommendation Composite Score"
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                  >
                    ⚡ {(post.algorithmicScore ?? post.score ?? 85).toFixed(0)} pts
                  </span>

                  <button
                    onClick={() => onMuteUser(post.authorHandle)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title={`Mute ${post.authorHandle}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title (if present) */}
              {post.title && (
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {post.title}
                </h3>
              )}

              {/* Post Content Body */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
                <p className="whitespace-pre-line">{displayedText}</p>

                {/* AI Translation Notice */}
                {isTranslated && (
                  <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5" /> Translated to Spanish via Gemini Sovereign Mesh
                    </span>
                    <button
                      onClick={() => handleTranslate(post.id)}
                      className="underline font-semibold hover:text-white"
                    >
                      Show Original
                    </button>
                  </div>
                )}

                {/* AI Summary Card */}
                {isSummarized && (
                  <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Gemini Executive TL;DR Summary:
                    </div>
                    <p>{postSummaries[post.id]}</p>
                  </div>
                )}
              </div>

              {/* Hashtags */}
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.hashtags.map(t => (
                    <button
                      key={t}
                      onClick={() => onMuteTopic(t)}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/40 transition-colors"
                      title="Click to manage tag"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}

              {/* RICH FORMAT SPECIALIZED RENDERERS */}

              {/* 1. MEDIA ATTACHMENTS (Images, Videos, Audios, Documents, Carousels) */}
              {post.media.length > 0 && (
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  {/* Single Image */}
                  {post.media.length === 1 && post.media[0].type === 'image' && (
                    <img
                      src={post.media[0].url}
                      alt={post.media[0].caption || 'Post Media'}
                      className="w-full max-h-[480px] object-cover"
                    />
                  )}

                  {/* Carousel Multiple Images */}
                  {post.media.length > 1 && (
                    <div className="relative aspect-video">
                      <img
                        src={post.media[carouselIndices[post.id] || 0].url}
                        alt="Carousel Media"
                        className="w-full h-full object-cover"
                      />
                      {/* Left/Right Carousel Controls */}
                      <button
                        onClick={() =>
                          setCarouselIndices(prev => ({
                            ...prev,
                            [post.id]: Math.max(0, (prev[post.id] || 0) - 1)
                          }))
                        }
                        disabled={(carouselIndices[post.id] || 0) === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white disabled:opacity-30 backdrop-blur-md"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setCarouselIndices(prev => ({
                            ...prev,
                            [post.id]: Math.min(post.media.length - 1, (prev[post.id] || 0) + 1)
                          }))
                        }
                        disabled={(carouselIndices[post.id] || 0) === post.media.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white disabled:opacity-30 backdrop-blur-md"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      {/* Index counter pill */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-[11px] font-bold text-white backdrop-blur-md">
                        {(carouselIndices[post.id] || 0) + 1} / {post.media.length}
                      </div>
                    </div>
                  )}

                  {/* Single Video Attachment */}
                  {post.media[0]?.type === 'video' && (
                    <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center group">
                      <img
                        src={post.media[0].thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200'}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover brightness-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 rounded-full bg-indigo-600/90 text-white shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md p-2 rounded-xl">
                        <span>4K Ultra HD • H.265 CDN Stream</span>
                        <span>04:12</span>
                      </div>
                    </div>
                  )}

                  {/* Single Audio Attachment */}
                  {post.media[0]?.type === 'audio' && (
                    <div className="p-4 bg-slate-900 flex items-center gap-4">
                      <div className="p-3.5 rounded-2xl bg-pink-600/20 text-pink-400">
                        <Music className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-white">
                          <span>{post.media[0].caption || 'Sovereign Audio Broadcast Track'}</span>
                          <span className="text-slate-400">03:45</span>
                        </div>
                        {/* Audio Waveform simulated visualizer */}
                        <div className="flex items-center gap-1 h-6">
                          {[40, 70, 90, 30, 60, 100, 80, 45, 60, 95, 85, 40, 65, 90, 70, 50, 80, 100, 60, 40].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-indigo-500/80 rounded-full"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Single Document Attachment */}
                  {post.media[0]?.type === 'document' && (
                    <div className="p-4 bg-slate-900 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-emerald-600/20 text-emerald-400">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">
                            {post.media[0].caption || 'Technical Specification Document.pdf'}
                          </h5>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {(post.media[0].sizeBytes / 1048576).toFixed(2)} MB • PDF Format
                          </span>
                        </div>
                      </div>
                      <a
                        href={post.media[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* 2. INTERACTIVE POLL RENDERER */}
              {post.poll && (
                <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-indigo-400" />
                      {post.poll.question}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {post.poll.totalVotes} total votes
                    </span>
                  </div>

                  <div className="space-y-2">
                    {post.poll.options.map(opt => {
                      const pct =
                        post.poll!.totalVotes > 0
                          ? Math.round((opt.votesCount / post.poll!.totalVotes) * 100)
                          : 0;
                      const hasVotedThis = opt.voterProfileIds.includes(activeProfile.id);

                      return (
                        <button
                          key={opt.id}
                          onClick={() => onVotePoll(post.id, opt.id)}
                          className={`w-full relative overflow-hidden rounded-xl border p-3 text-left transition-all group ${
                            hasVotedThis
                              ? 'border-indigo-500 bg-indigo-950/30'
                              : 'border-slate-700 bg-slate-800/60 hover:border-slate-600'
                          }`}
                        >
                          {/* Percentage progress fill */}
                          <div
                            className="absolute inset-y-0 left-0 bg-indigo-600/30 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                          <div className="relative z-10 flex items-center justify-between text-xs font-semibold">
                            <span className="text-white flex items-center gap-2">
                              {hasVotedThis && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                              {opt.optionText}
                            </span>
                            <span className="font-mono text-slate-300">{pct}%</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. EVENT INVITATION RENDERER */}
              {post.event && (
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{post.event.title}</h4>
                      <div className="text-xs text-slate-400 space-y-0.5">
                        <p>{new Date(post.event.startDate).toLocaleString()}</p>
                        <p className="text-indigo-300 font-medium">📍 {post.event.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      <strong>{post.event.rsvpCount}</strong> attending
                    </span>
                    <button
                      onClick={() => onRsvpEvent(post.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                        post.event.isAttending
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {post.event.isAttending ? '✓ Attending' : 'RSVP Now'}
                    </button>
                  </div>
                </div>
              )}

              {/* 4. PRODUCT STOREFRONT COMMERCE CARD */}
              {post.product && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={post.product.productImageUrl}
                      alt={post.product.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        COMMERCE STOREFRONT
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{post.product.title}</h4>
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        ${post.product.priceUsd.toFixed(2)} USD
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`OMNI Pay: 1-Click purchase initiated for ${post.product?.title}`);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Buy via OMNI Pay
                  </button>
                </div>
              )}

              {/* 5. LIVE STREAM CARD */}
              {post.liveStream && (
                <div className="relative rounded-2xl overflow-hidden border border-rose-500/40 bg-slate-950 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-600 text-white flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" /> LIVE NOW
                      </span>
                      <h4 className="text-sm font-bold text-white">{post.liveStream.streamTitle}</h4>
                    </div>
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {post.liveStream.currentViewers} watching
                    </span>
                  </div>

                  <div className="aspect-video rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 text-rose-400">
                    <Radio className="w-12 h-12 animate-pulse" />
                  </div>
                </div>
              )}

              {/* BOTTOM ACTIONS BAR & REACTION SUMMARY */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* Reactions Button with Count */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onReact(post.id, 'like')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                      post.hasReacted
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.hasReacted ? 'fill-white' : ''}`} />
                    <span>{totalReactions > 0 ? totalReactions : 'React'}</span>
                  </button>

                  <button
                    onClick={() => onReact(post.id, 'fire')}
                    className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-amber-400 transition-colors"
                    title="Fire"
                  >
                    🔥 {post.reactions.fire || 0}
                  </button>
                  <button
                    onClick={() => onReact(post.id, 'insightful')}
                    className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-indigo-400 transition-colors"
                    title="Insightful"
                  >
                    💡 {post.reactions.insightful || 0}
                  </button>
                  <button
                    onClick={() => onReact(post.id, 'sovereign')}
                    className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-purple-400 transition-colors"
                    title="Sovereign"
                  >
                    ⚡ {post.reactions.sovereign || 0}
                  </button>
                </div>

                {/* Comments & Utilities */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{commentsCount} Comments</span>
                  </button>

                  <button
                    onClick={() => onShare(post.id)}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSave(post.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      post.isSaved
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title={post.isSaved ? 'Saved' : 'Save'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${post.isSaved ? 'fill-white' : ''}`} />
                  </button>

                  {/* AI Translation Button */}
                  <button
                    onClick={() => handleTranslate(post.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      isTranslated
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-indigo-400'
                    }`}
                    title="AI Translate Post"
                  >
                    <Languages className="w-3.5 h-3.5" />
                  </button>

                  {/* AI Summarizer Button */}
                  <button
                    onClick={() => handleSummarize(post.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      isSummarized
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-purple-400'
                    }`}
                    title="AI Summarize Post"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* EXPANDABLE COMMENTS SECTION */}
              {expandedCommentsPostId === post.id && (
                <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in slide-in-from-top duration-200">
                  {/* Comments List */}
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {post.comments.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">No comments yet. Start the conversation!</p>
                    ) : (
                      post.comments.map(c => (
                        <div key={c.id} className="flex items-start gap-2.5">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
                          />
                          <div className="flex-1 bg-slate-800/50 rounded-2xl p-3 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white">{c.authorName}</span>
                                <span className="text-[10px] text-slate-400">{c.authorHandle}</span>
                              </div>
                              <span className="text-[10px] text-slate-500">
                                {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-slate-200 leading-relaxed">{c.commentText}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write a sovereign comment..."
                      value={commentInputText}
                      onChange={e => setCommentInputText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      disabled={!commentInputText.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* 5. MODALS */}

      {/* Post Composer Modal */}
      {showComposerModal && (
        <OmniPostComposerModal
          activeProfile={activeProfile}
          onClose={() => setShowComposerModal(false)}
          onSubmitPost={onCreatePost}
          aiTools={aiTools}
        />
      )}

      {/* Feed Recommendation Algorithm Drawer */}
      {showAlgoModal && (
        <OmniFeedAlgorithmModal
          config={algoConfig}
          onUpdateConfig={onUpdateAlgoConfig}
          onMuteTopic={onMuteTopic}
          onUnmuteTopic={onUnmuteTopic}
          onMuteUser={onMuteUser}
          onUnmuteUser={onUnmuteUser}
          onClose={() => setShowAlgoModal(false)}
        />
      )}

      {/* Status Stories Fullscreen Viewer */}
      {activeStoryGroup && (
        <OmniStatusViewerModal
          authorGroup={activeStoryGroup}
          onClose={() => setActiveStoryGroup(null)}
          onView={onViewStatusItem}
          onReact={onReactStatusItem}
        />
      )}

      {/* Create New Status Modal */}
      {showCreateStatusModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                Publish 24h Status Story
              </h3>
              <button
                onClick={() => setShowCreateStatusModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStatusSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Status Text</label>
                <textarea
                  rows={3}
                  value={newStatusText}
                  onChange={e => setNewStatusText(e.target.value)}
                  required
                  placeholder="What's your active status update?"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Background Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950', label: 'Twilight' },
                    { id: 'bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950', label: 'Emerald' },
                    { id: 'bg-gradient-to-br from-rose-900 via-pink-950 to-slate-950', label: 'Crimson' }
                  ].map(bg => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setNewStatusBg(bg.id)}
                      className={`p-2 rounded-xl text-[11px] font-bold text-white border transition-all ${
                        newStatusBg === bg.id ? 'border-white scale-105' : 'border-transparent opacity-60'
                      } ${bg.id}`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateStatusModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg"
                >
                  Publish Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
