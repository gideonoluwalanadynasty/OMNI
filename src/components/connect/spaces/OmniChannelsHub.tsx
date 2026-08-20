import React, { useState } from 'react';
import {
  Radio,
  Video,
  Bell,
  Eye,
  ThumbsUp,
  Share2,
  Users,
  Building,
  GraduationCap,
  Sparkles,
  Play,
  TrendingUp,
  Send,
  Plus,
  CheckCircle2,
  Tv,
  Film,
  FileText
} from 'lucide-react';
import { OmniChannel, OmniChannelType, OmniChannelBroadcast } from '../../../types/omni_spaces';
import { SEED_OMNI_CHANNELS } from '../../../data/omni_spaces_seed';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  channels?: OmniChannel[];
  activeProfile: ConnectProfile;
}

export const OmniChannelsHub: React.FC<Props> = ({
  channels = SEED_OMNI_CHANNELS,
  activeProfile
}) => {
  const [allChannels, setAllChannels] = useState<OmniChannel[]>(channels);
  const [selectedChannelId, setSelectedChannelId] = useState<string>(channels[0]?.id || 'chan_creator_aria');
  const [subscribedChannelIds, setSubscribedChannelIds] = useState<string[]>(['chan_creator_aria', 'chan_company_omni']);
  const [filterType, setFilterType] = useState<string>('all');

  // Broadcast Composer State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [bcTitle, setBcTitle] = useState('');
  const [bcContent, setBcContent] = useState('');
  const [bcMediaType, setBcMediaType] = useState<'announcement' | 'video' | 'press_release' | 'livestream_push'>('announcement');

  const activeChannel = allChannels.find(c => c.id === selectedChannelId) || allChannels[0];
  const isSubscribed = subscribedChannelIds.includes(activeChannel.id);

  const filteredChannels = allChannels.filter(c => {
    if (filterType === 'all') return true;
    return c.channelType === filterType;
  });

  const channelTypeBadge = (type: OmniChannelType) => {
    switch (type) {
      case 'creator_channel':
        return { label: 'Creator Channel', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30', icon: Sparkles };
      case 'company_channel':
        return { label: 'Company Channel', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: Building };
      case 'news_channel':
        return { label: 'News Wire', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: Tv };
      case 'ministry_channel':
        return { label: 'Ministry Channel', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: Film };
      case 'educational_channel':
        return { label: 'Edu Channel', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: GraduationCap };
    }
  };

  const handleSubscribeToggle = (channelId: string) => {
    if (subscribedChannelIds.includes(channelId)) {
      setSubscribedChannelIds(prev => prev.filter(id => id !== channelId));
      setAllChannels(prev => prev.map(c => c.id === channelId ? { ...c, subscribersCount: c.subscribersCount - 1 } : c));
    } else {
      setSubscribedChannelIds(prev => [...prev, channelId]);
      setAllChannels(prev => prev.map(c => c.id === channelId ? { ...c, subscribersCount: c.subscribersCount + 1 } : c));
    }
  };

  const handlePublishBroadcast = () => {
    if (!bcTitle.trim() || !bcContent.trim()) return;
    const newBroadcast: OmniChannelBroadcast = {
      id: `bc_${Date.now()}`,
      channelId: activeChannel.id,
      authorName: activeProfile.displayName,
      authorAvatar: activeProfile.avatarUrl,
      title: bcTitle.trim(),
      content: bcContent.trim(),
      mediaType: bcMediaType,
      viewsCount: 1,
      likesCount: 0,
      sharesCount: 0,
      deliveredCount: activeChannel.subscribersCount,
      openRatePercent: 100,
      isLiveStream: bcMediaType === 'livestream_push',
      publishedAt: new Date().toISOString()
    };

    setAllChannels(prev => prev.map(c => {
      if (c.id === activeChannel.id) {
        return {
          ...c,
          broadcastsCount: c.broadcastsCount + 1,
          broadcasts: [newBroadcast, ...c.broadcasts]
        };
      }
      return c;
    }));

    setBcTitle('');
    setBcContent('');
    setShowBroadcastModal(false);
  };

  return (
    <div id="omni-channels-hub" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-indigo-400" />
              OMNI CHANNELS PLATFORM
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ONE-TO-MANY BROADCASTS ACTIVE
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Official Broadcast Channels, Press Wires & Live Streaming
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Support for Creator channels, Company channels, News channels, Ministry channels, and Educational broadcast streams with instant push notifications, video playback, and subscriber reach analytics.
          </p>
        </div>

        {/* Channel Type Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'creator_channel', label: 'Creator' },
            { id: 'company_channel', label: 'Company' },
            { id: 'news_channel', label: 'News Wire' },
            { id: 'ministry_channel', label: 'Ministry' },
            { id: 'educational_channel', label: 'Education' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                filterType === f.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Channel List + Active Broadcast Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Channels Drawer (Col 4) */}
        <div className="lg:col-span-4 space-y-3">
          {filteredChannels.map(chan => {
            const isSelected = chan.id === selectedChannelId;
            const meta = channelTypeBadge(chan.channelType);
            const isSubbed = subscribedChannelIds.includes(chan.id);

            return (
              <div
                key={chan.id}
                onClick={() => setSelectedChannelId(chan.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/80 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img src={chan.avatarUrl} alt={chan.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                        {chan.name}
                        {chan.isVerified && <CheckCircle2 className="w-3 h-3 text-indigo-400 inline" />}
                      </h4>
                      {isSubbed && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                          SUBSCRIBED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{chan.tagline}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${meta.bg}`}>
                        <meta.icon className="w-3 h-3" />
                        {meta.label}
                      </span>
                      <span className="text-[10px] text-slate-400">🔔 {chan.subscribersCount.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{chan.avgEngagementRate}% ER</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Channel (Col 8) */}
        {activeChannel && (
          <div className="lg:col-span-8 space-y-5">
            {/* Channel Hero Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img src={activeChannel.avatarUrl} alt={activeChannel.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{activeChannel.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${channelTypeBadge(activeChannel.channelType).bg}`}>
                        {channelTypeBadge(activeChannel.channelType).label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{activeChannel.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>🔔 {activeChannel.subscribersCount.toLocaleString()} subscribers</span>
                      <span>•</span>
                      <span>📡 {activeChannel.broadcastsCount} broadcasts</span>
                      <span>•</span>
                      <span>📈 {activeChannel.avgEngagementRate}% open/engagement rate</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBroadcastModal(true)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Broadcast</span>
                  </button>
                  <button
                    onClick={() => handleSubscribeToggle(activeChannel.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                      isSubscribed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isSubscribed ? 'Subscribed' : 'Subscribe Free'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Broadcast Composer Modal */}
            {showBroadcastModal && (
              <div className="bg-slate-900 border border-indigo-500/50 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Create Official One-to-Many Broadcast</h4>
                <input
                  type="text"
                  value={bcTitle}
                  onChange={e => setBcTitle(e.target.value)}
                  placeholder="Broadcast Title / Headline..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <textarea
                  value={bcContent}
                  onChange={e => setBcContent(e.target.value)}
                  placeholder="Write message to all subscribers..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Media Type:</span>
                    {(['announcement', 'video', 'press_release', 'livestream_push'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setBcMediaType(type)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-colors ${
                          bcMediaType === type ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowBroadcastModal(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePublishBroadcast}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                    >
                      Publish Broadcast
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Broadcasts Stream */}
            <div className="space-y-4">
              {activeChannel.broadcasts.map(bc => (
                <div key={bc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={bc.authorAvatar} alt={bc.authorName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">{bc.authorName}</div>
                        <div className="text-[10px] text-slate-500">{new Date(bc.publishedAt).toLocaleDateString()} at {new Date(bc.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                    {bc.isLiveStream && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse flex items-center gap-1">
                        <Radio className="w-3 h-3" />
                        LIVE BROADCAST
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white">{bc.title}</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">{bc.content}</p>

                  {bc.thumbnailUrl && (
                    <div className="h-44 bg-slate-950 rounded-xl overflow-hidden relative group flex items-center justify-center">
                      <img src={bc.thumbnailUrl} alt={bc.title} className="w-full h-full object-cover opacity-80" />
                      <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </div>
                  )}

                  {/* Broadcast Reach Analytics Bar */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Eye className="w-3.5 h-3.5 text-indigo-400" />
                        <strong>{bc.viewsCount.toLocaleString()}</strong> views
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                        <strong>{bc.likesCount.toLocaleString()}</strong> likes
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Share2 className="w-3.5 h-3.5 text-purple-400" />
                        <strong>{bc.sharesCount.toLocaleString()}</strong> shares
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-indigo-400">
                      📊 {bc.openRatePercent}% Open Rate ({bc.deliveredCount.toLocaleString()} delivered)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
