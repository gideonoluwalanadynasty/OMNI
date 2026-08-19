import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  Smile,
  Shield,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Check,
  CheckCheck,
  DollarSign,
  Sparkles,
  Search,
  Lock,
  Volume2,
  Play,
  Pause,
  Calendar,
  BarChart2,
  FileText,
  Download,
  Info,
  Clock,
  Pin,
  Trash2,
  Edit2,
  Copy,
  Globe,
  Share2,
  ShoppingBag,
  MapPin,
  UserPlus,
  ArrowUpRight
} from 'lucide-react';
import {
  OmniConversation,
  OmniMessage,
  MessageType,
  MessengerSmartReply
} from '../../../types/omni_messenger';

interface Props {
  conversation: OmniConversation;
  messages: OmniMessage[];
  currentProfileId: string;
  onSendMessage: (content: string, type?: MessageType, extra?: any) => void;
  onReactToMessage: (messageId: string, emoji: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onEditMessage: (messageId: string, newContent: string) => void;
  onPinMessage: (messageId: string) => void;
  onVotePoll: (messageId: string, optionId: string) => void;
  onRsvpEvent: (messageId: string, status: 'going' | 'maybe' | 'declined') => void;
  onTranscribeVoiceNote: (messageId: string, lang: string) => void;
  onAdvanceCrmStage?: (stage: any, dealValue?: number) => void;
  onOpenMeeting?: (roomId: string) => void;
  onToggleInfoDrawer: () => void;
  isInfoDrawerOpen: boolean;
  smartReplies: MessengerSmartReply[];
}

export const OmniMessengerChatPane: React.FC<Props> = ({
  conversation,
  messages,
  currentProfileId,
  onSendMessage,
  onReactToMessage,
  onDeleteMessage,
  onEditMessage,
  onPinMessage,
  onVotePoll,
  onRsvpEvent,
  onTranscribeVoiceNote,
  onAdvanceCrmStage,
  onOpenMeeting,
  onToggleInfoDrawer,
  isInfoDrawerOpen,
  smartReplies
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [voicePlaybackSpeed, setVoicePlaybackSpeed] = useState<number>(1);
  const [activeReactionMenuMsgId, setActiveReactionMenuMsgId] = useState<string | null>(null);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState('4500.00');
  const [payDescription, setPayDescription] = useState('OmniPay Sovereign Enterprise Transfer');
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('Should we mandate Post-Quantum Kyber-1024 encryption?');
  const [pollOptions, setPollOptions] = useState(['Yes, full mandate across all channels', 'Hybrid X3DH + Kyber option', 'Configurable per-organization']);
  const [searchInChat, setSearchInChat] = useState('');
  const [showSearchInChat, setShowSearchInChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on message arrival
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Voice recording timer
  useEffect(() => {
    let timer: any;
    if (isRecordingVoice) {
      timer = setInterval(() => setVoiceSeconds(s => s + 1), 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), 'text');
    setInputText('');
  };

  const handleSendVoice = () => {
    setIsRecordingVoice(false);
    const duration = voiceSeconds > 0 ? voiceSeconds : 14;
    onSendMessage(`Voice message (${duration}s)`, 'voice_note', {
      voiceNote: {
        audioUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_waves.ogg',
        durationSeconds: duration,
        waveform: [15, 30, 60, 85, 95, 70, 45, 65, 90, 100, 80, 50, 70, 85, 60, 35, 20],
        transcription: 'Real-time voice note recorded over sovereign WireGuard mesh channel.',
        isTranscribed: false
      }
    });
  };

  const handleSendPay = () => {
    const amt = parseFloat(payAmount) || 100.0;
    onSendMessage(
      `OmniPay Instant Transfer: $${amt.toFixed(2)} USD`,
      'payment',
      {
        paymentData: {
          amount: amt,
          currency: 'USD',
          description: payDescription,
          status: 'settled',
          transactionId: `tx_omni_${Date.now().toString().slice(-7)}`,
          receiptMerkleProof: `0x${Math.random().toString(16).substring(2, 34)}`
        }
      }
    );
    setShowPayModal(false);
  };

  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) return;
    onSendMessage(
      `Poll: ${pollQuestion}`,
      'poll',
      {
        pollData: {
          id: `poll_${Date.now()}`,
          question: pollQuestion,
          options: pollOptions.map((opt, idx) => ({
            id: `opt_${idx + 1}`,
            text: opt,
            votes: 0,
            voterProfileIds: []
          })),
          totalVotes: 0,
          expiresAt: new Date(Date.now() + 86400000 * 7).toISOString()
        }
      }
    );
    setShowPollModal(false);
  };

  const filteredMessages = messages.filter(m =>
    !searchInChat.trim() || m.content.toLowerCase().includes(searchInChat.toLowerCase())
  );

  const pinnedMessages = messages.filter(m => m.isPinned);

  return (
    <div id="omni-messenger-chat-pane" className="flex-1 flex flex-col bg-slate-900 overflow-hidden relative">
      {/* Active Conversation Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={conversation.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={conversation.title}
              className="w-10 h-10 rounded-full object-cover border border-slate-700 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                {conversation.title}
              </h3>
              {conversation.isEncrypted && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  Signal E2EE
                </span>
              )}
              {conversation.crmPipelineStage && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  CRM: {conversation.crmPipelineStage}
                </span>
              )}
            </div>

            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Sovereign WireGuard Tunnel • Latency 4.2ms
              {conversation.ephemeralTimerSeconds > 0 && (
                <span className="text-slate-400 text-[10px] ml-2">
                  • ⏳ Self-destruct: 24h
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-chat-search-toggle"
            onClick={() => setShowSearchInChat(!showSearchInChat)}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors text-xs"
            title="Search in this conversation"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            id="btn-chat-voice-call"
            onClick={() => onOpenMeeting && onOpenMeeting('room_omni_voice_01')}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors text-xs"
            title="Start Sovereign Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            id="btn-chat-video-call"
            onClick={() => onOpenMeeting && onOpenMeeting('room_omni_hd_01')}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
            title="Join HD Sovereign Video Room"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">HD Meeting</span>
          </button>
          <button
            id="btn-toggle-info-drawer"
            onClick={onToggleInfoDrawer}
            className={`p-2 rounded-xl transition-colors text-xs ${
              isInfoDrawerOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
            title="Conversation Details & Settings"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* In-Chat Search Bar */}
      {showSearchInChat && (
        <div className="p-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center gap-2 animate-fadeIn">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter messages in this conversation..."
            value={searchInChat}
            onChange={e => setSearchInChat(e.target.value)}
            className="flex-1 bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => {
              setSearchInChat('');
              setShowSearchInChat(false);
            }}
            className="text-xs text-slate-400 hover:text-white px-2"
          >
            Clear
          </button>
        </div>
      )}

      {/* Pinned Messages Banner */}
      {pinnedMessages.length > 0 && (
        <div className="px-4 py-2 bg-indigo-950/50 border-b border-indigo-500/20 flex items-center justify-between text-xs text-indigo-200">
          <div className="flex items-center gap-2 truncate">
            <Pin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span className="font-bold text-[11px] text-indigo-300">Pinned:</span>
            <span className="truncate text-slate-300">{pinnedMessages[0].content}</span>
          </div>
          <span className="text-[10px] text-indigo-400 font-mono flex-shrink-0 ml-2">
            {pinnedMessages.length} pinned
          </span>
        </div>
      )}

      {/* Messages Feed Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/60">
        {/* Encryption Banner */}
        <div className="flex justify-center my-1">
          <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 rounded-full flex items-center gap-1.5 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Signal Double-Ratchet 256-bit Post-Quantum ratcheted encryption active
          </span>
        </div>

        {filteredMessages.map(msg => {
          const isMe = msg.senderProfileId === currentProfileId || msg.senderUsername === 'gideon';

          return (
            <div
              key={msg.id}
              id={`message-bubble-${msg.id}`}
              className={`flex items-end gap-2 group relative ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderDisplayName}
                  className="w-7 h-7 rounded-full object-cover mb-1 border border-slate-700 flex-shrink-0"
                />
              )}

              <div className={`max-w-lg rounded-2xl p-3.5 text-sm shadow-md transition-all ${
                isMe
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60'
              }`}>
                {/* Sender Name in group/multi chat */}
                {!isMe && (
                  <div className="text-[11px] font-bold text-indigo-300 mb-1 flex items-center gap-1">
                    {msg.senderDisplayName}
                    {msg.senderVerificationBadge === 'official_purple' && (
                      <span className="px-1 py-0.2 rounded text-[8px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        OFFICIAL
                      </span>
                    )}
                    {msg.senderVerificationBadge === 'business_emerald' && (
                      <span className="px-1 py-0.2 rounded text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        VERIFIED BIZ
                      </span>
                    )}
                  </div>
                )}

                {/* 1. Voice Note Rendering */}
                {msg.messageType === 'voice_note' && msg.voiceNote ? (
                  <div className="space-y-2 py-1 min-w-[260px]">
                    <div className="flex items-center gap-3 bg-slate-900/40 p-2.5 rounded-xl border border-white/10">
                      <button
                        onClick={() => setPlayingVoiceId(playingVoiceId === msg.id ? null : msg.id)}
                        className="p-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full transition-colors shadow"
                      >
                        {playingVoiceId === msg.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      {/* Animated Waveform Visualizer */}
                      <div className="flex-1 flex items-center gap-0.5 h-7">
                        {msg.voiceNote.waveform.map((h, idx) => (
                          <div
                            key={idx}
                            className={`w-1 rounded-full transition-all ${
                              playingVoiceId === msg.id
                                ? 'bg-indigo-300 animate-pulse'
                                : 'bg-slate-400/60'
                            }`}
                            style={{ height: `${Math.max(15, h * 0.28)}px` }}
                          />
                        ))}
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono font-bold">
                          {msg.voiceNote.durationSeconds}s
                        </span>
                        <button
                          onClick={() => setVoicePlaybackSpeed(s => s === 1 ? 1.5 : s === 1.5 ? 2 : 1)}
                          className="block text-[9px] px-1 py-0.2 rounded bg-white/10 text-white font-bold"
                        >
                          {voicePlaybackSpeed}x
                        </button>
                      </div>
                    </div>

                    {/* AI Speech-to-Text Transcription & Translation */}
                    <div className="bg-slate-950/60 rounded-xl p-2.5 text-xs space-y-1.5 border border-slate-700/50">
                      <div className="flex items-center justify-between text-[10px] text-indigo-300 font-semibold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          AI Speech Transcription
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onTranscribeVoiceNote(msg.id, 'Spanish')}
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 hover:text-white text-[9px]"
                          >
                            ES
                          </button>
                          <button
                            onClick={() => onTranscribeVoiceNote(msg.id, 'French')}
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 hover:text-white text-[9px]"
                          >
                            FR
                          </button>
                          <button
                            onClick={() => onTranscribeVoiceNote(msg.id, 'Chinese')}
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 hover:text-white text-[9px]"
                          >
                            ZH
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-200 text-[11px] italic">"{msg.voiceNote.transcription}"</p>
                      {msg.voiceNote.translation && (
                        <div className="pt-1 border-t border-slate-800 text-[10px] text-emerald-300">
                          <span className="font-bold">Translated ({msg.voiceNote.translation.targetLanguage}):</span> {msg.voiceNote.translation.text}
                        </div>
                      )}
                      {msg.voiceNote.summary && (
                        <div className="text-[10px] text-slate-400 pt-0.5">
                          <span className="font-semibold text-slate-300">Digest:</span> {msg.voiceNote.summary}
                        </div>
                      )}
                    </div>
                  </div>
                ) : msg.messageType === 'payment' && msg.paymentData ? (
                  /* 2. OmniPay Instant Transfer Rendering */
                  <div className="bg-slate-900/80 border border-emerald-500/40 rounded-xl p-3 my-1 space-y-2 text-white">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <DollarSign className="w-4 h-4" />
                        OMNI Finance OS Transfer
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        SETTLED • 0% FEE
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white">
                      ${msg.paymentData.amount.toFixed(2)} {msg.paymentData.currency}
                    </div>
                    <p className="text-xs text-slate-300">{msg.paymentData.description}</p>
                    <div className="text-[9px] font-mono text-slate-400 pt-1.5 border-t border-slate-800 flex items-center justify-between">
                      <span>Tx: {msg.paymentData.transactionId}</span>
                      <span className="text-emerald-400">Merkle Verified ✓</span>
                    </div>
                  </div>
                ) : msg.messageType === 'poll' && msg.pollData ? (
                  /* 3. Interactive Poll Rendering */
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 my-1 space-y-2 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold">
                      <BarChart2 className="w-4 h-4" />
                      Live Sovereign Community Poll
                    </div>
                    <h4 className="text-sm font-semibold">{msg.pollData.question}</h4>
                    <div className="space-y-1.5 pt-1">
                      {msg.pollData.options.map(opt => {
                        const isVoted = msg.pollData?.userVotedOptionId === opt.id;
                        const pct = msg.pollData!.totalVotes > 0
                          ? Math.round((opt.votes / msg.pollData!.totalVotes) * 100)
                          : 0;

                        return (
                          <button
                            key={opt.id}
                            onClick={() => onVotePoll(msg.id, opt.id)}
                            className={`w-full text-left p-2 rounded-lg border text-xs relative overflow-hidden transition-all ${
                              isVoted
                                ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold'
                                : 'border-slate-700 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200'
                            }`}
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-indigo-600/30 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                            <div className="relative z-10 flex items-center justify-between">
                              <span>{opt.text}</span>
                              <span className="font-mono text-[10px] text-indigo-300 font-bold ml-2">
                                {opt.votes} ({pct}%)
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                      <span>Total Votes: {msg.pollData.totalVotes}</span>
                      <span>Expires in 7 days</span>
                    </div>
                  </div>
                ) : msg.messageType === 'event' && msg.eventData ? (
                  /* 4. Event Invite Rendering */
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-3 my-1 space-y-2 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-bold">
                      <Calendar className="w-4 h-4" />
                      Sovereign Event Invitation
                    </div>
                    <h4 className="text-sm font-bold text-white">{msg.eventData.title}</h4>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {msg.eventData.location}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono">
                      📅 {new Date(msg.eventData.startTime).toLocaleDateString()} at {new Date(msg.eventData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => onRsvpEvent(msg.id, 'going')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          msg.eventData.userRsvpStatus === 'going'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        ✓ Going ({msg.eventData.rsvpCount})
                      </button>
                      <button
                        onClick={() => onRsvpEvent(msg.id, 'maybe')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          msg.eventData.userRsvpStatus === 'maybe' ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        Maybe
                      </button>
                    </div>
                  </div>
                ) : msg.messageType === 'document' && msg.attachments?.[0] ? (
                  /* 5. Document / PDF Attachment Rendering */
                  <div className="space-y-1.5 py-1">
                    <p className="leading-relaxed">{msg.content}</p>
                    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{msg.attachments[0].name}</p>
                          <p className="text-[10px] text-slate-400">
                            {(msg.attachments[0].sizeBytes / 1024 / 1024).toFixed(1)} MB • SHA-256 Verified
                          </p>
                        </div>
                      </div>
                      <a
                        href={msg.attachments[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                        title="Download Asset"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* 6. Standard Text & Markdown */
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}

                {/* AI Customer Intent / Task Detection Box */}
                {msg.aiAnalysis && (
                  <div className="mt-2 p-2 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-indigo-300 font-bold text-[10px]">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        AI Intent & Action Detected
                      </span>
                      <span className="uppercase text-[9px] px-1 py-0.2 bg-indigo-500/20 rounded">
                        {msg.aiAnalysis.sentiment}
                      </span>
                    </div>
                    <p className="text-slate-200 font-medium">{msg.aiAnalysis.intent}</p>
                    {msg.aiAnalysis.taskExtracted && (
                      <div className="text-[10px] text-slate-300 bg-slate-900/60 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                        <span>Task: {msg.aiAnalysis.taskExtracted}</span>
                        {onAdvanceCrmStage && (
                          <button
                            onClick={() => onAdvanceCrmStage('customer', 120000)}
                            className="ml-2 px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[9px] font-bold whitespace-nowrap"
                          >
                            Advance to Customer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Timestamp, Edited, Ephemeral & Read Receipts */}
                <div className="flex items-center justify-end gap-1.5 mt-1.5 text-[10px] opacity-75">
                  {msg.isPinned && <Pin className="w-2.5 h-2.5 text-amber-300" />}
                  {msg.isEdited && <span className="italic">(edited)</span>}
                  <span>{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {isMe && (
                    msg.state === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-sky-300" title="Read by recipient" />
                    ) : msg.state === 'delivered' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-slate-300" title="Delivered to device" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-slate-400" title="Sent to mesh network" />
                    )
                  )}
                </div>

                {/* Reaction Pill Row */}
                {msg.reactions.length > 0 && (
                  <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                    {msg.reactions.map((rx, idx) => (
                      <button
                        key={idx}
                        onClick={() => onReactToMessage(msg.id, rx.emoji)}
                        className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 border transition-colors ${
                          rx.userReacted
                            ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                            : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{rx.emoji}</span>
                        <span className="text-[10px] font-bold">{rx.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hover Quick Actions (React, Pin, Delete) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 mb-1 bg-slate-950/80 rounded-lg p-0.5 border border-slate-800 shadow">
                <button
                  onClick={() => onReactToMessage(msg.id, '❤️')}
                  className="p-1 hover:bg-slate-800 rounded text-xs"
                  title="React with Heart"
                >
                  ❤️
                </button>
                <button
                  onClick={() => onReactToMessage(msg.id, '🔥')}
                  className="p-1 hover:bg-slate-800 rounded text-xs"
                  title="React with Fire"
                >
                  🔥
                </button>
                <button
                  onClick={() => onReactToMessage(msg.id, '👍')}
                  className="p-1 hover:bg-slate-800 rounded text-xs"
                  title="React with Thumbs Up"
                >
                  👍
                </button>
                <button
                  onClick={() => onPinMessage(msg.id)}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-amber-400 rounded text-xs"
                  title="Pin message"
                >
                  <Pin className="w-3 h-3" />
                </button>
                {isMe && (
                  <button
                    onClick={() => onDeleteMessage(msg.id)}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded text-xs"
                    title="Delete message"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Smart Replies & Action Suggestions */}
      {smartReplies.length > 0 && (
        <div className="px-3.5 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-indigo-400" /> AI Smart:
          </span>
          {smartReplies.map(reply => (
            <button
              key={reply.id}
              onClick={() => {
                setInputText(reply.text);
              }}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs whitespace-nowrap transition-colors shadow-sm"
            >
              {reply.text.length > 40 ? reply.text.substring(0, 40) + '...' : reply.text}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90 space-y-2">
        <div className="flex items-center gap-2">
          {/* OmniPay Instant Transfer Trigger */}
          <button
            id="btn-omni-pay-modal"
            onClick={() => setShowPayModal(true)}
            className="p-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl transition-colors"
            title="Send OMNI Finance Money Transfer"
          >
            <DollarSign className="w-4 h-4" />
          </button>

          {/* Attachment / Poll Menu */}
          <div className="relative">
            <button
              id="btn-attachment-menu"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Attach media, poll, event, or file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {showAttachMenu && (
              <div className="absolute bottom-12 left-0 w-48 bg-slate-900 border border-slate-800 rounded-xl p-1.5 shadow-2xl space-y-1 z-30 animate-fadeIn">
                <button
                  onClick={() => {
                    setShowPollModal(true);
                    setShowAttachMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                  Create Poll
                </button>
                <button
                  onClick={() => {
                    onSendMessage('Calendar invite: Architecture Working Session', 'event', {
                      eventData: {
                        id: `evt_${Date.now()}`,
                        title: 'Architecture Working Session',
                        startTime: new Date(Date.now() + 86400000).toISOString(),
                        endTime: new Date(Date.now() + 90000000).toISOString(),
                        location: 'OMNI HD WebRTC Room #room_omni_exec',
                        rsvpCount: 4,
                        userRsvpStatus: 'going'
                      }
                    });
                    setShowAttachMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  Schedule Event
                </button>
                <button
                  onClick={() => {
                    onSendMessage('Shared document: Sovereign_Audit_Report.pdf', 'document', {
                      attachments: [{
                        id: `att_${Date.now()}`,
                        type: 'document',
                        name: 'Sovereign_Audit_Report.pdf',
                        sizeBytes: 4200000,
                        mimeType: 'application/pdf',
                        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                        cdnUrl: 'https://cdn.omni.network/audit_2026.pdf',
                        sha256Hash: 'a71829384719283749182374918273948172938471928374'
                      }]
                    });
                    setShowAttachMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Attach Document
                </button>
              </div>
            )}
          </div>

          {/* Text Input Field */}
          <div className="relative flex-1">
            <input
              id="messenger-input-text"
              type="text"
              placeholder={isRecordingVoice ? `Recording encrypted audio... ${voiceSeconds}s` : "Type an encrypted message..."}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={isRecordingVoice}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Voice Note Recorder Button */}
          {isRecordingVoice ? (
            <button
              onClick={handleSendVoice}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold animate-pulse shadow-md"
            >
              Send ({voiceSeconds}s)
            </button>
          ) : (
            <button
              id="btn-voice-record"
              onClick={() => setIsRecordingVoice(true)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>
          )}

          {/* Send Message Button */}
          <button
            id="btn-send-message"
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-xl transition-colors ${
              inputText.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* OmniPay Instant Transfer Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Send OmniPay Instant Transfer</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Instantly settle funds directly into <strong className="text-white">{conversation.title}</strong>'s OMNI Finance OS account with 0% transaction fee.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Transfer Amount (USD)</label>
              <input
                type="number"
                value={payAmount}
                onChange={e => setPayAmount(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-lg font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Memo / Purpose</label>
              <input
                type="text"
                value={payDescription}
                onChange={e => setPayDescription(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPay}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Authorize & Settle Instantly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Poll Modal */}
      {showPollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <BarChart2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Create Community Poll</h3>
              </div>
              <button onClick={() => setShowPollModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Question</label>
              <input
                type="text"
                value={pollQuestion}
                onChange={e => setPollQuestion(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">Options</label>
              {pollOptions.map((opt, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={opt}
                  onChange={e => {
                    const newOpts = [...pollOptions];
                    newOpts[idx] = e.target.value;
                    setPollOptions(newOpts);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowPollModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Post Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
