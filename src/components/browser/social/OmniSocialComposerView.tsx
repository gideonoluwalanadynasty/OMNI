import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Calendar,
  Clock,
  Image as ImageIcon,
  Video,
  Layers,
  Check,
  AlertTriangle,
  Smile,
  Hash,
  Eye,
  Sliders,
  ChevronRight,
  Trash2,
  Plus,
  Wand2
} from 'lucide-react';
import {
  SocialPlatform,
  SocialAccount,
  SocialPost,
  GeneratedCaptionVariation
} from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';
import { OmniSocialAiCaptionModal } from './OmniSocialAiCaptionModal';

interface OmniSocialComposerViewProps {
  accounts: SocialAccount[];
  onPostCreated: () => void;
}

export const OmniSocialComposerView: React.FC<OmniSocialComposerViewProps> = ({
  accounts,
  onPostCreated
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['x', 'linkedin', 'instagram', 'threads']);
  const [primaryContent, setPrimaryContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [campaignTag, setCampaignTag] = useState('Product Launch 2026');
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'video' | 'carousel'>('image');
  const [mediaUrls, setMediaUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  ]);
  const [mediaInput, setMediaInput] = useState('');

  // Per-platform customization overrides
  const [platformOverrides, setPlatformOverrides] = useState<Partial<Record<SocialPlatform, string>>>({});
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<SocialPlatform>('x');

  // Scheduling
  const [scheduleMode, setScheduleMode] = useState<'now' | 'schedule' | 'draft'>('schedule');
  const [scheduledDateTime, setScheduledDateTime] = useState(
    new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString().slice(0, 16)
  );

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const getEffectiveContentForPlatform = (plat: SocialPlatform): string => {
    return platformOverrides[plat] !== undefined ? platformOverrides[plat]! : primaryContent;
  };

  const handleAddMedia = () => {
    if (mediaInput.trim()) {
      setMediaUrls([...mediaUrls, mediaInput.trim()]);
      setMediaInput('');
    }
  };

  const handleRemoveMedia = (idx: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== idx));
  };

  const handleApplyAiVariation = (variation: GeneratedCaptionVariation, platform: SocialPlatform) => {
    setPrimaryContent(variation.fullCaption);
    setPostTitle(variation.hook);
    setPlatformOverrides(prev => ({
      ...prev,
      [platform]: variation.fullCaption
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryContent.trim() && mediaUrls.length === 0) return;

    const targetAccounts = accounts
      .filter(a => selectedPlatforms.includes(a.platform))
      .map(a => a.id);

    const isNow = scheduleMode === 'now';

    const newPost = omniSocialService.createPost({
      title: postTitle || 'Omni Social Broadcast',
      primaryContent,
      platformCustomizations: selectedPlatforms.reduce((acc, p) => {
        if (platformOverrides[p]) {
          acc[p] = { content: platformOverrides[p] };
        }
        return acc;
      }, {} as any),
      targetAccountIds: targetAccounts,
      targetPlatforms: selectedPlatforms,
      mediaType,
      mediaUrls,
      thumbnailUrl: mediaUrls[0],
      status: isNow ? 'published' : scheduleMode === 'draft' ? 'draft' : 'scheduled',
      scheduledFor: new Date(scheduledDateTime).toISOString(),
      campaignTag,
      approvalStatus: 'approved'
    });

    if (isNow) {
      omniSocialService.publishPostNow(newPost.id);
      setSuccessMessage('Published successfully across all selected official APIs!');
    } else {
      setSuccessMessage('Post scheduled in queue with autonomous dispatcher.');
    }

    setTimeout(() => {
      setSuccessMessage(null);
      onPostCreated();
    }, 1500);
  };

  const activeContent = getEffectiveContentForPlatform(activePreviewPlatform);
  const currentMaxChars = PLATFORM_METADATA[activePreviewPlatform].maxChars;
  const isOverLimit = activeContent.length > currentMaxChars;

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid: Composer Form on Left (7 cols), Live Mockup Preview on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Universal Composer Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5 bg-stone-900 border border-stone-800 p-6 rounded-2xl shadow-xl">
          {/* Target Platforms Multi-Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                Select Destination Platforms
              </label>
              <span className="text-xs text-stone-400 font-mono">
                {selectedPlatforms.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(plat => {
                const isSelected = selectedPlatforms.includes(plat);
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => togglePlatform(plat)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-950 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/40 shadow-sm'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <OmniSocialPlatformBadge platform={plat} showName={false} size="sm" />
                      <span className="truncate">{PLATFORM_METADATA[plat].name.split(' ')[0]}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Trigger Bar & Post Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-200">Post Title & Campaign</label>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>OMNI AI Caption Crafter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                placeholder="Post Title / Internal Reference..."
                className="p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={campaignTag}
                onChange={e => setCampaignTag(e.target.value)}
                placeholder="Campaign Tag (e.g. Launch 2026)"
                className="p-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Master Content Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-stone-200">Primary Post Content</label>
              <span className={`font-mono ${isOverLimit ? 'text-rose-400 font-bold' : 'text-stone-400'}`}>
                {activeContent.length} / {currentMaxChars} chars
              </span>
            </div>

            <textarea
              value={primaryContent}
              onChange={e => setPrimaryContent(e.target.value)}
              placeholder="What do you want to share with your audience across all channels? (Include hashtags, links, and line breaks)..."
              rows={6}
              className="w-full p-3 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
            />

            {isOverLimit && (
              <div className="p-2 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Exceeds character limit for {PLATFORM_METADATA[activePreviewPlatform].name} ({currentMaxChars} max). Customize platform override below.</span>
              </div>
            )}
          </div>

          {/* Media Attachments */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-200">Media Assets</label>
            <div className="flex items-center gap-2">
              <div className="flex bg-stone-950 rounded-xl p-1 border border-stone-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${mediaType === 'image' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                >
                  Image
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${mediaType === 'video' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                >
                  Video
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('carousel')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${mediaType === 'carousel' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
                >
                  Carousel
                </button>
              </div>

              <input
                type="text"
                value={mediaInput}
                onChange={e => setMediaInput(e.target.value)}
                placeholder="Paste media URL or CDN asset link..."
                className="flex-1 p-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddMedia}
                className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold shrink-0"
              >
                Add
              </button>
            </div>

            {/* Media Thumbnails */}
            {mediaUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {mediaUrls.map((url, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-stone-700 bg-stone-950">
                    <img src={url} alt={`Media ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(idx)}
                      className="absolute top-1 right-1 p-1 rounded bg-black/70 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scheduling & Actions Strip */}
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleMode('schedule')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    scheduleMode === 'schedule'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule in Queue</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleMode('now')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    scheduleMode === 'now'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Immediately</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleMode('draft')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    scheduleMode === 'draft'
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Save as Draft
                </button>
              </div>

              {scheduleMode === 'schedule' && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <input
                    type="datetime-local"
                    value={scheduledDateTime}
                    onChange={e => setScheduledDateTime(e.target.value)}
                    className="p-1.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <span className="text-stone-400">Targeting {selectedPlatforms.length} official connectors</span>
              <button
                type="submit"
                disabled={isOverLimit || (!primaryContent.trim() && mediaUrls.length === 0)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {scheduleMode === 'now'
                    ? 'Publish via Official APIs'
                    : scheduleMode === 'draft'
                    ? 'Save Draft'
                    : 'Confirm & Schedule Dispatch'}
                </span>
              </button>
            </div>
          </div>
        </form>

        {/* Right Column: Live Mockup Preview per Platform */}
        <div className="lg:col-span-5 space-y-4">
          {/* Preview Platform Tab Strip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span>Live Cross-Platform Preview</span>
            </div>

            <select
              value={activePreviewPlatform}
              onChange={e => setActivePreviewPlatform(e.target.value as any)}
              className="px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-xl text-xs text-indigo-300 font-semibold focus:outline-none"
            >
              {selectedPlatforms.map(p => (
                <option key={p} value={p}>
                  Preview: {PLATFORM_METADATA[p].name}
                </option>
              ))}
            </select>
          </div>

          {/* Mockup Card Device Enclave */}
          <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-3 shadow-2xl">
            {/* Header of Mockup */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover border border-stone-700"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-stone-100">OMNI Sovereign OS</span>
                    <span className="w-3 h-3 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white">✓</span>
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono">@OmniSovereign • Just now</div>
                </div>
              </div>

              <OmniSocialPlatformBadge platform={activePreviewPlatform} size="sm" />
            </div>

            {/* Content Preview */}
            <div className="text-xs text-stone-200 whitespace-pre-wrap leading-relaxed min-h-[80px]">
              {activeContent || <span className="text-stone-600 italic">Type content in the editor to see live rendering...</span>}
            </div>

            {/* Media Mockup */}
            {mediaUrls.length > 0 && (
              <div className="rounded-xl overflow-hidden border border-stone-800 bg-black max-h-56">
                <img
                  src={mediaUrls[0]}
                  alt="Post preview"
                  className="w-full h-full object-cover max-h-56"
                />
              </div>
            )}

            {/* Footer Engagement Simulation */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500 font-mono">
              <span>0 Likes</span>
              <span>0 Reposts</span>
              <span>0 Comments</span>
              <span>Verified Official API</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      <OmniSocialAiCaptionModal
        isOpen={isAiModalOpen}
        initialPlatform={activePreviewPlatform}
        initialTopic={primaryContent || postTitle}
        onClose={() => setIsAiModalOpen(false)}
        onSelectVariation={handleApplyAiVariation}
      />
    </div>
  );
};
