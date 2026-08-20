import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Globe,
  Radio,
  Share2,
  Video,
  FileText,
  Filter,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { CreatorContentItem, CrossPlatformDestination } from '../../../types/omni_creator';

interface Props {
  contentItems: CreatorContentItem[];
  onPublishNow: (id: string) => void;
}

export const OmniCreatorPublishingScheduleView: React.FC<Props> = ({
  contentItems,
  onPublishNow
}) => {
  const [filterDestination, setFilterDestination] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const destinationLabels: Record<CrossPlatformDestination, string> = {
    omni_feed: 'OMNI Feed',
    omni_channels: 'OMNI Channels',
    newsletter_blast: 'Newsletter Blast',
    podcast_rss: 'Podcast RSS',
    video_hub: 'Video Hub',
    youtube_sync: 'YouTube Sync',
    x_sync: 'X (Twitter)',
    linkedin_sync: 'LinkedIn'
  };

  const filteredItems = contentItems.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesDest =
      filterDestination === 'all' ||
      item.crossPlatformDestinations.includes(filterDestination as CrossPlatformDestination);
    return matchesStatus && matchesDest;
  });

  const scheduledCount = contentItems.filter(i => i.status === 'scheduled').length;
  const publishedCount = contentItems.filter(i => i.status === 'published').length;

  return (
    <div id="omni-creator-publishing-schedule-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              CROSS-PLATFORM PUBLISHING ARCHITECTURE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              REAL-TIME QUEUE
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Publishing Schedule & Broadcast Matrix
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Coordinate simultaneous releases across the OMNI Social Network, broadcast channels, private patron feeds, podcast syndication, and external synchronized nodes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-3 text-center min-w-[120px]">
            <div className="text-2xl font-bold text-amber-400">{scheduledCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">In Queue</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-3 text-center min-w-[120px]">
            <div className="text-2xl font-bold text-emerald-400">{publishedCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Published</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled Queue</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Channel Destination:</span>
            <select
              value={filterDestination}
              onChange={e => setFilterDestination(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
            >
              <option value="all">All Destinations</option>
              <option value="omni_feed">OMNI Feed</option>
              <option value="omni_channels">OMNI Channels</option>
              <option value="video_hub">Video Hub</option>
              <option value="newsletter_blast">Newsletter Blast</option>
              <option value="podcast_rss">Podcast RSS</option>
              <option value="youtube_sync">YouTube Sync</option>
              <option value="x_sync">X (Twitter)</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredItems.length} distribution items
        </span>
      </div>

      {/* Schedule Items Table / List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          Broadcast Queue & Timeline
        </h3>

        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
            >
              {/* Content info */}
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                )}

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'scheduled'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                  
                  {/* Destinations Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.crossPlatformDestinations.map(dest => (
                      <span
                        key={dest}
                        className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-medium"
                      >
                        {destinationLabels[dest] || dest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timing & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-300">
                    {item.status === 'published'
                      ? 'Published ' + new Date(item.publishedAt || item.createdAt).toLocaleDateString()
                      : 'Scheduled: ' + (item.scheduledFor ? new Date(item.scheduledFor).toLocaleString() : 'In Queue')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {item.viewsCount > 0 ? `${item.viewsCount.toLocaleString()} views` : 'Ready to fire'}
                  </div>
                </div>

                {item.status === 'scheduled' && (
                  <button
                    onClick={() => onPublishNow(item.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Now</span>
                  </button>
                )}
                {item.status === 'published' && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Dispatched
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
