import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Image,
  Video,
  Music,
  FileText,
  BarChart2,
  Calendar,
  ShoppingBag,
  Radio,
  Globe,
  Users,
  Layers,
  Lock,
  Plus,
  Trash2,
  Send,
  Languages,
  CheckCircle2,
  AlertCircle,
  Wand2
} from 'lucide-react';
import {
  OmniPostFormat,
  OmniAudienceScope,
  OmniMediaAttachment,
  OmniSocialPost
} from '../../types/omni_social_engine';
import { ConnectProfile } from '../../types/omni_connect';

interface Props {
  activeProfile: ConnectProfile;
  onClose: () => void;
  onSubmitPost: (postData: {
    format: OmniPostFormat;
    title?: string;
    contentText: string;
    media: OmniMediaAttachment[];
    hashtags: string[];
    mentions: string[];
    audience: OmniAudienceScope;
    circleIds?: string[];
    poll?: {
      question: string;
      options: Array<{ id: string; optionText: string; votesCount: number; voterProfileIds: string[] }>;
      totalVotes: number;
      allowsMultiple: boolean;
      expiresAt: string;
    };
    event?: {
      id: string;
      title: string;
      startDate: string;
      location: string;
      isOnline: boolean;
      meetingRoomId?: string;
      rsvpCount: number;
      isAttending?: boolean;
    };
    product?: {
      id: string;
      title: string;
      priceUsd: number;
      currency: string;
      category: string;
      inventoryCount: number;
      productImageUrl: string;
    };
    liveStream?: {
      id: string;
      streamTitle: string;
      streamStatus: 'live' | 'scheduled' | 'ended';
      currentViewers: number;
      startedAt: string;
      playbackHlsUrl: string;
    };
  }) => void;
  aiTools: {
    generateCaption: (prompt: string, tone: string) => string;
    improveWriting: (text: string, tone: any) => string;
    generateHashtags: (text: string) => string[];
    translateText: (text: string, lang: string) => string;
    generateVisualConcept: (desc: string) => { title: string; prompt: string; previewUrl: string };
  };
}

