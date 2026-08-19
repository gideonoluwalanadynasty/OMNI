import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Plus,
  Send,
  X,
  Play,
  Pause,
  Compass,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { OmniMoment } from '../../types/omni_social_engine';
import { ConnectProfile } from '../../types/omni_connect';

interface Props {
  moments: OmniMoment[];
  activeProfile: ConnectProfile;
  onLikeMoment: (momentId: string) => void;
  onSaveMoment: (momentId: string) => void;
  onCreateMoment: (momentData: {
    videoUrl: string;
    thumbnailUrl: string;
    caption: string;
    audioTrackName: string;
    tags: string[];
  }) => void;
}

export const OmniMomentsView: React.FC<Props> = ({
  moments,
  activeProfile,
  onLikeMoment,
  onSaveMoment,
  onCreateMoment
}) => {
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [mockComments, setMockComments] = useState<Record<string, Array<{ id: string; author: string; avatar: string; text: string; time: string }>>>({
    moment_001: [
      {
        id: 'c1',
        author: 'Dr. Sarah Lin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        text: 'The sub-second settlement benchmark is incredible! 👏',
        time: '12m ago'
      },
      {
        id: 'c2',
        author: 'David Adeleke',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        text: 'Sovereignty at its finest. Proud to build on OMNI.',
        time: '35m ago'
      }
    ]
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200');
  const [newCaption, setNewCaption] = useState('');
  const [newAudioTrack, setNewAudioTrack] = useState('Original Audio — OMNI Soundstage');
  const [newTagInput, setNewTagInput] = useState('SovereignTech, Web5');

  if (moments.length === 0) {
    return (
      <div id="omni-moments-empty" className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-white">No Moments Created Yet</h3>
        <p className="text-xs text-slate-400">Be the first to publish a short-form vertical moment reel to the sovereign network.</p>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
        >
          Create First Moment
        </button>
      </div>
    );
  }

  const currentMoment = moments[activeMomentIndex] || moments[0];
  const commentsForActive = mockComments[currentMoment.id] || [];

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    const newComm = {
      id: `comm_${Date.now()}`,
      author: activeProfile.displayName,
      avatar: activeProfile.avatarUrl,
      text: commentText.trim(),
      time: 'Just now'
    };
    setMockComments(prev => ({
      ...prev,
      [currentMoment.id]: [newComm, ...(prev[currentMoment.id] || [])]
    }));
    setCommentText('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;
    onCreateMoment({
      videoUrl: newVideoUrl,
      thumbnailUrl: newVideoUrl,
      caption: newCaption.trim(),
      audioTrackName: newAudioTrack.trim() || 'Original Audio',
      tags: newTagInput.split(',').map(t => t.trim()).filter(Boolean)
    });
    setNewCaption('');
    setShowCreateModal(false);
  };

  return (
    <div id="omni-moments-view" className="max-w-5xl mx-auto flex flex-col items-center justify-center py-4">
      {/* Top Header Controls */}
      <div className="w-full max-w-md flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            OMNI MOMENTS REELS
          </span>
          <span className="text-xs text-slate-400">
            {activeMomentIndex + 1} of {moments.length}
          </span>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Create Moment
        </button>
      </div>

      {/* Main Reel Viewport Container */}
      <div className="relative w-full max-w-md h-[80vh] max-h-[720px] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between select-none">
        {/* Background Simulated Video Reel */}
        <div
          className="absolute inset-0 z-0 bg-slate-900 cursor-pointer"
          onClick={() => setIsPlaying(prev => !prev)}
        >
          <img
            src={currentMoment.thumbnailUrl || currentMoment.videoUrl}
            alt={currentMoment.caption}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 brightness-75'}`}
          />

          {/* Pause / Play Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="p-4 rounded-full bg-white/20 text-white backdrop-blur-md">
                <Play className="w-8 h-8 fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Top Floating Action Bar */}
        <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(prev => !prev)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <span className="text-[11px] font-semibold text-slate-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
              HD 60fps • Sovereign CDN
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Enhanced</span>
          </div>
        </div>

        {/* Bottom Details Overlay & Right Floating Interaction Spine */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between gap-4">
          {/* Left Info Area */}
          <div className="flex-1 space-y-2.5 max-w-[75%]">
            {/* Author details */}
            <div className="flex items-center gap-2">
              <img
                src={currentMoment.authorAvatar}
                alt={currentMoment.authorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white drop-shadow">
                    {currentMoment.authorName}
                  </span>
                  {currentMoment.authorBadge && (
                    <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                  )}
                </div>
                <span className="text-xs text-slate-300">{currentMoment.authorHandle}</span>
              </div>
            </div>

            {/* Caption */}
            <p className="text-xs sm:text-sm text-white font-medium line-clamp-3 leading-relaxed drop-shadow">
              {currentMoment.caption}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {currentMoment.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-indigo-200 backdrop-blur-md"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Music Audio Track Tag */}
            {currentMoment.audioTrackName && (
              <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
                <Music className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span className="truncate max-w-[200px]">{currentMoment.audioTrackName}</span>
              </div>
            )}
          </div>

          {/* Right Floating Interaction Rail */}
          <div className="flex flex-col items-center gap-4 text-white">
            {/* Like */}
            <button
              onClick={() => onLikeMoment(currentMoment.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`p-3 rounded-full backdrop-blur-md transition-all group-hover:scale-115 ${
                  currentMoment.isLiked
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Heart className={`w-6 h-6 ${currentMoment.isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[11px] font-bold drop-shadow">
                {currentMoment.likesCount.toLocaleString()}
              </span>
            </button>

            {/* Comments */}
            <button
              onClick={() => setShowComments(prev => !prev)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all group-hover:scale-115">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold drop-shadow">
                {(currentMoment.commentsCount + commentsForActive.length).toLocaleString()}
              </span>
            </button>

            {/* Save */}
            <button
              onClick={() => onSaveMoment(currentMoment.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <div
                className={`p-3 rounded-full backdrop-blur-md transition-all group-hover:scale-115 ${
                  currentMoment.isSaved
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/50'
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
              >
                <Bookmark className={`w-6 h-6 ${currentMoment.isSaved ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[11px] font-bold drop-shadow">
                {currentMoment.isSaved ? 'Saved' : 'Save'}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="flex flex-col items-center gap-1 group"
            >
              <div className="p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all group-hover:scale-115">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold drop-shadow">
                {currentMoment.sharesCount}
              </span>
            </button>
          </div>
        </div>

        {/* Up / Down Navigation Arrow Keys */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            disabled={activeMomentIndex === 0}
            onClick={() => setActiveMomentIndex(prev => Math.max(0, prev - 1))}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Previous Moment"
          >
            ▲
          </button>
          <button
            disabled={activeMomentIndex === moments.length - 1}
            onClick={() => setActiveMomentIndex(prev => Math.min(moments.length - 1, prev + 1))}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Next Moment"
          >
            ▼
          </button>
        </div>

        {/* Sliding Comments Drawer Overlay */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-0 top-1/3 z-30 bg-slate-900/95 backdrop-blur-xl rounded-t-3xl p-4 flex flex-col justify-between border-t border-slate-800 animate-in slide-in-from-bottom duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-indigo-400" />
                Comments ({commentsForActive.length + currentMoment.commentsCount})
              </h4>
              <button
                onClick={() => setShowComments(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {commentsForActive.map(comm => (
                <div key={comm.id} className="flex items-start gap-2.5">
                  <img
                    src={comm.avatar}
                    alt={comm.author}
                    className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  />
                  <div className="flex-1 bg-slate-800/60 rounded-xl p-2.5 text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{comm.author}</span>
                      <span className="text-[10px] text-slate-400">{comm.time}</span>
                    </div>
                    <p className="text-slate-200">{comm.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a sovereign comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSendComment();
                }}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSendComment}
                disabled={!commentText.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Moment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Create OMNI Moment</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Video / Image Media URL</label>
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={e => setNewVideoUrl(e.target.value)}
                  required
                  placeholder="https://..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Moment Caption</label>
                <textarea
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  required
                  rows={3}
                  placeholder="Describe your moment, key insight, or announcement..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Audio Track Name</label>
                  <input
                    type="text"
                    value={newAudioTrack}
                    onChange={e => setNewAudioTrack(e.target.value)}
                    placeholder="Original Audio"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={e => setNewTagInput(e.target.value)}
                    placeholder="SovereignTech, Web5, Fintech"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Moments are encoded into H.265/AV1 multi-bitrate streams and published across OMNI CDN rails.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition-colors"
                >
                  Publish Moment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
