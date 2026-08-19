import React, { useState } from 'react';
import {
  Search,
  Plus,
  MessageSquare,
  Users,
  Briefcase,
  Bot,
  Globe,
  Lock,
  Radio,
  SlidersHorizontal,
  CheckCheck,
  ShieldCheck,
  Zap,
  Sparkles,
  Inbox
} from 'lucide-react';
import { OmniConversation, ConversationType } from '../../../types/omni_messenger';

interface Props {
  conversations: OmniConversation[];
  selectedConvId: string;
  onSelectConversation: (convId: string) => void;
  onOpenNewChatModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenTestSuite: () => void;
  activeFilter: string;
  onChangeFilter: (filter: string) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

export const OmniMessengerSidebar: React.FC<Props> = ({
  conversations,
  selectedConvId,
  onSelectConversation,
  onOpenNewChatModal,
  onOpenSettingsModal,
  onOpenTestSuite,
  activeFilter,
  onChangeFilter,
  searchQuery,
  onSearchQueryChange
}) => {
  const [showRequestsOnly, setShowRequestsOnly] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All', icon: MessageSquare },
    { id: 'direct', label: 'Direct', icon: Lock },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'crm', label: 'CRM / Deals', icon: Briefcase },
    { id: 'ai', label: 'AI Copilot', icon: Bot },
    { id: 'community', label: 'Channels', icon: Globe }
  ];

  const filteredConversations = conversations.filter(c => {
    if (showRequestsOnly) return c.unreadCount > 2;
    return true;
  });

  return (
    <div id="omni-messenger-sidebar" className="w-80 md:w-96 border-r border-slate-800 flex flex-col bg-slate-950/80 select-none">
      {/* Top Header */}
      <div className="p-3.5 border-b border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                OMNI Messenger
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  E2EE
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Post-Quantum Ratchet • Sub-10ms Mesh</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="btn-messenger-test-suite"
              onClick={onOpenTestSuite}
              className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-amber-400 rounded-lg text-xs transition-colors"
              title="Run Real-Time Messenger Automated Test Suite"
            >
              <Zap className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-messenger-settings"
              onClick={onOpenSettingsModal}
              className="p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
              title="Messenger Privacy & Super Admin Settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-messenger-new-chat"
              onClick={onOpenNewChatModal}
              className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow"
              title="Start New Conversation"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="text-[11px] pr-0.5">New</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="messenger-search-input"
            type="text"
            placeholder="Search messages, people, files..."
            value={searchQuery}
            onChange={e => onSearchQueryChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
          {filterTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => {
                  setShowRequestsOnly(false);
                  onChangeFilter(tab.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors ${
                  isActive && !showRequestsOnly
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No conversations match "{searchQuery}"
          </div>
        ) : (
          filteredConversations.map(conv => {
            const isSelected = conv.id === selectedConvId;
            const otherMember = conv.members.find(m => !m.profileId.includes('gideon')) || conv.members[0];
            const isOnline = otherMember?.onlineStatus === 'online';

            return (
              <button
                key={conv.id}
                id={`messenger-conversation-${conv.id}`}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full text-left p-3 flex items-start gap-3 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600/15 border-l-2 border-indigo-500'
                    : 'hover:bg-slate-900/60'
                }`}
              >
                {/* Avatar with Status Indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={conv.title}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                  )}
                  {conv.type === 'ai' && (
                    <span className="absolute -top-1 -right-1 p-0.5 bg-indigo-600 text-white rounded-full">
                      <Sparkles className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                {/* Conversation Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {conv.title}
                      {conv.isEncrypted && (
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                      )}
                    </h4>
                    {conv.lastMessage && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(conv.lastMessage.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>

                  {/* Last message snippet */}
                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                    {conv.lastMessage ? (
                      <>
                        <span className="text-slate-300 font-medium">{conv.lastMessage.senderDisplayName.split(' ')[0]}:</span>
                        <span>{conv.lastMessage.content}</span>
                      </>
                    ) : (
                      'No messages yet'
                    )}
                  </p>

                  {/* Badges / CRM Stage */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {conv.crmPipelineStage && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        CRM: {conv.crmPipelineStage}
                      </span>
                    )}
                    {conv.ephemeralTimerSeconds > 0 && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-slate-800 text-slate-400">
                        ⏳ 24h
                      </span>
                    )}
                    {conv.type === 'enterprise' && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-purple-500/20 text-purple-300">
                        ENTERPRISE
                      </span>
                    )}
                    {conv.unreadCount > 0 && (
                      <span className="ml-auto px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[10px] font-extrabold shadow">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Bottom Node Status */}
      <div className="p-2.5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Mac Studio (Primary Sovereign Node)</span>
        </div>
        <span className="font-mono text-slate-500 text-[9px]">4.2 ms</span>
      </div>
    </div>
  );
};
