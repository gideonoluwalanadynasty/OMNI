import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Heart,
  Share2,
  Bookmark,
  HardDrive,
  CheckCircle2,
  Calendar,
  Award,
  ArrowUpRight,
  Plus,
  Play
} from 'lucide-react';
import { CreatorAnalytics, CloudStorageQuota, OmniMediaFileRecord } from '../../types/omni_social_engine';
import { ConnectProfile } from '../../types/omni_connect';

interface Props {
  analytics: CreatorAnalytics;
  quota: CloudStorageQuota;
  mediaFiles: OmniMediaFileRecord[];
  activeProfile: ConnectProfile;
  onOpenComposer: () => void;
  onUploadMedia: (file: { name: string; type: any; sizeBytes: number; storageUrl: string }) => void;
  onDeleteMedia: (fileId: string) => void;
}

export const OmniCreatorStudioView: React.FC<Props> = ({
  analytics,
  quota,
  mediaFiles,
  activeProfile,
  onOpenComposer,
  onUploadMedia,
  onDeleteMedia
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'content_performance' | 'monetization' | 'media_cdn'>('overview');
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800');
  const [newFileType, setNewFileType] = useState<'image' | 'video' | 'audio' | 'document'>('image');

  const totalQuota = quota.totalQuotaBytes || quota.totalAllocatedBytes || (50 * 1073741824);
  const usedQuota = quota.usedBytes || 0;
  const quotaPercent = Math.min(100, Math.round((usedQuota / (totalQuota || 1)) * 100));
  const usedGb = (usedQuota / 1073741824).toFixed(2);
  const totalGb = (totalQuota / 1073741824).toFixed(1);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    onUploadMedia({
      name: newFileName.trim(),
      type: newFileType,
      sizeBytes: newFileType === 'video' ? 45000000 : 2500000,
      storageUrl: newFileUrl.trim()
    });
    setNewFileName('');
  };

  return (
    <div id="omni-creator-studio-view" className="max-w-6xl mx-auto space-y-6">
      {/* Top Creator Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={activeProfile.avatarUrl}
              alt={activeProfile.displayName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{activeProfile.displayName}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-purple-400" />
                  VERIFIED SOVEREIGN CREATOR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                OMNI Sovereign Rails Creator Studio • Global P2P Audience & Monetization Ledger
              </p>
            </div>
          </div>

          <button
            onClick={onOpenComposer}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Content
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3 text-xs">
          {[
            { id: 'overview', label: 'Analytics Overview' },
            { id: 'content_performance', label: 'Top Content & Posts' },
            { id: 'monetization', label: 'Revenue & Sovereign Tips' },
            { id: 'media_cdn', label: 'Cloud CDN & Storage Quota' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-VIEW 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Monthly Reach</span>
                <Eye className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white">{(analytics.monthlyReach ?? analytics.totalReach ?? 0).toLocaleString()}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +28.4% vs last month
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Engagement Velocity</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">{(analytics.engagementVelocity ?? analytics.engagementRatePercent ?? 8.6).toFixed(1)}%</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> Top 5% creator tier
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Followers</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">{(analytics.followersCount ?? 4820).toLocaleString()}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{analytics.followerGrowthRate ?? analytics.followerGrowthWeekly ?? 14.2}% weekly
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Sovereign Earnings</span>
                <DollarSign className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-300">${(analytics.totalSovereignEarningsUsd ?? analytics.estimatedRevenueUsd ?? 0).toLocaleString()}</div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                Instant OMNI Pay settlement
              </div>
            </div>
          </div>

          {/* Demographic & Geographic Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Audience Demographics & Industry Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Fintech & Sovereign Computing Engineers</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[42%] h-full bg-indigo-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Enterprise Architects & Founders</span>
                    <span>29%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[29%] h-full bg-purple-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Church Network Administrators</span>
                    <span>18%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[18%] h-full bg-amber-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Independent Content Creators</span>
                    <span>11%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[11%] h-full bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                Cloud CDN Storage Quota
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold">Storage Capacity</span>
                  <span className="font-mono font-bold text-white">
                    {usedGb} GB / {totalGb} GB ({quotaPercent}%)
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                    style={{ width: `${quotaPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                  <div className="p-2.5 bg-slate-800/50 rounded-xl">
                    <span className="block text-slate-500">Total Media Files</span>
                    <strong className="text-white text-xs">{quota.fileCount} Assets</strong>
                  </div>
                  <div className="p-2.5 bg-slate-800/50 rounded-xl">
                    <span className="block text-slate-500">Tier Status</span>
                    <strong className="text-emerald-400 text-xs">Enterprise Unlimited</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: TOP CONTENT */}
      {activeSubTab === 'content_performance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white">Top Performing Sovereign Content</h3>
          <div className="divide-y divide-slate-800">
            {(analytics.topPosts || []).map(post => (
              <div key={post.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{post.title}</h4>
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" /> {(post.impressions || 0).toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400" /> {(post.likes || 0).toLocaleString()} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-amber-400" /> {post.shares || 0} shares
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Monetization Tips</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">
                      +${(post.revenueUsd || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: MONETIZATION */}
      {activeSubTab === 'monetization' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Sovereign Monetization & Tip Jar Ledger</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
              0% Platform Fee • Pure P2P
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-1">
              <span className="text-slate-400">Monthly Subscriptions</span>
              <div className="text-xl font-bold text-white">${analytics.monthlyRecurringRevenueUsd} / mo</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-1">
              <span className="text-slate-400">Tip Jar Receipts</span>
              <div className="text-xl font-bold text-white">${analytics.tipJarEarningsUsd}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-1">
              <span className="text-slate-400">Active Subscribers</span>
              <div className="text-xl font-bold text-white">{analytics.subscribersCount} Members</div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: MEDIA CDN & STORAGE */}
      {activeSubTab === 'media_cdn' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-white">Cloud Media Assets & Cryptographic Ledger</h3>
            <span className="text-xs text-slate-400">All assets encrypted with SHA-256 integrity verification</span>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleUploadSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3 text-xs">
            <span className="font-bold text-white">Register New Media Asset</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Asset title/filename..."
                value={newFileName}
                onChange={e => setNewFileName(e.target.value)}
                required
                className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
              <input
                type="url"
                placeholder="Media URL..."
                value={newFileUrl}
                onChange={e => setNewFileUrl(e.target.value)}
                required
                className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <select
                  value={newFileType}
                  onChange={e => setNewFileType(e.target.value as any)}
                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="image">Image Asset</option>
                  <option value="video">Video Stream</option>
                  <option value="audio">Audio Track</option>
                  <option value="document">Document PDF</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  Store
                </button>
              </div>
            </div>
          </form>

          {/* Media Table */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {mediaFiles.map(file => (
              <div
                key={file.id}
                className="bg-slate-800/40 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-indigo-400">
                    {file.type === 'image' && '🖼️'}
                    {file.type === 'video' && '🎬'}
                    {file.type === 'audio' && '🎵'}
                    {file.type === 'document' && '📄'}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{file.fileName}</h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{(file.sizeBytes / 1048576).toFixed(2)} MB</span>
                      <span>•</span>
                      <span className="font-mono text-slate-500 truncate max-w-xs">{file.sha256Hash}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {file.scanStatus}
                  </span>
                  <button
                    onClick={() => onDeleteMedia(file.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
