import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
  User,
  Phone,
  Mail,
  Tag,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Bot,
  Globe,
  DollarSign,
  Briefcase,
  Ticket,
  ChevronRight,
  Plus,
  RefreshCw,
  Zap,
  Lock,
  MessageSquare,
  MessageCircle,
  Radio,
  Sliders,
  Award,
  MoreVertical,
  Check
} from 'lucide-react';
import {
  UniversalConversation,
  UniversalMessage,
  ExternalChannelType,
  ConversationStatus,
  ConversationPriority,
  InboxTeamAgent
} from '../../../types/omni_universal_inbox';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  conversations: UniversalConversation[];
  messages: Record<string, UniversalMessage[]>;
  teamAgents: InboxTeamAgent[];
  activeProfile: ConnectProfile;
  onSendMessage: (conversationId: string, text: string, useAiDraft?: boolean) => void;
  onUpdateConversationStatus: (conversationId: string, status: ConversationStatus) => void;
  onUpdatePriority: (conversationId: string, priority: ConversationPriority) => void;
  onAssignAgent: (conversationId: string, agentId: string, agentName: string) => void;
  onAddInternalNote: (conversationId: string, noteText: string) => void;
  onOpenGateways: () => void;
  onOpenAutomations: () => void;
  onOpenTestSuite: () => void;
}

