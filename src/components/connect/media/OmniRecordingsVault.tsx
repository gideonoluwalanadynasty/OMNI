import React, { useState } from 'react';
import {
  Film,
  Play,
  Download,
  Share2,
  Shield,
  Clock,
  HardDrive,
  Lock,
  Unlock,
  CheckCircle2,
  Trash2,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';
import { OmniCloudRecording } from '../../../types/omni_media_meetings';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
}

export const OmniRecordingsVault: React.FC<Props> = ({ engine, currentProfileId }) => {
  const recordings = engine.getCloudRecordings();
  const [selectedRecordingId, setSelectedRecordingId] = useState<string>(recordings[0]?.id || 'rec_cloud_01');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<any>('org_internal');
  const [passcode, setPasscode] = useState('');

  const selectedRecording = engine.getCloudRecordings().find(r => r.id === selectedRecordingId) || recordings[0];

  const handleDelete = (id: string) => {
    engine.deleteCloudRecording(id);
    const remaining = engine.getCloudRecordings();
    if (remaining.length > 0) {
      setSelectedRecordingId(remaining[0].id);
    }
  };

  const handleSavePermission = () => {
    if (selectedRecording) {
      engine.updateRecordingPermission(selectedRecording.id, selectedPermission, passcode || undefined);
      setShowPermissionModal(false);
    }
  };

  const formatSecs = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-900/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white">OMNI Cloud Recordings Vault</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Immutable Storage CDN
              </span>
            </div>
            <p className="text-xs text-slate-400">
              SHA-256 Merkle Provenance • AI Smart Chapters • Enterprise Access Governance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-violet-400" />
            <span>{(recordings || []).length} Cloud Archives Active</span>
          </div>
        </div>
      </div>

      {/* Main Split View: Video Player + Chapter Index & Library */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Player & Smart AI Chapters */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 lg:p-6 space-y-4">
          {selectedRecording ? (
            <>
              {/* Video Player Canvas */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-between p-6 group">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200"
                  alt={selectedRecording.meetingTitle}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {formatSecs(selectedRecording.durationSeconds)} Duration
                  </span>

                  <button
                    onClick={() => setShowPermissionModal(true)}
                    className="px-3 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md text-xs font-semibold text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Permissions: {selectedRecording.accessPermission?.replace('_', ' ') || 'Internal'}
                  </button>
                </div>

                {/* Play Button Simulation */}
                <div className="relative z-10 self-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 cursor-pointer transform hover:scale-110 transition-all">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>

                {/* Bottom Video Metadata */}
                <div className="relative z-10 space-y-1">
                  <h2 className="text-lg font-bold text-white">
                    {selectedRecording.meetingTitle}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Recorded by {selectedRecording.hostName} • {Math.round((selectedRecording.fileSizeBytes || 0) / (1024 * 1024))} MB MP4 • Cloud CDN
                  </p>
                </div>
              </div>

              {/* Cryptographic SHA-256 Proof Card */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">SHA-256 Merkle Provenance Hash</h4>
                    <p className="text-[11px] text-slate-400 font-mono truncate max-w-lg">
                      {selectedRecording.sha256ProofHash}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 shrink-0">
                  Verified Unmodified
                </span>
              </div>

              {/* AI Smart Chapters Index */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" /> AI Smart Chapter Index
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedRecording.smartChapters || []).map((ch, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        activeChapterIndex === idx
                          ? 'bg-violet-600/20 border-violet-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-violet-400 mb-1">
                        <span>{formatSecs(ch.timestampSeconds)}</span>
                        <span className="text-[10px] text-slate-500">Chapter 0{idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{ch.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">{ch.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm">
              <Film className="w-12 h-12 mb-3 opacity-40" />
              No cloud recordings found.
            </div>
          )}
        </div>

        {/* Right: Recordings Library List */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/80 flex flex-col shrink-0 p-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            All Cloud Recordings ({(recordings || []).length})
          </h3>

          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {(recordings || []).map(rec => (
              <div
                key={rec.id}
                onClick={() => setSelectedRecordingId(rec.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedRecordingId === rec.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-400 font-mono">
                    {formatSecs(rec.durationSeconds)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(rec.recordedAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">{rec.meetingTitle}</h4>
                <p className="text-[10px] text-slate-400">Host: {rec.hostName}</p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {rec.fileSizeBytes / (1024 * 1024)} MB
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(rec.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Delete recording"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permission Manager Modal */}
      {showPermissionModal && selectedRecording && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-violet-400" /> Storage & Access Permissions
              </h3>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Access Level
                </label>
                <select
                  value={selectedPermission}
                  onChange={e => setSelectedPermission(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="private">Private (Only Host)</option>
                  <option value="invited_only">Invited Meeting Participants Only</option>
                  <option value="org_internal">Organization / Team Members</option>
                  <option value="public_link">Public Share Link (With Token)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Passcode Protection (Optional)
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  placeholder="Set secret passcode..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPermissionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePermission}
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-violet-600/30"
                >
                  Save Access Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
