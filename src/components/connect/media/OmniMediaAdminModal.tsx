import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Activity,
  HardDrive,
  Clock,
  Users,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';
import { MediaPlatformAdminPolicies } from '../../../types/omni_media_meetings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  engine: OmniConnectEngine;
}

export const OmniMediaAdminModal: React.FC<Props> = ({ isOpen, onClose, engine }) => {
  const [policies, setPolicies] = useState<MediaPlatformAdminPolicies>(engine.getMediaAdminPolicies());
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    engine.updateMediaAdminPolicies(policies);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 p-6 text-white font-sans animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Super Admin Media Policies & Infrastructure</h2>
              <p className="text-xs text-slate-400">Enterprise SFU Routing, DLP Watermarking & Storage Retention</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        {/* Global Edge Node Topology Status */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" /> Active Media SFU Routing Nodes
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Mesh Healthy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { region: 'US-East (N. Virginia)', status: 'Optimal', rtt: '18ms', load: '32%' },
              { region: 'EU-Central (Frankfurt)', status: 'Optimal', rtt: '24ms', load: '45%' },
              { region: 'AP-East (Tokyo)', status: 'Optimal', rtt: '42ms', load: '28%' }
            ].map(node => (
              <div key={node.region} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white truncate">{node.region}</div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                  <span>RTT: {node.rtt}</span>
                  <span className="text-emerald-400 font-semibold">{node.load}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Max Meeting Duration */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Max Meeting Duration (Minutes)
              </label>
              <input
                type="number"
                value={policies.maxMeetingDurationMinutes}
                onChange={e => setPolicies({ ...policies, maxMeetingDurationMinutes: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Max Participants */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Max Meeting Participants Limit
              </label>
              <input
                type="number"
                value={policies.maxParticipantsPerMeeting}
                onChange={e => setPolicies({ ...policies, maxParticipantsPerMeeting: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Max Webinar Audience */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Max Webinar Audience Capacity
              </label>
              <input
                type="number"
                value={policies.maxWebinarAudience}
                onChange={e => setPolicies({ ...policies, maxWebinarAudience: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Recording Retention Days */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Cloud Recording Retention (Days)
              </label>
              <input
                type="number"
                value={policies.recordingRetentionDays}
                onChange={e => setPolicies({ ...policies, recordingRetentionDays: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Security & Watermark Switches */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Require Host Waiting Room by Default</div>
                <div className="text-[10px] text-slate-400">All uninvited profiles are held until host approval</div>
              </div>
              <input
                type="checkbox"
                checked={policies.requireWaitingRoomByDefault}
                onChange={e => setPolicies({ ...policies, requireWaitingRoomByDefault: e.target.checked })}
                className="rounded border-slate-800 text-indigo-600 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Forensic DLP Watermark Injection</div>
                <div className="text-[10px] text-slate-400">Overlays viewer's OMNI DID on video feed to prevent leaks</div>
              </div>
              <input
                type="checkbox"
                checked={policies.watermarkVideoFeed}
                onChange={e => setPolicies({ ...policies, watermarkVideoFeed: e.target.checked })}
                className="rounded border-slate-800 text-indigo-600 focus:ring-0"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">AI Real-Time Voice Transcription & CRM Sync</div>
                <div className="text-[10px] text-slate-400">Allows automatic speech translation and deal pipeline updates</div>
              </div>
              <input
                type="checkbox"
                checked={policies.allowAiTranscription}
                onChange={e => setPolicies({ ...policies, allowAiTranscription: e.target.checked })}
                className="rounded border-slate-800 text-indigo-600 focus:ring-0"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {saveSuccess ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Policies updated successfully!
              </span>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
              >
                Enforce Policies
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
