import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  Sparkles,
  Shield,
  Volume2,
  Settings,
  Users,
  MessageSquare,
  Maximize2,
  Minimize2,
  Hand,
  Image,
  Zap
} from 'lucide-react';
import {
  CallType,
  CallParticipant,
  VirtualBackground,
  NoiseSuppressionMode
} from '../../../types/omni_media_meetings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  callType: CallType;
  participants: CallParticipant[];
  startedAt?: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  virtualBackground: VirtualBackground;
  noiseSuppression: NoiseSuppressionMode;
  onToggleAudio: (muted: boolean) => void;
  onToggleVideo: (videoOff: boolean) => void;
  onToggleScreenShare: (sharing: boolean) => void;
  onSetVirtualBackground: (bg: VirtualBackground) => void;
  onSetNoiseSuppression: (ns: NoiseSuppressionMode) => void;
}

export const OmniCallingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  callType,
  participants,
  isMuted,
  isVideoOff,
  isScreenSharing,
  virtualBackground,
  noiseSuppression,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onSetVirtualBackground,
  onSetNoiseSuppression
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isVoiceOnly = callType === 'one_to_one_voice' || callType === 'group_voice';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-6 text-white font-sans animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            {isVoiceOnly ? <Volume2 className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white capitalize">
                {callType.replace(/_/g, ' ')}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Post-Quantum E2EE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live Session • {formatTimer(callDuration)} • WebRTC SFU Mesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Neural Noise Suppression: {noiseSuppression === 'ai_krisp_neural' ? 'Krisp Active' : 'DSP'}</span>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Video / Voice Grid Stage */}
      <div className="flex-1 my-4 flex items-center justify-center overflow-hidden relative">
        <div className={`grid gap-4 w-full h-full max-h-[620px] ${
          participants.length <= 1 ? 'grid-cols-1' :
          participants.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
          'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {participants.map((p, idx) => (
            <div
              key={p.profileId || idx}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group"
            >
              {/* If Video Off or Voice Only */}
              {isVideoOff || isVoiceOnly || p.isVideoOff ? (
                <div className="flex flex-col items-center gap-4 text-center p-6">
                  <div className="relative">
                    <img
                      src={p.avatarUrl}
                      alt={p.displayName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-indigo-500/40 shadow-2xl"
                    />
                    {p.isSpeaking && (
                      <span className="absolute -inset-2 rounded-full border-2 border-emerald-400 animate-ping opacity-60 pointer-events-none" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
                      {p.displayName}
                    </h3>
                    <p className="text-xs text-indigo-400">@{p.username}</p>
                  </div>
                </div>
              ) : (
                /* Video Stream Simulation */
                <div className="w-full h-full relative">
                  <img
                    src={p.avatarUrl}
                    alt={p.displayName}
                    className="w-full h-full object-cover opacity-90"
                  />
                  {virtualBackground !== 'none' && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-slate-950/70 backdrop-blur-md rounded-lg text-[10px] text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                      <Image className="w-3 h-3" /> VB: {virtualBackground.replace('_', ' ')}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Participant Info Strip */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{p.displayName}</span>
                  {p.isScreenSharing && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/30 text-indigo-300 font-semibold">
                      Presenting
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    {p.bitrateKbps} kbps • {p.networkQuality}
                  </span>
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

        {/* Settings Drawer Slide-In */}
        {showSettingsDrawer && (
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900/95 border-l border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl z-20 space-y-5 animate-in slide-in-from-right duration-200 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" />
                Media & Device Controls
              </h3>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Done
              </button>
            </div>

            {/* Virtual Background Selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                AI Virtual Background
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'blur_light', label: 'Light Blur' },
                  { id: 'blur_heavy', label: 'Deep Blur' },
                  { id: 'office_luxury', label: 'Luxury Office' },
                  { id: 'studio_minimal', label: 'Minimal Studio' },
                  { id: 'cyber_matrix', label: 'Cyber Grid' },
                  { id: 'nature_sunset', label: 'Nature Sunset' }
                ].map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => onSetVirtualBackground(bg.id as VirtualBackground)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors ${
                      virtualBackground === bg.id
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Noise Suppression Selection */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Noise Suppression Architecture
              </label>
              <div className="space-y-2">
                {[
                  { id: 'ai_krisp_neural', label: 'Neural AI Cancellation (Krisp Engine)', desc: 'Zero background noise, removes dog barks & typing' },
                  { id: 'studio_voice', label: 'Studio Vocal Enhancement', desc: 'Preserves vocal dynamics and acoustic resonance' },
                  { id: 'standard_dsp', label: 'Standard DSP Filter', desc: 'Lightweight CPU filtering' },
                  { id: 'off', label: 'Raw Acoustic Audio (Off)', desc: 'Unfiltered high-fidelity audio' }
                ].map(ns => (
                  <button
                    key={ns.id}
                    onClick={() => onSetNoiseSuppression(ns.id as NoiseSuppressionMode)}
                    className={`w-full p-2.5 rounded-xl text-left border transition-colors ${
                      noiseSuppression === ns.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{ns.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{ns.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Call Control Bar */}
      <div className="flex items-center justify-center gap-3 bg-slate-900/90 border border-slate-800 rounded-3xl p-3.5 shadow-2xl backdrop-blur-md max-w-2xl mx-auto w-full">
        {/* Mute Toggle */}
        <button
          onClick={() => onToggleAudio(!isMuted)}
          className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
            isMuted
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Video Toggle */}
        {!isVoiceOnly && (
          <button
            onClick={() => onToggleVideo(!isVideoOff)}
            className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
              isVideoOff
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
            title={isVideoOff ? 'Turn video on' : 'Turn video off'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        {/* Screen Share */}
        <button
          onClick={() => onToggleScreenShare(!isScreenSharing)}
          className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
            isScreenSharing
              ? 'bg-indigo-600 text-white shadow-indigo-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title={isScreenSharing ? 'Stop presenting' : 'Share screen'}
        >
          <ScreenShare className="w-5 h-5" />
        </button>

        {/* Raise Hand */}
        <button
          onClick={() => setIsHandRaised(!isHandRaised)}
          className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
            isHandRaised
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title={isHandRaised ? 'Lower hand' : 'Raise hand'}
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
          className={`p-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center cursor-pointer ${
            showSettingsDrawer
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
          }`}
          title="Media settings & virtual background"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* End Call Button */}
        <button
          onClick={onClose}
          className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="hidden sm:inline">End Call</span>
        </button>
      </div>
    </div>
  );
};