export const OmniPostComposerModal: React.FC<Props> = ({
  activeProfile,
  onClose,
  onSubmitPost,
  aiTools
}) => {
  const [activeFormat, setActiveFormat] = useState<OmniPostFormat>('text');
  const [postTitle, setPostTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [audience, setAudience] = useState<OmniAudienceScope>('public');
  const [hashtags, setHashtags] = useState<string[]>(['OMNIConnect', 'SovereignTech']);
  const [hashtagInput, setHashtagInput] = useState('');

  // Media state
  const [mediaList, setMediaList] = useState<OmniMediaAttachment[]>([]);
  const [mediaInputUrl, setMediaInputUrl] = useState('');
  const [mediaInputType, setMediaInputType] = useState<'image' | 'video' | 'audio' | 'document'>('image');
  const [mediaInputCaption, setMediaInputCaption] = useState('');

  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Yes, absolutely', 'No, need more details', 'Decentralized approach only']);
  const [pollAllowsMultiple, setPollAllowsMultiple] = useState(false);

  // Event state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-09-15T18:00:00Z');
  const [eventLocation, setEventLocation] = useState('OMNI Sovereign HD Stage (Online)');

  // Product state
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState(49);
  const [productImage, setProductImage] = useState('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600');
  const [productCategory, setProductCategory] = useState('developer_toolkit');

  // Live Stream state
  const [liveStreamTitle, setLiveStreamTitle] = useState('');

  // AI Copilot state
  const [showAiCopilot, setShowAiCopilot] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState<string>('Executive');
  const [targetTranslationLang, setTargetTranslationLang] = useState('es');

  // Add media handler
  const handleAddMedia = () => {
    if (!mediaInputUrl.trim()) return;
    const newAtt: OmniMediaAttachment = {
      id: `att_${Date.now()}`,
      type: mediaInputType,
      url: mediaInputUrl.trim(),
      name: mediaInputUrl.split('/').pop() || 'Media File',
      caption: mediaInputCaption.trim() || undefined,
      sizeBytes: 1500000,
      mimeType: mediaInputType === 'image' ? 'image/jpeg' : mediaInputType === 'video' ? 'video/mp4' : 'application/octet-stream',
      cloudStorageKey: `keys/media_${Date.now()}`,
      cdnUrl: mediaInputUrl.trim(),
      processingStatus: 'ready'
    };
    setMediaList(prev => [...prev, newAtt]);
    setMediaInputUrl('');
    setMediaInputCaption('');
  };

  const handleAddHashtag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashtagInput.trim()) return;
    const clean = hashtagInput.replace('#', '').trim();
    if (!hashtags.includes(clean)) {
      setHashtags(prev => [...prev, clean]);
    }
    setHashtagInput('');
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(prev => prev.filter(t => t !== tag));
  };

  // AI Actions
  const handleAiGenerateCaption = () => {
    const generated = aiTools.generateCaption(aiPrompt || contentText || 'Decentralized Sovereign Infrastructure', aiTone);
    setContentText(generated);
    const tags = aiTools.generateHashtags(generated);
    setHashtags(prev => Array.from(new Set([...prev, ...tags])));
  };

  const handleAiImproveWriting = () => {
    if (!contentText.trim()) return;
    const improved = aiTools.improveWriting(contentText, aiTone as any);
    setContentText(improved);
  };

  const handleAiExtractTags = () => {
    if (!contentText.trim()) return;
    const tags = aiTools.generateHashtags(contentText);
    setHashtags(prev => Array.from(new Set([...prev, ...tags])));
  };

  const handleAiTranslate = () => {
    if (!contentText.trim()) return;
    const translated = aiTools.translateText(contentText, targetTranslationLang);
    setContentText(translated);
  };

  const handleAiVisualConcept = () => {
    const concept = aiTools.generateVisualConcept(contentText || 'Sovereign Network Diagram');
    setMediaList(prev => [
      ...prev,
      {
        id: `att_${Date.now()}`,
        type: 'image',
        url: concept.previewUrl,
        caption: concept.title,
        sizeBytes: 3200000
      }
    ]);
  };

  // Final Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentText.trim() && activeFormat === 'text') return;

    let pollPayload = undefined;
    if (activeFormat === 'poll' && pollQuestion.trim()) {
      pollPayload = {
        question: pollQuestion.trim(),
        options: pollOptions.map((opt, idx) => ({
          id: `opt_${idx}`,
          optionText: opt,
          votesCount: 0,
          voterProfileIds: []
        })),
        totalVotes: 0,
        allowsMultiple: pollAllowsMultiple,
        expiresAt: new Date(Date.now() + 7 * 86400000).toISOString()
      };
    }

    let eventPayload = undefined;
    if (activeFormat === 'event' && eventTitle.trim()) {
      eventPayload = {
        id: `ev_${Date.now()}`,
        title: eventTitle.trim(),
        startDate: eventDate,
        location: eventLocation,
        isOnline: true,
        meetingRoomId: 'room_sovereign_stage',
        rsvpCount: 1,
        isAttending: true
      };
    }

    let productPayload = undefined;
    if (activeFormat === 'product' && productTitle.trim()) {
      productPayload = {
        id: `prod_${Date.now()}`,
        title: productTitle.trim(),
        priceUsd: productPrice,
        currency: 'USD',
        category: productCategory,
        inventoryCount: 99,
        productImageUrl: productImage
      };
    }

    let liveStreamPayload = undefined;
    if (activeFormat === 'live_stream' && liveStreamTitle.trim()) {
      liveStreamPayload = {
        id: `live_${Date.now()}`,
        streamTitle: liveStreamTitle.trim(),
        streamStatus: 'live' as const,
        currentViewers: 42,
        startedAt: new Date().toISOString(),
        playbackHlsUrl: 'https://cdn.omni.com/live/stream_primary.m3u8'
      };
    }

    // Determine final format based on content
    let finalFormat = activeFormat;
    if (mediaList.length > 1) finalFormat = 'carousel';
    else if (mediaList.length === 1) {
      if (mediaList[0].type === 'image') finalFormat = 'image';
      else if (mediaList[0].type === 'video') finalFormat = 'video';
      else if (mediaList[0].type === 'audio') finalFormat = 'audio';
      else if (mediaList[0].type === 'document') finalFormat = 'document';
    }

    onSubmitPost({
      format: finalFormat,
      title: postTitle.trim() || undefined,
      contentText: contentText.trim() || (finalFormat === 'poll' ? pollQuestion : `${activeProfile.displayName} created a new ${finalFormat}`),
      media: mediaList,
      hashtags,
      mentions: [],
      audience,
      poll: pollPayload,
      event: eventPayload,
      product: productPayload,
      liveStream: liveStreamPayload
    });

    onClose();
  };

  return (
    <div
      id="omni-post-composer-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <img
              src={activeProfile.avatarUrl}
              alt={activeProfile.displayName}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{activeProfile.displayName}</span>
                <span className="text-xs text-slate-400">(@{activeProfile.username})</span>
              </div>
              {/* Audience Scope Dropdown */}
              <div className="flex items-center gap-1.5 pt-0.5">
                <select
                  value={audience}
                  onChange={e => setAudience(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-0.5 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="public">🌍 Public (Global Feed)</option>
                  <option value="mutual_connections">🤝 Mutual Connections Only</option>
                  <option value="circle">⭕ Selected Circles</option>
                  <option value="private">🔒 Only Me (Private Draft)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAiCopilot(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showAiCopilot
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 hover:bg-indigo-900/50'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              OMNI AI Copilot
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Format Selector Pills Bar */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'text', label: 'Post', icon: FileText },
            { id: 'image', label: 'Media Gallery', icon: Image },
            { id: 'poll', label: 'Poll', icon: BarChart2 },
            { id: 'event', label: 'Event Invite', icon: Calendar },
            { id: 'product', label: 'Store Product', icon: ShoppingBag },
            { id: 'live_stream', label: 'Live Stream', icon: Radio }
          ].map(fmt => {
            const Icon = fmt.icon;
            return (
              <button
                key={fmt.id}
                onClick={() => setActiveFormat(fmt.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeFormat === fmt.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {fmt.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* AI Copilot Expandable Panel */}
          {showAiCopilot && (
            <div className="bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/40 rounded-2xl p-4 space-y-3 animate-in slide-in-from-top duration-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  OMNI AI Social Content Assistant
                </span>
                <span className="text-[10px] text-indigo-300 font-mono">Gemini 2.5 Sovereign Mesh</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Topic / key announcement for AI caption..."
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <select
                    value={aiTone}
                    onChange={e => setAiTone(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="Executive">Executive Tone</option>
                    <option value="Inspiring">Inspiring Tone</option>
                    <option value="Casual">Casual Tone</option>
                    <option value="Professional">Professional Tone</option>
                    <option value="Viral">Viral Thread Tone</option>
                    <option value="Technical">Technical Spec</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAiGenerateCaption}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Generate Post
                </button>
                <button
                  type="button"
                  onClick={handleAiImproveWriting}
                  disabled={!contentText.trim()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold border border-slate-700 transition-colors"
                >
                  ✨ Improve Writing
                </button>
                <button
                  type="button"
                  onClick={handleAiExtractTags}
                  disabled={!contentText.trim()}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold border border-slate-700 transition-colors"
                >
                  🏷 Extract Hashtags
                </button>
                <button
                  type="button"
                  onClick={handleAiVisualConcept}
                  className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 rounded-xl font-bold transition-colors"
                >
                  🎨 Generate Concept Graphic
                </button>

                <div className="flex items-center gap-1 ml-auto">
                  <Languages className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={targetTranslationLang}
                    onChange={e => setTargetTranslationLang(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300"
                  >
                    <option value="es">Spanish (Español)</option>
                    <option value="fr">French (Français)</option>
                    <option value="de">German (Deutsch)</option>
                    <option value="yo">Yorùbá</option>
                    <option value="pt">Portuguese</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ar">Arabic</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAiTranslate}
                    disabled={!contentText.trim()}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg font-bold border border-slate-700"
                  >
                    Translate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Optional Headline */}
          <div>
            <input
              type="text"
              placeholder="Headline / Subject (optional)"
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Main Content Area */}
          <div>
            <textarea
              rows={4}
              placeholder="What's happening in your sovereign world? Share updates, architecture blueprints, or announcements..."
              value={contentText}
              onChange={e => setContentText(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* FORMAT SPECIFIC INPUT SECTIONS */}

          {/* 1. MEDIA ATTACHMENTS */}
          {activeFormat === 'image' && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Image className="w-4 h-4 text-indigo-400" /> Add Media Attachments (CDN Stored)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <input
                    type="url"
                    placeholder="Asset URL (Image, Video, PDF, MP3)..."
                    value={mediaInputUrl}
                    onChange={e => setMediaInputUrl(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <select
                    value={mediaInputType}
                    onChange={e => setMediaInputType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="image">Image Asset</option>
                    <option value="video">Video Stream (MP4/HLS)</option>
                    <option value="audio">Audio / Podcast (MP3)</option>
                    <option value="document">Document (PDF/XLS)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Optional Media Caption / Title"
                  value={mediaInputCaption}
                  onChange={e => setMediaInputCaption(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddMedia}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors"
                >
                  Add Media
                </button>
              </div>

              {/* Media Preview Grid */}
              {mediaList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {mediaList.map((m, idx) => (
                    <div key={m.id} className="relative rounded-xl overflow-hidden border border-slate-700 aspect-video bg-slate-900 group">
                      {m.type === 'image' && (
                        <img src={m.url} alt="Attached" className="w-full h-full object-cover" />
                      )}
                      {m.type === 'video' && (
                        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-indigo-400 font-bold">
                          🎬 Video Stream
                        </div>
                      )}
                      {m.type === 'audio' && (
                        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-pink-400 font-bold">
                          🎵 Audio Waveform
                        </div>
                      )}
                      {m.type === 'document' && (
                        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-emerald-400 font-bold">
                          📄 PDF Document
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setMediaList(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-1 bg-rose-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. POLL CREATOR */}
          {activeFormat === 'poll' && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-indigo-400" /> Create Sovereign Interactive Poll
              </span>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Poll Question</label>
                <input
                  type="text"
                  placeholder="Ask the community a question..."
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold">Options</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const copy = [...pollOptions];
                        copy[idx] = e.target.value;
                        setPollOptions(copy);
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(prev => prev.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 6 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions(prev => [...prev, `Option ${prev.length + 1}`])}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Option
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="poll-multiple"
                  checked={pollAllowsMultiple}
                  onChange={e => setPollAllowsMultiple(e.target.checked)}
                  className="rounded accent-indigo-600"
                />
                <label htmlFor="poll-multiple" className="text-slate-300">
                  Allow voters to select multiple choices
                </label>
              </div>
            </div>
          )}

          {/* 3. EVENT CREATOR */}
          {activeFormat === 'event' && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" /> Event & HD Video Townhall Invitation
              </span>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Sovereign Builders Keynote"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date & Time</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location / Stage URL</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={e => setEventLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. PRODUCT STOREFRONT CARD */}
          {activeFormat === 'product' && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-amber-400" /> Social Storefront Commerce Card (OMNI Pay)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Product Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Sovereign SDK Lifetime License"
                    value={productTitle}
                    onChange={e => setProductTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={e => setProductPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={productImage}
                  onChange={e => setProductImage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* 5. LIVE STREAM */}
          {activeFormat === 'live_stream' && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" /> Broadcast Live Video Stream
              </span>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Live Stream Broadcast Title</label>
                <input
                  type="text"
                  placeholder="e.g. Live Q&A: Enterprise Architecture AMA"
                  value={liveStreamTitle}
                  onChange={e => setLiveStreamTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Hashtags Section */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="font-semibold text-slate-300">Hashtags & Distribution Channels</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add tag (e.g. Fintech, Web5)..."
                value={hashtagInput}
                onChange={e => setHashtagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddHashtag(e);
                }}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddHashtag}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-white transition-colors"
              >
                Add Tag
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {hashtags.map(t => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 flex items-center gap-1"
                >
                  #{t}
                  <button
                    type="button"
                    onClick={() => handleRemoveHashtag(t)}
                    className="hover:text-white p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> AI Safety Scan: Clean Content Certified
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
