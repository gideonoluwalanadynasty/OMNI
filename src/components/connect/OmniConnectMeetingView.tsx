import React, { useState } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
  PhoneOff,
  Users,
  MessageSquare,
  Sparkles,
  Shield,
  FileText,
  CheckCircle2,
  Lock,
  Hand
} from 'lucide-react';
import { ConnectMeetingRoom } from '../../types/omni_connect';

interface Props {
  meetingRoom: ConnectMeetingRoom;
  onLeaveMeeting: () => void;
}

export const OmniConnectMeetingView: React.FC<Props> = ({
  meetingRoom,
  onLeaveMeeting
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'summary' | 'participants'>('transcript');

  return (
    <div id="omni-connect-meeting-view" className="flex flex-col h-[750px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Meeting Status Bar */}
      <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              {meetingRoom.roomTitle}
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" /> E2EE WebRTC Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">Host: {meetingRoom.hostName} • Started at {new Date(meetingRoom.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            REC (Cloud Archive)
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Gemini Transcribing
          </span>
        </div>
      </div>

      {/* Main Video Stage & Sidebar Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Video Stage */}
        <div className="flex-1 p-4 bg-slate-950 flex flex-col items-center justify-center relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-h-[550px]">
            {meetingRoom.activeParticipants.map(participant => (
              <div
                key={participant.profileId}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg group"
              >
                {/* Simulated Video Feed or Avatar */}
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
                />

                {/* Participant Overlay Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{participant.name}</span>
                    {participant.isScreenSharing && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-medium">
                        Screen Sharing
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    {participant.isMutedAudio ? (
                      <MicOff className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right AI Live Transcript & Summary Sidebar */}
        <div className="w-80 md:w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
          {/* Tabs Header */}
          <div className="p-2 border-b border-slate-800 flex items-center gap-1 bg-slate-950/40">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'transcript'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Live Transcript
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              AI Summary
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {activeTab === 'transcript' ? (
              <div className="space-y-3">
                {meetingRoom.liveTranscript.map(tr => (
                  <div key={tr.id} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
                      <span className="font-bold text-indigo-400">{tr.speakerName}</span>
                      <span>{tr.timestamp}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{tr.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {meetingRoom.aiMeetingSummary ? (
                  <>
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-indigo-400 mb-1">Executive Overview</h4>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {meetingRoom.aiMeetingSummary.summaryParagraph}
                      </p>
                    </div>

                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-emerald-400 mb-2">Key Decisions Ratified</h4>
                      <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                        {meetingRoom.aiMeetingSummary.keyDecisions.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 mb-2">Action Items & Assignees</h4>
                      <div className="space-y-2">
                        {meetingRoom.aiMeetingSummary.actionItems.map((item, i) => (
                          <div key={i} className="flex items-start justify-between gap-2 border-b border-slate-850 pb-1.5">
                            <span className="text-slate-200">{item.task}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-indigo-300 rounded font-semibold whitespace-nowrap">
                              {item.assignee}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">Generating meeting intelligence...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Meeting Controls Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            <span>{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
          </button>

          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ScreenShare className="w-4 h-4" />
            <span>Share Screen</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`p-3 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              isHandRaised ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
          </button>

          <button
            id="btn-leave-meeting"
            onClick={onLeaveMeeting}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};
