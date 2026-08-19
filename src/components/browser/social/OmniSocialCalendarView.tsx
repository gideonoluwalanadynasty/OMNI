import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Sparkles,
  CheckCircle2,
  Send,
  Eye,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SocialPost, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge, PLATFORM_METADATA } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';

interface OmniSocialCalendarViewProps {
  posts: SocialPost[];
  onOpenComposer: () => void;
  onRefreshPosts: () => void;
}

export const OmniSocialCalendarView: React.FC<OmniSocialCalendarViewProps> = ({
  posts,
  onOpenComposer,
  onRefreshPosts
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 17)); // Aug 17, 2026
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  // Generate calendar days for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const filteredPosts = posts.filter(p => {
    if (filterPlatform === 'all') return true;
    return p.targetPlatforms.includes(filterPlatform as SocialPlatform);
  });

  const getPostsForDay = (day: number): SocialPost[] => {
    return filteredPosts.filter(p => {
      const date = new Date(p.scheduledFor || p.createdAt);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePublishNow = (id: string) => {
    omniSocialService.publishPostNow(id);
    onRefreshPosts();
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost(omniSocialService.getPostById(id) || null);
    }
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-100">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span>{filteredPosts.length} posts scheduled & published</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Optimal Times Highlighted</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Platform Filter */}
          <select
            value={filterPlatform}
            onChange={e => setFilterPlatform(e.target.value)}
            className="px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-300 focus:outline-none"
          >
            <option value="all">All Channels</option>
            {(Object.keys(PLATFORM_METADATA) as SocialPlatform[]).map(p => (
              <option key={p} value={p}>
                {PLATFORM_METADATA[p].name}
              </option>
            ))}
          </select>

          {/* Month Navigation */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800">
            <button
              onClick={prevMonth}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date(2026, 7, 17))}
              className="px-2 py-0.5 text-xs text-stone-300 hover:text-white"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenComposer}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* 7-Day Grid */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-stone-800 bg-stone-950/60 text-center py-2.5 text-xs font-bold text-stone-400 uppercase tracking-wider">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Cells */}
        <div className="grid grid-cols-7 auto-rows-[120px] divide-x divide-y divide-stone-800/80 bg-stone-950/20">
          {/* Empty cells for padding before start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 bg-stone-950/40 opacity-30" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayPosts = getPostsForDay(day);
            const isToday = day === 17 && month === 7 && year === 2026;
            const isPeakEngagementDay = day % 3 === 0;

            return (
              <div
                key={`day-${day}`}
                className={`p-2 relative flex flex-col justify-between group hover:bg-stone-800/30 transition-colors ${
                  isToday ? 'bg-indigo-950/20 ring-1 ring-inset ring-indigo-500/50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday
                        ? 'bg-indigo-600 text-white'
                        : 'text-stone-300 group-hover:text-white'
                    }`}
                  >
                    {day}
                  </span>

                  {isPeakEngagementDay && (
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1 py-0.2 rounded" title="AI Optimal Audience Peak">
                      ⚡ Peak 2PM
                    </span>
                  )}
                </div>

                {/* Posts in day */}
                <div className="space-y-1 overflow-y-auto max-h-[80px] pr-0.5">
                  {dayPosts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`p-1.5 rounded-lg border text-[11px] font-medium cursor-pointer truncate transition-all ${
                        post.status === 'published'
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                          : 'bg-stone-900 border-stone-700 text-stone-200 hover:border-indigo-500'
                      }`}
                    >
                      <div className="flex items-center gap-1 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="truncate">{post.title || post.primaryContent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Post Modal / Drawer */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4 text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-stone-400">Post Details</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${selectedPost.status === 'published' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                  {selectedPost.status.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.targetPlatforms.map(p => (
                  <OmniSocialPlatformBadge key={p} platform={p} size="sm" />
                ))}
              </div>

              <h3 className="text-sm font-bold text-stone-100">{selectedPost.title}</h3>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-200 whitespace-pre-wrap leading-relaxed">
                {selectedPost.primaryContent}
              </div>

              {selectedPost.mediaUrls.length > 0 && (
                <img
                  src={selectedPost.mediaUrls[0]}
                  alt="Post preview"
                  className="w-full h-40 object-cover rounded-xl border border-stone-800"
                />
              )}

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
                <div>
                  <span className="block text-[10px] text-stone-500">Scheduled For</span>
                  <span className="font-mono text-stone-200">
                    {new Date(selectedPost.scheduledFor).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-stone-500">Campaign Tag</span>
                  <span className="text-stone-200">{selectedPost.campaignTag || 'General Outreach'}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Close
              </button>

              {selectedPost.status !== 'published' && (
                <button
                  onClick={() => handlePublishNow(selectedPost.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Immediately via Official APIs</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
