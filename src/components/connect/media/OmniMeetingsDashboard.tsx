import React, { useState } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  ScreenShare,
  Users,
  MessageSquare,
  Sparkles,
  Shield,
  CircleDot,
  Settings,
  Lock,
  Unlock,
  Plus,
  Play,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  ChevronRight,
  Languages,
  ArrowRight,
  Hand,
  TrendingUp,
  FileText,
  UserCheck,
  UserX,
  Zap,
  Globe,
  Send
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';
import {
  OmniMeetingSession,
  MeetingLayoutMode,
  AiMeetingLiveTranscriptItem,
  AiMeetingActionItem,
  AiMeetingExecutiveDigest,
  MeetingChatMessage
} from '../../../types/omni_media_meetings';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
  onOpenCallModal?: (callType: any, targetId: string) => void;
  onOpenWebinarHub?: () => void;
  onOpenClassroom?: () => void;
  onOpenRecordings?: () => void;
}

export const OmniMeetingsDashboard: React.FC<Props> = ({
  engine,
  currentProfileId,
  onOpenCallModal,
  onOpenWebinarHub,
  onOpenClassroom,
  onOpenRecordings
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'past'>('live');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>('room_boardroom_alpha');
  const [activeSidePanel, setActiveSidePanel] = useState<'transcript' | 'chat' | 'participants' | 'summary'>('transcript');
  const [translatedLang, setTranslatedLang] = useState<'en' | 'es' | 'fr' | 'zh' | 'de'>('en');
  const [chatInputText, setChatInputText] = useState('');
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newMaxParticipants, setNewMaxParticipants] = useState(50);
  const [newRequireWaitingRoom, setNewRequireWaitingRoom] = useState(true);

  // Read Engine state
  const meetings = engine.getMeetingSessions();
  const selectedMeeting = engine.getMeetingSession(selectedMeetingId) || meetings[0];
  const transcripts = engine.getMeetingLiveTranscripts(selectedMeeting?.id || 'room_boardroom_alpha');
  const actionItems = engine.getMeetingActionItems(selectedMeeting?.id || 'room_boardroom_alpha');
  const executiveDigest = engine.getMeetingExecutiveDigest(selectedMeeting?.id || 'room_boardroom_alpha');
  const chatMessages = engine.getMeetingChatMessages(selectedMeeting?.id || 'room_boardroom_alpha');

  // Handle participant and room actions
  const handleAdmit = (profileId: string) => {
    if (selectedMeeting) {
      engine.admitWaitingParticipant(selectedMeeting.id, profileId);
      // force re-render
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleReject = (profileId: string) => {
    if (selectedMeeting) {
      engine.rejectWaitingParticipant(selectedMeeting.id, profileId);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleMuteAll = () => {
    if (selectedMeeting) {
      engine.toggleMeetingMuteAll(selectedMeeting.id);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleToggleLock = () => {
    if (selectedMeeting) {
      engine.toggleMeetingLock(selectedMeeting.id);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleToggleRecording = () => {
    if (selectedMeeting) {
      engine.toggleMeetingRecording(selectedMeeting.id);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleToggleScreenShare = (profileId: string) => {
    if (selectedMeeting) {
      engine.toggleMeetingScreenShare(selectedMeeting.id, profileId);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim() || !selectedMeeting) return;
    engine.sendMeetingChatMessage(
      selectedMeeting.id,
      currentProfileId,
      'Gideon Sovereign',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      chatInputText.trim()
    );
    setChatInputText('');
  };

  const handleToggleCrmSync = (actionId: string) => {
    if (selectedMeeting) {
      engine.toggleActionItemCrmSync(selectedMeeting.id, actionId);
      setSelectedMeetingId(selectedMeeting.id);
    }
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomTitle.trim()) return;
    const created = engine.createMeetingSession({
      roomTitle: newRoomTitle.trim(),
      maxParticipants: newMaxParticipants,
      waitingRoomEnabled: newRequireWaitingRoom,
      hostProfileId: currentProfileId,
      hostName: 'Gideon Sovereign',
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'
    });
    setSelectedMeetingId(created.id);
    setShowNewMeetingModal(false);
    setNewRoomTitle('');
  };

  const activeSharer = (selectedMeeting?.activeParticipants || []).find(p => p.isScreenSharing);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Media Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              OMNI Sovereign Meetings
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                WebRTC SFU Active
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Kyber-1024 Post-Quantum E2EE • AI Real-Time Neural Translation & CRM Sync
            </p>
          </div>
        </div>

        {/* Quick Launch Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowNewMeetingModal(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Meeting</span>
          </button>
        </div>
      </div>

      {/* Main Container: Split Stage & AI Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Meeting Rooms Selector & Active Video Stage */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 p-4 lg:p-5 space-y-4">
          {/* Active Meeting Room Header */}
          {selectedMeeting && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h2 className="text-base font-bold text-white">{selectedMeeting.roomTitle}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Host: {selectedMeeting.hostName}
                  </span>
                  {selectedMeeting.isLocked && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Room Locked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  Room ID: <span className="font-mono text-slate-300">{selectedMeeting.id}</span> • {(selectedMeeting.activeParticipants || []).length} Connected • {(selectedMeeting.waitingRoomParticipants || []).length} in Waiting Room
                </p>
              </div>

              {/* Host Quick Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMuteAll}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-1.5"
                  title="Mute all non-host participants"
                >
                  <MicOff className="w-3.5 h-3.5 text-rose-400" /> Mute All
                </button>

                <button
                  onClick={handleToggleLock}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    selectedMeeting.isLocked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  }`}
                >
                  {selectedMeeting.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  {selectedMeeting.isLocked ? 'Unlock' : 'Lock Room'}
                </button>

                <button
                  onClick={handleToggleRecording}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    selectedMeeting.isCloudRecordingActive
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  }`}
                >
                  <CircleDot className={`w-3.5 h-3.5 ${selectedMeeting.isCloudRecordingActive ? 'text-rose-400 animate-pulse' : ''}`} />
                  {selectedMeeting.isCloudRecordingActive ? 'REC Active' : 'Start REC'}
                </button>
              </div>
            </div>
          )}

          {/* Video Grid / Presentation Viewport */}
          <div className="flex-1 min-h-[360px] bg-slate-900/60 border border-slate-800/80 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            {/* If Screen Sharer active, show main presentation canvas */}
            {activeSharer ? (
              <div className="flex-1 flex flex-col relative rounded-2xl overflow-hidden bg-slate-950 border border-indigo-500/30">
                {/* Mock presentation stream */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-slate-950 to-slate-900">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 shadow-xl">
                    <ScreenShare className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {activeSharer.displayName} is Presenting Screen
                  </h3>
                  <p className="text-xs text-indigo-300 mt-1 font-mono">
                    4K60 Ultra-HD Low-Latency Stream • Adaptive Simulcast 2400 kbps
                  </p>
                  <div className="mt-4 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 max-w-md">
                    Live Document: <span className="text-indigo-400 font-semibold">Q3_Sovereign_Expansion_Blueprint.omni</span>
                  </div>
                </div>

                {/* Floating Picture-in-Picture of Presenter */}
                <div className="absolute top-4 right-4 w-44 h-32 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-2xl bg-slate-900">
                  <img
                    src={activeSharer.avatarUrl}
                    alt={activeSharer.displayName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 px-2 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-[10px] text-white flex items-center justify-between">
                    <span className="truncate">{activeSharer.displayName}</span>
                    <Mic className="w-3 h-3 text-emerald-400 shrink-0" />
                  </div>
                </div>
              </div>
            ) : (
              /* Regular Multi-Participant Grid */
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                {(selectedMeeting?.activeParticipants || []).map(p => (
                  <div
                    key={p.profileId}
                    className="relative bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden flex items-center justify-center group shadow-md"
                  >
                    {p.isVideoOff ? (
                      <div className="flex flex-col items-center gap-2.5 p-4 text-center">
                        <div className="relative">
                          <img
                            src={p.avatarUrl}
                            alt={p.displayName}
                            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/40"
                          />
                          {p.isSpeaking && (
                            <span className="absolute -inset-1.5 rounded-full border-2 border-emerald-400 animate-ping opacity-50" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{p.displayName}</h4>
                          <span className="text-[10px] text-indigo-400">@{p.username}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <img
                          src={p.avatarUrl}
                          alt={p.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Participant bottom bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                          {p.displayName}
                        </span>
                        {p.isHandRaised && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/30 text-amber-300 font-bold flex items-center gap-1">
                            <Hand className="w-2.5 h-2.5" /> Hand
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleScreenShare(p.profileId)}
                          className={`p-1 rounded-lg transition-colors ${
                            p.isScreenSharing
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title="Toggle Presenter Screen"
                        >
                          <ScreenShare className="w-3.5 h-3.5" />
                        </button>
                        <div className="p-1 rounded-lg bg-slate-800">
                          {p.isMutedAudio ? (
                            <MicOff className="w-3.5 h-3.5 text-rose-400" />
                          ) : (
                            <Mic className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Waiting Room Banner if anyone is queued */}
            {selectedMeeting && (selectedMeeting.waitingRoomParticipants || []).length > 0 && (
              <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300">
                      {(selectedMeeting.waitingRoomParticipants || []).length} Waiting for Host Approval
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {selectedMeeting.waitingRoomParticipants?.[0]?.name} ({selectedMeeting.waitingRoomParticipants?.[0]?.email})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => selectedMeeting.waitingRoomParticipants?.[0] && handleAdmit(selectedMeeting.waitingRoomParticipants[0].profileId)}
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Admit
                  </button>
                  <button
                    onClick={() => selectedMeeting.waitingRoomParticipants?.[0] && handleReject(selectedMeeting.waitingRoomParticipants[0].profileId)}
                    className="px-3 py-1 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <UserX className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Intelligence Panel, Transcript, Chat & Digest */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/70 flex flex-col shrink-0">
          {/* Side Panel Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900/90 px-3 py-2 gap-1">
            {[
              { id: 'transcript', label: 'AI Transcript', icon: Sparkles },
              { id: 'summary', label: 'CRM Digest', icon: TrendingUp },
              { id: 'chat', label: 'In-Room Chat', icon: MessageSquare },
              { id: 'participants', label: 'Roster', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSidePanel(tab.id as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeSidePanel === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: AI Live Transcript & Multi-Language Translation */}
          {activeSidePanel === 'transcript' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden space-y-3">
              <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/70 rounded-xl px-3 py-2">
                <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold">
                  <Languages className="w-4 h-4" /> Neural Translation:
                </div>
                <div className="flex items-center gap-1">
                  {(['en', 'es', 'fr', 'zh', 'de'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setTranslatedLang(lang)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-colors ${
                        translatedLang === lang
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Live Transcript Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {transcripts.map(tr => {
                  const displayText =
                    translatedLang === 'en'
                      ? tr.originalText
                      : tr.translations[translatedLang] || tr.originalText;

                  return (
                    <div
                      key={tr.id}
                      className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3 space-y-1.5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={tr.speakerAvatar}
                            alt={tr.speakerName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-200">{tr.speakerName}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{tr.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans pl-7">
                        {displayText}
                      </p>
                      {tr.sentiment === 'action_driven' && (
                        <div className="pl-7 pt-1">
                          <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-max">
                            <CheckCircle2 className="w-2.5 h-2.5" /> AI Action Item Detected
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: CRM Executive Digest & Action Items */}
          {activeSidePanel === 'summary' && executiveDigest && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Executive Summary Card */}
              <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> Executive AI Digest
                  </h4>
                  <span className="text-[10px] text-indigo-400 font-mono">Confidence 98.4%</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {executiveDigest.executiveSummary}
                </p>
              </div>

              {/* Key Decisions */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Key Decisions Reached
                </h4>
                <ul className="space-y-1.5">
                  {(executiveDigest?.keyDecisions || []).map((kd, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{kd}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extracted Action Items with 1-Click OMNI CRM Sync */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Action Items ({(actionItems || []).length})
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">Live CRM Pipe</span>
                </div>

                <div className="space-y-2">
                  {(actionItems || []).map(act => (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">{act.taskTitle}</div>
                        <div className="text-[10px] text-slate-400">
                          Assignee: <span className="text-indigo-300 font-semibold">{act.assigneeName}</span> • Due: {act.dueTimeline}
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleCrmSync(act.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors shrink-0 ${
                          act.crmSynced
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30'
                        }`}
                      >
                        {act.crmSynced ? 'Synced to CRM' : 'Sync to CRM'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: In-Room Chat */}
          {activeSidePanel === 'chat' && (
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
                {(chatMessages || []).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                    <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
                    No in-room chat messages yet.
                  </div>
                ) : (
                  (chatMessages || []).map(msg => (
                    <div key={msg.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInputText}
                  onChange={e => setChatInputText(e.target.value)}
                  placeholder="Send a message to everyone..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 4: Participant Roster */}
          {activeSidePanel === 'participants' && selectedMeeting && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Active In Room ({(selectedMeeting.activeParticipants || []).length})
              </h4>
              {(selectedMeeting.activeParticipants || []).map(p => (
                <div
                  key={p.profileId}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.avatarUrl}
                      alt={p.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        {p.displayName}
                        {p.profileId === selectedMeeting.hostProfileId && (
                          <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded font-semibold">Host</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">@{p.username}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {p.isMutedAudio ? (
                      <MicOff className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create / Schedule New Meeting */}
      {showNewMeetingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-400" /> Create Instant Sovereign Meeting
              </h3>
              <button
                onClick={() => setShowNewMeetingModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Meeting Room Title
                </label>
                <input
                  type="text"
                  required
                  value={newRoomTitle}
                  onChange={e => setNewRoomTitle(e.target.value)}
                  placeholder="e.g. Q3 Sovereign Strategy & Tokenomics"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Max Capacity
                </label>
                <select
                  value={newMaxParticipants}
                  onChange={e => setNewMaxParticipants(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={25}>25 Participants (HD Mesh)</option>
                  <option value={50}>50 Participants (SFU Tier 1)</option>
                  <option value={100}>100 Participants (SFU Enterprise)</option>
                  <option value={500}>500 Participants (Large Townhall)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chkWaiting"
                  checked={newRequireWaitingRoom}
                  onChange={e => setNewRequireWaitingRoom(e.target.checked)}
                  className="rounded border-slate-800 text-indigo-600 focus:ring-0"
                />
                <label htmlFor="chkWaiting" className="text-xs text-slate-300">
                  Enable Gatekeeper Waiting Room (Host approval required)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewMeetingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
                >
                  Launch Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