export const OmniUniversalInboxView: React.FC<Props> = ({
  conversations,
  messages,
  teamAgents,
  activeProfile,
  onSendMessage,
  onUpdateConversationStatus,
  onUpdatePriority,
  onAssignAgent,
  onAddInternalNote,
  onOpenGateways,
  onOpenAutomations,
  onOpenTestSuite
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [showRightDrawer, setShowRightDrawer] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState<'crm' | 'ai' | 'notes'>('crm');
  const [appliedSmartReplyId, setAppliedSmartReplyId] = useState<string | null>(null);
  const [aiApproved, setAiApproved] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];
  const activeMessages = selectedConv ? (messages[selectedConv.id] || []) : [];

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    if (channelFilter !== 'all' && c.sourceChannel !== channelFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.customer.displayName.toLowerCase().includes(q);
      const matchSnippet = c.lastMessageSnippet.toLowerCase().includes(q);
      const matchTags = c.tags.some(t => t.toLowerCase().includes(q));
      const matchHandle = c.customer.handleOrIdentifier.toLowerCase().includes(q);
      if (!matchName && !matchSnippet && !matchTags && !matchHandle) return false;
    }
    return true;
  });

  const getChannelBadge = (ch: ExternalChannelType) => {
    switch (ch) {
      case 'whatsapp':
        return { label: 'WhatsApp', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: MessageSquare };
      case 'email':
        return { label: 'Email', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: Mail };
      case 'instagram':
        return { label: 'Instagram', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40', icon: MessageCircle };
      case 'sms':
        return { label: 'SMS', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Phone };
      case 'website_chat':
        return { label: 'Live Chat', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', icon: Globe };
      case 'telegram':
        return { label: 'Telegram', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40', icon: Send };
      case 'facebook':
        return { label: 'Facebook', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40', icon: MessageCircle };
      case 'omni_messenger':
        return { label: 'OMNI Native', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: Sparkles };
      default:
        return { label: ch, color: 'bg-slate-500/20 text-slate-300 border-slate-500/40', icon: Radio };
    }
  };

  const getPriorityBadge = (p: ConversationPriority) => {
    switch (p) {
      case 'urgent':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
      case 'high':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'medium':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'low':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || !selectedConv) return;
    onSendMessage(selectedConv.id, inputText, aiApproved);
    setInputText('');
    setAiApproved(false);
    setAppliedSmartReplyId(null);
  };

  const handleApplySmartReply = (replyText: string, replyId: string) => {
    setInputText(replyText);
    setAppliedSmartReplyId(replyId);
    setAiApproved(true); // Agent clicked to review & approve
  };

  const handleAddNote = () => {
    if (!internalNoteText.trim() || !selectedConv) return;
    onAddInternalNote(selectedConv.id, internalNoteText.trim());
    setInternalNoteText('');
  };

  return (
    <div className="space-y-4">
      {/* Top Universal Gateway Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 lg:p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                OMNI UNIVERSAL INBOX
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ● 8 Adapters Online
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                AI Copilot: Active (Human-in-the-Loop)
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Universal Communication Command Centre
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Consolidate WhatsApp, Email, SMS, Instagram, Website Chat, Telegram, and OMNI Native into a unified sovereign relationship inbox with CRM 360 context and Gemini 2.5 grounded intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onOpenGateways}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Adapters & Webhooks</span>
            </button>
            <button
              onClick={onOpenAutomations}
              className="px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Workflows & Rules</span>
            </button>
            <button
              onClick={onOpenTestSuite}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Diagnostic Runner</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[700px]">
        {/* Left Pane: Conversation List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex flex-col shadow-xl backdrop-blur-md">
          {/* Search and Channel Pills */}
          <div className="space-y-3 pb-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations, tags, contacts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Channel Filters Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
              {[
                { id: 'all', label: 'All Channels' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'email', label: 'Email' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'website_chat', label: 'Web Chat' },
                { id: 'sms', label: 'SMS' },
                { id: 'telegram', label: 'Telegram' },
                { id: 'facebook', label: 'Facebook' },
                { id: 'omni_messenger', label: 'Native' }
              ].map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setChannelFilter(ch.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    channelFilter === ch.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Status Queue Tabs */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1">
                {(['all', 'open', 'pending', 'resolved'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition-colors ${
                      statusFilter === st ? 'text-indigo-300 bg-indigo-500/20' : 'hover:text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {filteredConversations.length} total
              </span>
            </div>
          </div>

          {/* Conversation List Scroll */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-3 pr-1">
            {filteredConversations.map(conv => {
              const chInfo = getChannelBadge(conv.sourceChannel);
              const ChannelIcon = chInfo.icon;
              const isSelected = conv.id === selectedConvId;

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conv.customer.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={conv.customer.displayName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-slate-950">
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] border ${chInfo.color}`}>
                            <ChannelIcon className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate">
                            {conv.customer.displayName}
                          </h4>
                          {conv.customer.isVerified && (
                            <ShieldCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {conv.customer.handleOrIdentifier}
                        </span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-indigo-500 text-white text-[9px] font-black">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-1 mb-2">
                    {conv.lastMessageSnippet}
                  </p>

                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${chInfo.color}`}>
                        {chInfo.label}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${getPriorityBadge(conv.priority)}`}>
                        {conv.priority.toUpperCase()}
                      </span>
                      {conv.crm.dealValueUsd && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                          ${(conv.crm.dealValueUsd / 1000).toFixed(0)}k Deal
                        </span>
                      )}
                    </div>

                    <span className="text-slate-500 text-[10px] font-medium">
                      {conv.assignedAgentName ? conv.assignedAgentName.split(' ')[0] : 'Unassigned'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Pane: Active Conversation Thread (5 or 8 cols depending on right drawer) */}
        <div className={`${showRightDrawer ? 'lg:col-span-5' : 'lg:col-span-8'} bg-slate-900/90 border border-slate-800 rounded-3xl flex flex-col shadow-xl backdrop-blur-md overflow-hidden`}>
          {selectedConv ? (
            <>
              {/* Active Conversation Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img
                      src={selectedConv.customer.avatarUrl}
                      alt={selectedConv.customer.displayName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <span className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-950 border ${getChannelBadge(selectedConv.sourceChannel).color}`}>
                      <Radio className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-white truncate">
                        {selectedConv.customer.displayName}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getChannelBadge(selectedConv.sourceChannel).color}`}>
                        {getChannelBadge(selectedConv.sourceChannel).label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{selectedConv.customer.location || 'Global'}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono text-[11px]">SLA: {selectedConv.slaState.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowRightDrawer(!showRightDrawer)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      showRightDrawer
                        ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>CRM & AI</span>
                  </button>

                  <select
                    value={selectedConv.status}
                    onChange={e => onUpdateConversationStatus(selectedConv.id, e.target.value as ConversationStatus)}
                    className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="open">🟢 Open</option>
                    <option value="pending">🟡 Pending</option>
                    <option value="snoozed">⏱️ Snoozed</option>
                    <option value="resolved">✅ Resolved</option>
                    <option value="closed">🔒 Closed</option>
                  </select>
                </div>
              </div>

              {/* Message Thread Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/20">
                {/* Channel Encryption / Verified Ingress Notice */}
                <div className="flex justify-center my-2">
                  <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-indigo-400" />
                    <span>Channel routed via OMNI Gateway • Verified Webhook Signature • DLP Active</span>
                  </div>
                </div>

                {activeMessages.map(msg => {
                  const isAgent = msg.senderType === 'agent' || msg.direction === 'outbound';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
                        <span className="font-semibold text-slate-400">{msg.senderName}</span>
                        <span>•</span>
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.aiApprovalRequired && (
                          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                            AI Draft (Agent Approved)
                          </span>
                        )}
                      </div>

                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.body}</p>

                        {msg.translatedBody && (
                          <div className="mt-2 pt-2 border-t border-slate-700/50 text-[11px] text-indigo-200">
                            <span className="text-[9px] font-bold uppercase text-indigo-300 block mb-0.5">AI Translation ({msg.detectedLanguage}):</span>
                            {msg.translatedBody}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 px-1">
                        {isAgent && (
                          <span className="flex items-center gap-0.5 text-emerald-400">
                            <CheckCheck className="w-3 h-3" />
                            <span className="capitalize">{msg.deliveryStatus}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Smart Replies Suggestions Bar */}
              {selectedConv.aiAnalysis.suggestedReplies?.length > 0 && (
                <div className="p-3 bg-slate-950/90 border-t border-slate-800/90 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Gemini 2.5 Smart Reply Suggestions (Click to review & send):
                    </span>
                    <span className="text-[10px] text-slate-500">Human-in-the-loop enforced</span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {selectedConv.aiAnalysis.suggestedReplies.map(rep => (
                      <button
                        key={rep.id}
                        onClick={() => handleApplySmartReply(rep.text, rep.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs text-left whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                          appliedSmartReplyId === rep.id
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850'
                        }`}
                      >
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 uppercase">
                          {rep.tone}
                        </span>
                        <span className="truncate max-w-[200px]">{rep.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Composer Input Area */}
              <div className="p-3.5 border-t border-slate-800 bg-slate-900/90">
                {aiApproved && (
                  <div className="mb-2 p-2 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs text-purple-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-purple-400" />
                      AI Draft loaded. Review or edit before sending.
                    </span>
                    <button
                      onClick={() => setAiApproved(false)}
                      className="text-[10px] text-slate-400 hover:text-white underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-slate-950/90 border border-slate-800 rounded-2xl p-2 focus-within:border-indigo-500 transition-colors">
                    <textarea
                      rows={2}
                      placeholder={`Reply to ${selectedConv.customer.displayName} on ${getChannelBadge(selectedConv.sourceChannel).label}...`}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none px-1"
                    />

                    <div className="flex items-center justify-between pt-1 text-slate-400 text-xs">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:text-slate-200 transition-colors">
                          <Paperclip className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 hover:text-slate-200 transition-colors">
                          <Smile className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setIsTranslating(!isTranslating)}
                          className={`p-1 flex items-center gap-1 text-[10px] font-bold rounded ${
                            isTranslating ? 'text-indigo-400 bg-indigo-500/20 px-1.5' : 'hover:text-slate-200'
                          }`}
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Translate</span>
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-500">
                        Enter ↵ to send
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className="p-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl shadow-lg transition-colors flex items-center justify-center flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <MessageSquare className="w-12 h-12 mb-3 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-400">No conversation selected</h3>
              <p className="text-xs text-slate-600 mt-1">Select a conversation from the left to start responding.</p>
            </div>
          )}
        </div>

        {/* Right Drawer: CRM 360 & AI Intelligence & Internal Notes (3 cols) */}
        {showRightDrawer && selectedConv && (
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex flex-col shadow-xl backdrop-blur-md space-y-4 overflow-y-auto">
            {/* Drawer Navigation Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveRightTab('crm')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
                  activeRightTab === 'crm' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>CRM 360</span>
              </button>
              <button
                onClick={() => setActiveRightTab('ai')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
                  activeRightTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </button>
              <button
                onClick={() => setActiveRightTab('notes')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1 ${
                  activeRightTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Notes ({selectedConv.internalNotes.length})</span>
              </button>
            </div>

            {/* TAB 1: CRM 360 */}
            {activeRightTab === 'crm' && (
              <div className="space-y-4 text-xs">
                {/* Contact Identity Summary */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Profile</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      {selectedConv.crm.customerTier || 'Standard'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white text-sm">{selectedConv.customer.displayName}</h4>
                    <p className="text-[11px] text-slate-400">{selectedConv.customer.handleOrIdentifier}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{selectedConv.customer.location} • {selectedConv.customer.timezone}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500">Lead Score</span>
                      <div className="text-sm font-extrabold text-indigo-300">{selectedConv.crm.leadScore || 85} / 100</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Lifetime Value</span>
                      <div className="text-sm font-extrabold text-emerald-400">${(selectedConv.crm.lifetimeValueUsd || 0).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Linked Deal & Orders */}
                {selectedConv.crm.dealTitle && (
                  <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">Active Deal</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                        {selectedConv.crm.dealStage}
                      </span>
                    </div>
                    <div className="font-bold text-white">{selectedConv.crm.dealTitle}</div>
                    <div className="text-emerald-400 font-black text-sm">${selectedConv.crm.dealValueUsd?.toLocaleString()} USD</div>
                  </div>
                )}

                {/* Team Assignment & Priority Selector */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Agent</label>
                  <select
                    value={selectedConv.assignedAgentId || ''}
                    onChange={e => {
                      const ag = teamAgents.find(a => a.id === e.target.value);
                      if (ag) onAssignAgent(selectedConv.id, ag.id, ag.displayName);
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {teamAgents.map(ag => (
                      <option key={ag.id} value={ag.id}>
                        {ag.displayName} ({ag.team})
                      </option>
                    ))}
                  </select>

                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pt-1">Priority</label>
                  <div className="grid grid-cols-4 gap-1">
                    {(['urgent', 'high', 'medium', 'low'] as const).map(pr => (
                      <button
                        key={pr}
                        onClick={() => onUpdatePriority(selectedConv.id, pr)}
                        className={`py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                          selectedConv.priority === pr
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tags</label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedConv.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI COPILOT */}
            {activeRightTab === 'ai' && (
              <div className="space-y-3.5 text-xs">
                {/* Thread Summary */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Thread Summary</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {selectedConv.aiAnalysis.summary}
                  </p>
                </div>

                {/* Sentiment & Intent Matrix */}
                <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Intent & Sentiment</span>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium capitalize">Intent: {selectedConv.aiAnalysis.intent.replace('_', ' ')}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {selectedConv.aiAnalysis.sentiment.toUpperCase()} ({selectedConv.aiAnalysis.sentimentScore}%)
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500">Key Entities Extracted:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedConv.aiAnalysis.keyEntities.map(ent => (
                        <span key={ent} className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[9px] border border-indigo-500/20 font-mono">
                          {ent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Next Best Action */}
                <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Recommended Next Best Action</span>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {selectedConv.aiAnalysis.recommendedNextAction}
                  </p>
                </div>

                {/* Human-In-The-Loop Governance Box */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-[10px] text-slate-400 space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    AI Communication Policy #1 Enforced:
                  </div>
                  <p>AI assistants will never dispatch external customer messages without explicit human agent click-through review.</p>
                </div>
              </div>
            )}

            {/* TAB 3: INTERNAL NOTES */}
            {activeRightTab === 'notes' && (
              <div className="space-y-3.5 text-xs flex-1 flex flex-col">
                <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px]">
                  {selectedConv.internalNotes.length === 0 ? (
                    <p className="text-[11px] text-slate-500 text-center py-4">No internal notes added yet.</p>
                  ) : (
                    selectedConv.internalNotes.map(nt => (
                      <div key={nt.id} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="font-bold text-indigo-300">{nt.authorName}</span>
                          <span>{new Date(nt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-slate-200 text-[11px]">{nt.note}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <textarea
                    rows={2}
                    placeholder="Add an internal note (@mention team members)..."
                    value={internalNoteText}
                    onChange={e => setInternalNoteText(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!internalNoteText.trim()}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Post Internal Note
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
