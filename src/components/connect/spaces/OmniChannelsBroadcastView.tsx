import React, { useState } from 'react';
import {
  Radio,
  Send,
  Eye,
  Heart,
  Share2,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquare,
  Search,
  Bell,
  Sliders,
  Plus
} from 'lucide-react';
import { OmniChannel, OmniChannelType } from '../../../types/omni_community_spaces';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
  onBackToSpaces: () => void;
}

export const OmniChannelsBroadcastView: React.FC<Props> = ({
  engine,
  currentProfileId,
  onBackToSpaces
}) => {
  const [channels, setChannels] = useState<OmniChannel[]>(() => engine.getOmniChannels());
  const [selectedChannelId, setSelectedChannelId] = useState<string>(() => channels[0]?.id || '');
  const [broadcastInput, setBroadcastInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

  const refreshChannels = () => {
    setChannels(engine.getOmniChannels());
  };

  const handlePublishBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastInput.trim() || !activeChannel) return;

    engine.broadcastToOmniChannel(activeChannel.id, {
      content: broadcastInput.trim(),
      authorProfileId: currentProfileId,
      authorName: 'Gideon Oluwalana',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
    });

    setBroadcastInput('');
    refreshChannels();
  };

  const handleToggleSubscribe = (channelId: string) => {
    engine.subscribeToChannel(channelId, currentProfileId);
    refreshChannels();
  };

  const filteredChannels = (channels || []).filter(c =>
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="omni-channels-broadcast-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onBackToSpaces}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                ← Back to OMNI Spaces Hub
              </button>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Radio className="w-8 h-8 text-cyan-400" />
              <span>One-to-Many Sovereign Broadcast Channels</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Official announcement channels, creator newsletters, breaking news feeds, and broadcast dispatches with real-time impression telemetry.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <div className="text-xs font-bold text-white">
              {(channels || []).reduce((acc, c) => acc + (c.subscribersCount || 0), 0).toLocaleString()} Total Subscribers
            </div>
          </div>
        </div>

        {/* Channel Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(channels || []).map(channel => {
            const isSelected = channel.id === selectedChannelId;
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannelId(channel.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{channel.name}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  ({(channel.subscribersCount || 0).toLocaleString()})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Channel Studio & Feed View */}
      {activeChannel && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed of Broadcasts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Broadcaster Dispatch Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Broadcast New Dispatch to @{activeChannel.name}</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                  Audience Reach: {(activeChannel.subscribersCount || 0).toLocaleString()} Verified Nodes
                </span>
              </div>

              <form onSubmit={handlePublishBroadcast} className="space-y-3">
                <textarea
                  rows={3}
                  value={broadcastInput}
                  onChange={e => setBroadcastInput(e.target.value)}
                  placeholder={`Write official broadcast announcement for ${activeChannel.name}...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-500">Encrypted transmission via OMNI Broadcast Fabric</span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Publish Broadcast</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Broadcast Posts List */}
            <div className="space-y-4">
              {(activeChannel.posts || []).map(post => (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'} alt={post.authorName || 'Broadcaster'} className="w-10 h-10 rounded-full object-cover border border-cyan-500/50" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{post.authorName || 'OMNI Official Broadcast'}</span>
                          <span className="text-[9px] px-1.5 py-0.2 bg-cyan-500/20 text-cyan-300 rounded font-bold">OFFICIAL DISPATCH</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{new Date(post.publishedAt).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{(post.viewsCount || 0).toLocaleString()} Views</span>
                      </span>
                      <span className="flex items-center gap-1 hover:text-white">
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>{(post.reactionsCount || 0).toLocaleString()} Likes</span>
                      </span>
                      <span className="flex items-center gap-1 hover:text-white">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{post.sharesCount || 0} Shares</span>
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">Sign: SHA-256 Valid</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Sidebar Meta */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <img src={activeChannel.avatarUrl} alt={activeChannel.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700" />
                <div>
                  <h3 className="text-base font-bold text-white">{activeChannel.name}</h3>
                  <p className="text-[10px] text-cyan-400 uppercase font-mono">{activeChannel.channelType} channel</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{activeChannel.description}</p>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Subscribers</span>
                  <span className="text-white font-extrabold">{(activeChannel.subscribersCount || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Dispatches</span>
                  <span className="text-white font-extrabold">{(activeChannel.posts || []).length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Impression Rate</span>
                  <span className="text-emerald-400 font-extrabold">98.4%</span>
                </div>
              </div>

              <button
                onClick={() => handleToggleSubscribe(activeChannel.id)}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Manage Subscription & Push Notifications</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
