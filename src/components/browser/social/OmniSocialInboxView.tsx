import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ThumbsUp,
  EyeOff,
  Flag,
  RefreshCw,
  Clock,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { SocialComment, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';

interface OmniSocialInboxViewProps {
  comments: SocialComment[];
  onRefreshComments: () => void;
}

export const OmniSocialInboxView: React.FC<OmniSocialInboxViewProps> = ({
  comments,
  onRefreshComments
}) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string>(comments[0]?.id || '');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isGeneratingAiReply, setIsGeneratingAiReply] = useState(false);

  const selectedComment = comments.find(c => c.id === selectedCommentId) || comments[0];

  const filteredComments = comments.filter(c => {
    const matchesSentiment = sentimentFilter === 'all' || c.sentiment === sentimentFilter;
    const matchesPlatform = platformFilter === 'all' || c.platform === platformFilter;
    const matchesSearch =
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.authorHandle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSentiment && matchesPlatform && matchesSearch;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedComment) return;

    omniSocialService.addReplyToComment(selectedComment.id, replyText.trim(), false);
    setReplyText('');
    onRefreshComments();
  };

  const handleGenerateAiReply = async () => {
    if (!selectedComment) return;
    setIsGeneratingAiReply(true);
    try {
      const suggested = await omniSocialService.suggestAiCommentReply(selectedComment);
      setReplyText(suggested);
    } finally {
      setIsGeneratingAiReply(false);
    }
  };

  const handleUpdateStatus = (status: SocialComment['status']) => {
    if (selectedComment) {
      omniSocialService.updateCommentStatus(selectedComment.id, status);
      onRefreshComments();
    }
  };

  const getSentimentPill = (sentiment: SocialComment['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">Positive Feedback</span>;
      case 'question':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-semibold">Question / Inquiry</span>;
      case 'negative':
        return <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold">Critique / Issue</span>;
      case 'spam':
        return <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-semibold">Flagged Spam</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-semibold">Neutral</span>;
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-800">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-100">Unified Inbound Comments & Mentions</h2>
            <p className="text-xs text-stone-400">
              Aggregated in real-time across 11 official APIs with AI sentiment moderation.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Sentiment Filter */}
          <select
            value={sentimentFilter}
            onChange={e => setSentimentFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none"
          >
            <option value="all">All Sentiments</option>
            <option value="question">Questions & Inquiries</option>
            <option value="positive">Positive Comments</option>
            <option value="negative">Critique / Negative</option>
            <option value="spam">Flagged Spam</option>
          </select>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none"
          >
            <option value="all">All 11 Platforms</option>
            {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(p => (
              <option key={p} value={p}>
                {PLATFORM_METADATA[p].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Split: Comment Feed on Left (5 cols), Active Conversation & AI Copilot on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[550px]">
        {/* Left Column: Comments Stream */}
        <div className="lg:col-span-5 space-y-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800 flex flex-col">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter comments or usernames..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none"
            />
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[500px] pr-1">
            {filteredComments.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-500">No matching comments found</div>
            ) : (
              filteredComments.map(comment => {
                const isSelected = selectedComment?.id === comment.id;
                return (
                  <div
                    key={comment.id}
                    onClick={() => {
                      setSelectedCommentId(comment.id);
                      if (comment.suggestedAiReply) {
                        setReplyText(comment.suggestedAiReply);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-7 h-7 rounded-full object-cover border border-stone-700"
                        />
                        <div>
                          <div className="text-xs font-bold text-stone-200">{comment.authorName}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{comment.authorHandle}</div>
                        </div>
                      </div>
                      <OmniSocialPlatformBadge platform={comment.platform} showName={false} size="sm" />
                    </div>

                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {comment.content}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      {getSentimentPill(comment.sentiment)}
                      <span className="text-stone-500 font-mono">
                        {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Thread & OMNI AI Reply Copilot */}
        {selectedComment ? (
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Thread Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedComment.authorAvatar}
                    alt={selectedComment.authorName}
                    className="w-10 h-10 rounded-xl object-cover border border-stone-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-stone-100">{selectedComment.authorName}</h3>
                      <OmniSocialPlatformBadge platform={selectedComment.platform} size="sm" />
                    </div>
                    <div className="text-xs text-stone-400 font-mono">{selectedComment.authorHandle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateStatus('hidden')}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
                    title="Hide Comment"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('flagged')}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-amber-900/60 text-stone-400 hover:text-amber-300"
                    title="Flag as Spam / Bot"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Target Post Context */}
              <div className="p-2.5 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>In response to: &ldquo;{selectedComment.postTitle}&rdquo;</span>
                <span className="text-indigo-400 font-semibold">{PLATFORM_METADATA[selectedComment.platform].officialApi}</span>
              </div>

              {/* Inbound Comment Content */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-100 leading-relaxed whitespace-pre-wrap">
                {selectedComment.content}
              </div>

              {/* Existing Replies in Thread */}
              {selectedComment.replies.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Official Responses
                  </div>
                  {selectedComment.replies.map(reply => (
                    <div
                      key={reply.id}
                      className="p-3 bg-indigo-950/30 border border-indigo-900/60 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                        <span>{reply.authorName} ({reply.authorHandle})</span>
                        <span className="font-mono text-stone-400">
                          {new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-stone-200">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Reply Synthesizer & Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-200">Reply as OMNI Official</span>
                <button
                  type="button"
                  onClick={handleGenerateAiReply}
                  disabled={isGeneratingAiReply}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAiReply ? 'animate-spin' : 'text-indigo-400'}`} />
                  <span>{isGeneratingAiReply ? 'Synthesizing...' : 'Draft with OMNI AI'}</span>
                </button>
              </div>

              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write an official reply or use the AI generator above..."
                rows={3}
                className="w-full p-3 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-mono">
                  Verified via {PLATFORM_METADATA[selectedComment.platform].officialApi}
                </span>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Reply</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center text-stone-500">
            Select a comment from the list to view and reply
          </div>
        )}
      </div>
    </div>
  );
};
