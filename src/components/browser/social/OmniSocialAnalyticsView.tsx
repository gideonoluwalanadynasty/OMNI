import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Users,
  Eye,
  MessageSquare,
  Share2,
  Calendar,
  Clock,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Award
} from 'lucide-react';
import { SocialPlatformMetrics, SocialPost, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';

interface OmniSocialAnalyticsViewProps {
  metrics: SocialPlatformMetrics[];
  posts: SocialPost[];
}

export const OmniSocialAnalyticsView: React.FC<OmniSocialAnalyticsViewProps> = ({
  metrics,
  posts
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const totalImpressions = metrics.reduce((acc, m) => acc + m.totalImpressions30d, 0);
  const totalEngagements = metrics.reduce((acc, m) => acc + m.totalEngagements30d, 0);
  const totalPosts = metrics.reduce((acc, m) => acc + m.postsPublished30d, 0);
  const totalNewFollowers = metrics.reduce((acc, m) => acc + m.followerDelta30d, 0);

  const topPosts = [...posts]
    .filter(p => p.status === 'published' && p.performance)
    .sort((a, b) => (b.performance?.engagementRate || 0) - (a.performance?.engagementRate || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-100">Multi-Platform Performance Analytics</h2>
            <p className="text-xs text-stone-400">
              Aggregated telemetry across 11 official social network APIs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-stone-950 rounded-xl p-1 border border-stone-800">
            <button
              onClick={() => setSelectedTimeframe('7d')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedTimeframe === '7d' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
            >
              7D
            </button>
            <button
              onClick={() => setSelectedTimeframe('30d')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedTimeframe === '30d' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
            >
              30D
            </button>
            <button
              onClick={() => setSelectedTimeframe('90d')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedTimeframe === '90d' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}
            >
              90D
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI 4-Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Total Impressions</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{(totalImpressions / 1000000).toFixed(2)}M</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.6% vs previous period</span>
          </div>
        </div>

        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Total Engagements</span>
            <MessageSquare className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{(totalEngagements / 1000).toFixed(1)}k</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.1% cross-platform surge</span>
          </div>
        </div>

        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>New Followers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">+{(totalNewFollowers / 1000).toFixed(1)}k</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.9% follower velocity</span>
          </div>
        </div>

        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Broadcasts Dispatched</span>
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{totalPosts} Posts</div>
          <div className="text-[11px] text-stone-400">100% on schedule</div>
        </div>
      </div>

      {/* Platform Comparison Matrix */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-100">Channel Benchmark & Engagement Distribution</h3>
          <span className="text-xs text-stone-400 font-mono">11 Platforms Benchmarked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="border-b border-stone-800 text-[11px] uppercase tracking-wider text-stone-500 bg-stone-950/40">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Posts (30d)</th>
                <th className="p-3">Impressions</th>
                <th className="p-3">Eng. Rate</th>
                <th className="p-3">Net Follower Delta</th>
                <th className="p-3">Peak Time Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {metrics.map(m => (
                <tr key={m.platform} className="hover:bg-stone-800/30 transition-colors">
                  <td className="p-3 font-semibold">
                    <OmniSocialPlatformBadge platform={m.platform} size="sm" />
                  </td>
                  <td className="p-3 font-mono">{m.postsPublished30d}</td>
                  <td className="p-3 font-mono">{(m.totalImpressions30d / 1000000).toFixed(2)}M</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{m.avgEngagementRate}%</td>
                  <td className="p-3 font-mono text-indigo-300">+{m.followerDelta30d.toLocaleString()}</td>
                  <td className="p-3 text-stone-400">{m.bestTimeToPost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Content Leaderboard */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-stone-100">Top-Performing Posts Leaderboard</h3>
        </div>

        <div className="space-y-3">
          {topPosts.map((post, idx) => (
            <div
              key={post.id}
              className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center font-mono font-bold text-stone-300 shrink-0">
                  #{idx + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {post.targetPlatforms.map(p => (
                      <OmniSocialPlatformBadge key={p} platform={p} size="sm" />
                    ))}
                    <span className="text-[10px] text-stone-500 font-mono">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-200">{post.title}</h4>
                  <p className="text-xs text-stone-400 line-clamp-1">{post.primaryContent}</p>
                </div>
              </div>

              {post.performance && (
                <div className="flex items-center gap-4 bg-stone-900 px-4 py-2 rounded-xl border border-stone-800 text-center shrink-0">
                  <div>
                    <div className="text-xs font-bold text-emerald-400">{post.performance.engagementRate}%</div>
                    <div className="text-[10px] text-stone-500">Eng. Rate</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-100">
                      {(post.performance.impressions / 1000).toFixed(1)}k
                    </div>
                    <div className="text-[10px] text-stone-500">Impressions</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-300">{post.performance.likes}</div>
                    <div className="text-[10px] text-stone-500">Likes</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
