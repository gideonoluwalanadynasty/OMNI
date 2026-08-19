import React from 'react';
import {
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Calendar,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Send,
  AlertTriangle
} from 'lucide-react';
import {
  SocialAccount,
  SocialPost,
  SocialComment,
  SocialAiAgent,
  SocialPlatform
} from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';

interface OmniSocialDashboardViewProps {
  accounts: SocialAccount[];
  posts: SocialPost[];
  comments: SocialComment[];
  agents: SocialAiAgent[];
  onNavigateTab: (tab: any) => void;
  onOpenComposerWithPlatform?: (platform: SocialPlatform) => void;
  onQuickPublishPost: (postId: string) => void;
  onQuickAiReply: (comment: SocialComment) => void;
}

export const OmniSocialDashboardView: React.FC<OmniSocialDashboardViewProps> = ({
  accounts,
  posts,
  comments,
  agents,
  onNavigateTab,
  onOpenComposerWithPlatform,
  onQuickPublishPost,
  onQuickAiReply
}) => {
  const totalAudience = accounts.reduce((acc, a) => acc + a.followerCount, 0);
  const connectedCount = accounts.filter(a => a.status === 'connected').length;
  const scheduledPosts = posts.filter(p => p.status === 'scheduled');
  const publishedPosts = posts.filter(p => p.status === 'published');
  const unreadComments = comments.filter(c => c.status === 'unread');

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Top Banner / Compliance & AI Agent Status */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950/40 to-stone-900 border border-indigo-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-100">OMNI Sovereign Social Command Centre</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-800">
                100% Official APIs
              </span>
            </div>
            <p className="text-xs text-stone-400">
              11 connected platforms • Zero scraping • Autonomous AI agent copilot active.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('agents')}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>4 AI Agents Active</span>
          </button>
          <button
            onClick={() => onNavigateTab('composer')}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>
      </div>

      {/* Metrics 4-Pack */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Total Audience</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{(totalAudience / 1000000).toFixed(2)}M</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+6.4% across 11 platforms</span>
          </div>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>30d Impressions</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">18.4M</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% engagement surge</span>
          </div>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Scheduled in Queue</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{scheduledPosts.length} Posts</div>
          <div className="text-[11px] text-stone-400">Next dispatch in 4h</div>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Unread Inbound</span>
            <MessageSquare className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{unreadComments.length} Comments</div>
          <div className="text-[11px] text-indigo-400">AI auto-replies ready</div>
        </div>
      </div>

      {/* 11 Platform Connectors Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
          <span>PLATFORM CONNECTORS (OFFICIAL APIS)</span>
          <button
            onClick={() => onNavigateTab('accounts')}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Manage All 11 Accounts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {accounts.slice(0, 6).map(acc => (
            <div
              key={acc.id}
              onClick={() => onNavigateTab('accounts')}
              className="p-3 bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <OmniSocialPlatformBadge platform={acc.platform} showName={false} size="sm" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Connected & Synced" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-200 group-hover:text-white truncate">
                  {acc.handle}
                </div>
                <div className="text-[11px] text-stone-500 font-mono">
                  {(acc.followerCount / 1000).toFixed(0)}k followers
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: Scheduled Queue & Inbound Comments Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scheduled Content Calendar Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-stone-200">Upcoming Scheduled Posts</h3>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              View Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {scheduledPosts.length === 0 ? (
              <div className="p-8 text-center bg-stone-900/40 border border-dashed border-stone-800 rounded-2xl space-y-2">
                <Calendar className="w-6 h-6 text-stone-600 mx-auto" />
                <div className="text-xs font-semibold text-stone-400">Queue is currently clear</div>
                <button
                  onClick={() => onNavigateTab('composer')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Schedule Post Now
                </button>
              </div>
            ) : (
              scheduledPosts.map(post => (
                <div
                  key={post.id}
                  className="p-4 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl space-y-3 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {post.targetPlatforms.map(p => (
                        <OmniSocialPlatformBadge key={p} platform={p} size="sm" />
                      ))}
                      {post.isAiGenerated && (
                        <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-semibold border border-indigo-800">
                          AI Crafted
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                    {post.primaryContent}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                    <span>Campaign: {post.campaignTag || 'General Outreach'}</span>
                    <button
                      onClick={() => onQuickPublishPost(post.id)}
                      className="px-2.5 py-1 bg-stone-800 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-semibold text-stone-300 transition-colors"
                    >
                      Publish Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Unified Inbound Comments Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-stone-200">Unified Inbound Comments</h3>
            </div>
            <button
              onClick={() => onNavigateTab('inbox')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Open Inbox
            </button>
          </div>

          <div className="space-y-3">
            {comments.slice(0, 3).map(comment => (
              <div
                key={comment.id}
                className="p-3.5 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-200">{comment.authorName}</div>
                      <div className="text-[10px] text-stone-500">{comment.authorHandle}</div>
                    </div>
                  </div>
                  <OmniSocialPlatformBadge platform={comment.platform} showName={false} size="sm" />
                </div>

                <p className="text-xs text-stone-300 leading-snug">
                  &ldquo;{comment.content}&rdquo;
                </p>

                {comment.suggestedAiReply && comment.status === 'unread' && (
                  <div className="p-2.5 bg-stone-950 rounded-xl border border-indigo-950 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-indigo-300">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>Suggested AI Reply:</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-400 italic leading-snug">
                      &ldquo;{comment.suggestedAiReply}&rdquo;
                    </p>
                    <button
                      onClick={() => onQuickAiReply(comment)}
                      className="w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>Approve & Send via Official API</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
