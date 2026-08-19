import React, { useState } from 'react';
import {
  Users,
  Hash,
  Volume2,
  Bell,
  MessageSquare,
  Shield,
  Plus,
  Radio,
  Search,
  Sparkles,
  Send
} from 'lucide-react';
import {
  ConnectCommunity,
  ConnectChannel,
  ConnectProfile
} from '../../types/omni_connect';

interface Props {
  communities: ConnectCommunity[];
  activeProfile: ConnectProfile;
  onJoinCommunity: (communityId: string) => void;
}

export const OmniConnectCommunityView: React.FC<Props> = ({
  communities,
  activeProfile,
  onJoinCommunity
}) => {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>(communities[0]?.id || '');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [channelMessageInput, setChannelMessageInput] = useState('');
  const [channelMessages, setChannelMessages] = useState<{ id: string; sender: string; text: string; time: string }[]>([
    { id: '1', sender: 'Gideon Oluwalana', text: 'Welcome to the official developer hub! Check out the new OMNI Connect API endpoints under /api/v1/connect.', time: '14:20' },
    { id: '2', sender: 'Sarah Jenkins', text: 'Confirmed. Cross-currency liquidity webhooks are fully functioning in the sandbox.', time: '14:35' }
  ]);

  const activeCommunity = communities.find(c => c.id === selectedCommunityId) || communities[0];
  const activeChannel = activeCommunity?.channels.find(ch => ch.id === selectedChannelId) || activeCommunity?.channels[0];

  const handleSendChannelMessage = () => {
    if (!channelMessageInput.trim()) return;
    setChannelMessages(prev => [
      ...prev,
      {
        id: `ch_msg_${Date.now()}`,
        sender: activeProfile.displayName,
        text: channelMessageInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChannelMessageInput('');
  };

  return (
    <div id="omni-connect-community-view" className="flex h-[750px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* 1. Server Icons Left Strip */}
      <div className="w-16 bg-slate-950 py-4 flex flex-col items-center gap-3 border-r border-slate-800/80">
        {communities.map(comm => {
          const isSelected = comm.id === selectedCommunityId;
          return (
            <button
              key={comm.id}
              onClick={() => {
                setSelectedCommunityId(comm.id);
                setSelectedChannelId(comm.channels[0]?.id || '');
              }}
              className={`relative group p-0.5 rounded-2xl transition-all ${
                isSelected ? 'ring-2 ring-indigo-500 scale-105' : 'opacity-80 hover:opacity-100'
              }`}
              title={comm.name}
            >
              <img
                src={comm.avatarUrl}
                alt={comm.name}
                className="w-11 h-11 rounded-xl object-cover"
              />
              {isSelected && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Community Channels Sidebar */}
      {activeCommunity && (
        <div className="w-64 bg-slate-950/60 border-r border-slate-800 flex flex-col">
          {/* Community Header Banner */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/40">
            <h3 className="text-sm font-bold text-white truncate">{activeCommunity.name}</h3>
            <p className="text-[11px] text-slate-400 truncate">{activeCommunity.tagline}</p>
            <div className="flex items-center gap-2 mt-2 text-[10px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>{activeCommunity.onlineCount.toLocaleString()} online</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{activeCommunity.membersCount.toLocaleString()} members</span>
            </div>
          </div>

          {/* Channel Tree */}
          <div className="flex-1 p-3 overflow-y-auto space-y-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-1.5 flex items-center justify-between">
                <span>Text Channels</span>
              </div>
              <div className="space-y-0.5">
                {activeCommunity.channels.filter(ch => ch.kind !== 'voice_room').map(ch => {
                  const isSelected = ch.id === (selectedChannelId || activeCommunity.channels[0]?.id);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChannelId(ch.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-indigo-600/20 text-indigo-300 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {ch.kind === 'announcements_broadcast' ? (
                          <Bell className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Hash className="w-3.5 h-3.5 text-slate-500" />
                        )}
                        <span className="truncate">{ch.name}</span>
                      </div>
                      {ch.unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[9px] font-bold">
                          {ch.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Rooms */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-1.5 flex items-center justify-between">
                <span>Voice Stages</span>
              </div>
              <div className="space-y-0.5">
                {activeCommunity.channels.filter(ch => ch.kind === 'voice_room').map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChannelId(ch.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 text-emerald-400 hover:bg-slate-900 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="truncate">{ch.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Roles Breakdown */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 mb-1.5">
                Community Roles
              </div>
              <div className="space-y-1 px-1">
                {activeCommunity.roles.map(r => (
                  <div key={r.id} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="text-[11px] font-medium">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Channel Chat View */}
      {activeChannel ? (
        <div className="flex-1 flex flex-col bg-slate-900">
          {/* Channel Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">{activeChannel.name}</h3>
                <p className="text-xs text-slate-400">{activeChannel.topic}</p>
              </div>
            </div>

            <button
              onClick={() => onJoinCommunity(activeCommunity.id)}
              className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold transition-colors"
            >
              Joined Community
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {channelMessages.map(msg => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                  {msg.sender.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-white">{msg.sender}</span>
                    <span className="text-[10px] text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/40 inline-block">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message #${activeChannel.name}...`}
              value={channelMessageInput}
              onChange={e => setChannelMessageInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendChannelMessage()}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleSendChannelMessage}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
          Select a channel to begin
        </div>
      )}
    </div>
  );
};
