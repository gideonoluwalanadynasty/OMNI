import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  UserX,
  Lock,
  Eye,
  Bot
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniModerationAiScanItem } from '../../../types/omni_social_ai';

export const OmniAiModerationView: React.FC = () => {
  const [scans, setScans] = useState<OmniModerationAiScanItem[]>(omniSocialAiEngine.getModerationScans());
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAction = (id: string, action: 'approved_clean' | 'confirmed_violation') => {
    omniSocialAiEngine.handleModerationAction(id, action);
    setScans([...omniSocialAiEngine.getModerationScans()]);
    setToastMsg(
      action === 'approved_clean'
        ? 'Content approved as clean and restored to public feed.'
        : 'Violation confirmed! Account penalized and content permanently purged.'
    );
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-700 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI AI Moderation & Trust Shield</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                  Proactive Safety Guard
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Automated detection of spam botnets, scam links, harassment & fake account patterns with human-in-the-loop review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">AI Safety Filter Latency</div>
              <div className="text-lg font-bold text-emerald-400">&lt; 34ms</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">False Positive Rate</div>
              <div className="text-lg font-bold text-white">&lt; 0.02%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Queue List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Quarantined Content & Flagged Inbound Items</h3>
          </div>
          <span className="text-xs text-slate-400">
            {scans.filter(s => s.humanReviewStatus === 'pending').length} Items Pending Review
          </span>
        </div>

        <div className="space-y-4">
          {scans.map(scan => (
            <div
              key={scan.id}
              className={`p-5 rounded-xl border transition-all ${
                scan.humanReviewStatus === 'confirmed_violation'
                  ? 'bg-rose-950/10 border-rose-900/40 opacity-50'
                  : scan.humanReviewStatus === 'approved_clean'
                  ? 'bg-emerald-950/10 border-emerald-900/40 opacity-70'
                  : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <img src={scan.authorAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{scan.authorName}</span>
                      <span className="text-xs text-slate-400">{scan.authorHandle}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-rose-500/20 text-rose-300 font-bold uppercase rounded">
                        {scan.flagReason.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>Type: {scan.contentType}</span>
                      <span>•</span>
                      <span>Scanned {scan.timestamp}</span>
                      <span>•</span>
                      <span className="text-rose-400 font-bold">Bot Probability: {scan.botProbabilityScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                      scan.humanReviewStatus === 'pending'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : scan.humanReviewStatus === 'approved_clean'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    Status: {scan.humanReviewStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Snippet */}
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200 font-mono mb-4">
                "{scan.contentSnippet}"
              </div>

              {/* Action Buttons for Human Review */}
              {scan.humanReviewStatus === 'pending' && (
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-700">
                  <button
                    onClick={() => handleAction(scan.id, 'approved_clean')}
                    className="px-4 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Approve (False Alarm)
                  </button>
                  <button
                    onClick={() => handleAction(scan.id, 'confirmed_violation')}
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Confirm Violation & Quarantine
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
