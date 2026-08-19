import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  Flame,
  ThumbsUp,
  Award
} from 'lucide-react';
import { OmniStatusItem } from '../../types/omni_social_engine';

interface Props {
  authorGroup: {
    authorProfileId: string;
    authorHandle: string;
    authorName: string;
    authorAvatar: string;
    authorBadge?: string;
    hasUnseen: boolean;
    items: OmniStatusItem[];
  } | null;
  onClose: () => void;
  onReact: (statusId: string, emoji: string) => void;
  onView: (statusId: string) => void;
}

export const OmniStatusViewerModal: React.FC<Props> = ({
  authorGroup,
  onClose,
  onReact,
  onView
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState('');
  const [showReactions, setShowReactions] = useState(false);

  useEffect(() => {
    if (!authorGroup || authorGroup.items.length === 0) return;
    const currentItem = authorGroup.items[currentIndex];
    if (currentItem) {
      onView(currentItem.id);
    }
  }, [currentIndex, authorGroup, onView]);

  useEffect(() => {
    if (!authorGroup || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < authorGroup.items.length - 1) {
          return prev + 1;
        } else {
          onClose();
          return prev;
        }
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [authorGroup, isPaused, onClose]);

  if (!authorGroup || authorGroup.items.length === 0) return null;

  const currentItem = authorGroup.items[currentIndex] || authorGroup.items[0];
  const timeRemainingHours = Math.max(
    0,
    Math.round((new Date(currentItem.expiresAt).getTime() - Date.now()) / 3600000)
  );

  const emojis = ['❤️', '🔥', '⚡️', '👏', '🙌', '💯', '🚀', '😍'];

  return (
    <div
      id="omni-status-viewer-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
    >
      {/* Background Tap to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Story Container */}
      <div
        className="relative z-10 w-full max-w-md h-[88vh] max-h-[750px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Progress Bars */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
          {authorGroup.items.map((it, idx) => (
            <div key={it.id} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  idx < currentIndex
                    ? 'w-full bg-white'
                    : idx === currentIndex
                    ? 'w-full bg-indigo-400 animate-pulse'
                    : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Top Header Overlay */}
        <div className="absolute top-7 left-3 right-3 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={authorGroup.authorAvatar}
              alt={authorGroup.authorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-tight drop-shadow-md">
                  {authorGroup.authorName}
                </span>
                {authorGroup.authorBadge && (
                  <ShieldCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 drop-shadow">
                <span>{authorGroup.authorHandle}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Clock className="w-3 h-3" /> {timeRemainingHours}h left
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Body Viewport */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {currentItem.type === 'media' && currentItem.mediaUrl ? (
            <img
              src={currentItem.mediaUrl}
              alt="Story Media"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center p-8 text-center ${
                currentItem.backgroundColor || 'bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-950'
              }`}
            >
              <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed drop-shadow-lg max-w-xs">
                {currentItem.text}
              </p>
            </div>
          )}

          {/* Caption Overlay on Media */}
          {currentItem.type === 'media' && currentItem.text && (
            <div className="absolute bottom-20 left-4 right-4 z-20 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-sm text-white font-medium text-center">
              {currentItem.text}
            </div>
          )}

          {/* Navigation Tap Zones */}
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white z-20 transition-all opacity-0 hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              if (currentIndex < authorGroup.items.length - 1) {
                setCurrentIndex(prev => prev + 1);
              } else {
                onClose();
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white z-20 transition-all opacity-0 hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Interaction Bar */}
        <div className="relative z-30 p-3 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
          {/* Quick Reaction Emojis */}
          <div className="flex items-center justify-around py-1">
            {emojis.map(em => (
              <button
                key={em}
                onClick={() => onReact(currentItem.id, em)}
                className="text-2xl hover:scale-130 active:scale-95 transition-transform"
              >
                {em}
              </button>
            ))}
          </div>

          {/* Views Counter & Quick Reply Input */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl text-xs font-semibold text-slate-200 backdrop-blur-md">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentItem.views.length}</span>
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={`Reply to ${authorGroup.authorName}...`}
                value={quickReplyText}
                onChange={e => setQuickReplyText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && quickReplyText.trim()) {
                    onReact(currentItem.id, `💬 ${quickReplyText.trim()}`);
                    setQuickReplyText('');
                  }
                }}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 backdrop-blur-md"
              />
              {quickReplyText.trim() && (
                <button
                  onClick={() => {
                    onReact(currentItem.id, `💬 ${quickReplyText.trim()}`);
                    setQuickReplyText('');
                  }}
                  className="absolute right-1.5 top-1.5 p-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
