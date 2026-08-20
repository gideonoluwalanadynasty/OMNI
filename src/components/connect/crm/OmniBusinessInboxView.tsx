import React, { useState } from 'react';
import {
  Inbox,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  Filter,
  Send,
  Sparkles,
  Tag,
  FileText,
  UserCheck,
  Building,
  ShieldCheck,
  CornerDownRight,
  Plus,
  MessageSquare,
  ChevronRight,
  MoreVertical,
  Bot
} from 'lucide-react';
import {
  BusinessInboxConversation,
  AiBusinessChatMessage,
  SlaStatus,
  BusinessDepartment
} from '../../../types/omni_crm';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  conversations: BusinessInboxConversation[];
  activeProfile: ConnectProfile;
  onOpenCustomer360: (customerId: string) => void;
  onSendMessage: (conversationId: string, content: string, isInternalNote: boolean) => void;
  onAssignConversation: (conversationId: string, agentId: string, agentName: string) => void;
  onUpdateStatus: (conversationId: string, status: 'open' | 'pending' | 'resolved' | 'closed') => void;
}

export const OmniBusinessInboxView: React.FC<Props> = ({
  conversations,
  activeProfile,
  onOpenCustomer360,
  onSendMessage,
  onAssignConversation,
  onUpdateStatus
}) => {
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [searchFilter, setSearchFilter] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [slaFilter, setSlaFilter] = useState<string>('all');
  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(true);

  const selectedConv =
    conversations.find(c => c.id === selectedConversationId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    const matchesSearch =
      c.contactName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.contactHandle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.lastMessagePreview.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesSla = slaFilter === 'all' || c.slaTracking.slaStatus === slaFilter;

    return matchesSearch && matchesChannel && matchesSla;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConv) return;

    onSendMessage(selectedConv.id, replyText, isInternalNote);
    setReplyText('');
  };

  const handleApplySuggestedReply = (suggestion: string) => {
    setReplyText(suggestion);
    setIsInternalNote(false);
  };

  const getSlaBadge = (status: SlaStatus) => {
    switch (status) {
      case 'active':
        return { label: 'SLA Active', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'at_risk':
        return { label: 'SLA At Risk ⚠️', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'breached':
        return { label: 'SLA Breached 🚨', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'met':
        return { label: 'SLA Met ✓', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
      default:
        return { label: 'Active', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };
    }
  };

  return (
    <div id="omni-business-inbox-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Inbox className="w-3.5 h-3.5 text-indigo-400" />
                SOVEREIGN ENTERPRISE INBOX & SLA ENGINE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Business Inbox, Team Routing & Live AI Copilot
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Omnichannel business messaging with SLA timers, departmental queues, internal team notes, and AI conversational copilot for immediate customer response drafting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Active Inquiries</span>
              <span className="text-xl font-bold text-white font-mono">{conversations.length}</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">SLA Compliance</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">98.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[680px]">
        {/* Left Column: Conversation Queue (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3 shadow-lg">
          {/* Filter Bar */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={channelFilter}
                onChange={e => setChannelFilter(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none"
              >
                <option value="all">All Channels</option>
                <option value="omni_messenger">OMNI Chat</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="website_widget">Web Widget</option>
              </select>

              <select
                value={slaFilter}
                onChange={e => setSlaFilter(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none"
              >
                <option value="all">All SLA States</option>
                <option value="active">Active</option>
                <option value="at_risk">At Risk</option>
                <option value="breached">Breached</option>
                <option value="met">Met</option>
              </select>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[580px]">
            {filteredConversations.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">No conversations match criteria.</div>
            ) : (
              filteredConversations.map(conv => {
                const isSelected = selectedConv?.id === conv.id;
                const sla = getSlaBadge(conv.slaTracking.slaStatus);

                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={conv.contactAvatar}
                          alt={conv.contactName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white truncate max-w-[110px]">
                              {conv.contactName}
                            </span>
                            {conv.unreadCount > 0 && (
                              <span className="px-1.5 py-0.2 bg-rose-600 text-white font-mono text-[9px] font-bold rounded-full">
                                {conv.unreadCount}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-indigo-400 font-medium">{conv.department.toUpperCase()}</span>
                        </div>
                      </div>

                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${sla.color}`}>
                        {sla.label}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                      "{conv.lastMessagePreview}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-1.5">
                      <span>Channel: <strong className="text-slate-400">{conv.channel}</strong></span>
                      <span>{new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center Column: Active Chat & Copilot (5 cols) */}
        {selectedConv ? (
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-lg overflow-hidden">
            {/* Chat Top Bar */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConv.contactAvatar}
                  alt={selectedConv.contactName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {selectedConv.contactName}
                    <span className="text-[10px] font-mono text-slate-400">({selectedConv.contactHandle})</span>
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>Rep: <strong className="text-indigo-300">{selectedConv.assignedAgentName}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{selectedConv.status.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowAiInsights(!showAiInsights)}
                  className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    showAiInsights ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                  title="Toggle AI Copilot"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">AI Copilot</span>
                </button>
              </div>
            </div>

            {/* SLA Alert Header */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Response SLA: Target <strong>{selectedConv.slaTracking.targetResponseMinutes}m</strong></span>
              </div>
              <span className="font-mono text-indigo-300">Elapsed: {selectedConv.slaTracking.elapsedMinutes}m</span>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[380px] bg-slate-950/40">
              {selectedConv.messages.map(msg => {
                const isAgent = msg.senderType === 'agent';
                const isCustomer = msg.senderType === 'customer';
                const isInternal = msg.isInternalNote;

                if (isInternal) {
                  return (
                    <div
                      key={msg.id}
                      className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          INTERNAL TEAM NOTE (Hidden from Customer)
                        </span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-amber-200">{msg.content}</p>
                      <span className="text-[9px] text-amber-400/70 font-mono">By: {msg.senderName}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        isAgent
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Suggested Replies Pill Bar */}
            {selectedConv.aiAnalysis?.suggestedReplies && selectedConv.aiAnalysis.suggestedReplies.length > 0 && (
              <div className="p-2.5 bg-indigo-950/30 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  1-Click AI Suggested Drafts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedConv.aiAnalysis.suggestedReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleApplySuggestedReply(reply)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-indigo-900/60 border border-indigo-500/30 rounded-lg text-[11px] text-slate-200 hover:text-white transition text-left truncate max-w-full"
                    >
                      "{reply.slice(0, 55)}..."
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input / Reply Area */}
            <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(false)}
                    className={`font-bold transition ${!isInternalNote ? 'text-indigo-400 underline underline-offset-4' : 'text-slate-500'}`}
                  >
                    Public Reply
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInternalNote(true)}
                    className={`font-bold transition ${isInternalNote ? 'text-amber-400 underline underline-offset-4' : 'text-slate-500'}`}
                  >
                    Internal Note (Yellow)
                  </button>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {isInternalNote ? '🔒 Only visible to staff' : '📡 Transmitted via OMNI'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={
                    isInternalNote
                      ? 'Write an internal note for your sales/support team...'
                      : 'Type response to customer...'
                  }
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs focus:outline-none transition ${
                    isInternalNote
                      ? 'bg-amber-950/20 border border-amber-500/40 text-amber-200 placeholder-amber-500/50'
                      : 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="submit"
                  className={`p-2 rounded-xl text-white font-bold transition flex items-center gap-1 ${
                    isInternalNote
                      ? 'bg-amber-600 hover:bg-amber-500'
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex items-center justify-center text-slate-500 text-xs">
            Select a conversation to begin responding.
          </div>
        )}

        {/* Right Column: Customer 360 Mini-Sidebar & AI Summary (3 cols) */}
        {selectedConv && (
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4 shadow-lg">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Customer Mini-360
              </h4>
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConv.contactAvatar}
                    alt={selectedConv.contactName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">{selectedConv.contactName}</h5>
                    <span className="text-[10px] text-slate-400 font-mono">{selectedConv.contactHandle}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Lead Score:</span>
                    <span className="text-xs font-bold text-rose-400 font-mono">94 / 100</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Sentiment:</span>
                    <span className="text-xs font-bold text-emerald-400 uppercase">
                      {selectedConv.aiAnalysis?.sentiment || 'Positive'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCustomer360(selectedConv.contactId)}
                  className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Open Full 360 Profile</span>
                </button>
              </div>
            </div>

            {/* AI Real-time Conversation Summary */}
            {selectedConv.aiAnalysis && (
              <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-2">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  AI Summary & Intent
                </h5>
                <p className="text-[11px] text-indigo-200 leading-relaxed">
                  {selectedConv.aiAnalysis.conversationSummary}
                </p>
                <div className="text-[10px] text-slate-400 pt-1.5 border-t border-indigo-500/20 space-y-0.5">
                  <div>Intent: <strong className="text-white">{selectedConv.aiAnalysis.detectedIntent}</strong></div>
                  <div>Urgency: <strong className="text-amber-400 uppercase">{selectedConv.aiAnalysis.urgency}</strong></div>
                </div>
              </div>
            )}

            {/* Reassign / Change Status */}
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Workflow Actions
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => onUpdateStatus(selectedConv.id, 'resolved')}
                  className="py-1.5 px-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Resolve</span>
                </button>
                <button
                  onClick={() => onAssignConversation(selectedConv.id, activeProfile.id, activeProfile.displayName)}
                  className="py-1.5 px-2 bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  <span>Claim</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
