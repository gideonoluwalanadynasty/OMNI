import React, { useState } from 'react';
import {
  Network,
  AlertTriangle,
  Send,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle,
  TrendingDown,
  Award,
  MessageSquare,
  Mail,
  Video,
  ArrowUpRight
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniRelationshipHealthAlert, OmniRelationshipMilestone } from '../../../types/omni_social_ai';

export const OmniRelationshipAiView: React.FC = () => {
  const [alerts, setAlerts] = useState<OmniRelationshipHealthAlert[]>(omniSocialAiEngine.getRelationshipAlerts());
  const [milestones, setMilestones] = useState<OmniRelationshipMilestone[]>(omniSocialAiEngine.getRelationshipMilestones());
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [customDraft, setCustomDraft] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSendAction = (alert: OmniRelationshipHealthAlert) => {
    omniSocialAiEngine.recordContactInteraction(alert.id);
    setAlerts([...omniSocialAiEngine.getRelationshipAlerts()]);
    setSuccessToast(`Follow-up sent to ${alert.contactName} via ${alert.suggestedAction.channel}. Relationship strength restored (+25%)!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleSaveDraft = (alertId: string) => {
    if (!customDraft.trim()) return;
    omniSocialAiEngine.updateDraftMessage(alertId, customDraft);
    setAlerts([...omniSocialAiEngine.getRelationshipAlerts()]);
    setEditingAlertId(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {successToast}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Relationship Assistant</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                  Neural Graph Intelligence
                </span>
              </div>
              <p className="text-sm text-slate-400">Identifies relationship latency, computes decay velocity, and drafts high-touch follow-ups</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Graph Contacts Monitored</div>
              <div className="text-lg font-bold text-white">450 Verified Nodes</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-rose-400">At-Risk Relationships</div>
              <div className="text-lg font-bold text-rose-300">{alerts.filter(a => a.decayRisk === 'critical').length} Critical</div>
            </div>
          </div>
        </div>
      </div>

      {/* Relationship Health & Decay Alerts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-base font-bold text-white">Relationship Decay Alerts & Follow-up Triggers</h3>
              <p className="text-xs text-slate-400">Contacts exceeding communication latency thresholds (e.g. 60+ days without interaction)</p>
            </div>
          </div>
          <span className="text-xs text-slate-400">Dynamic AI Pacing</span>
        </div>

        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border transition-all ${
                alert.decayRisk === 'critical'
                  ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/70'
                  : alert.decayRisk === 'moderate'
                  ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70'
                  : 'bg-slate-800/50 border-slate-700/60'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img src={alert.contactAvatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{alert.contactName}</h4>
                      <span className="text-xs text-slate-400">{alert.contactHandle}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {alert.relationshipType}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="text-rose-400 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> {alert.daysSinceLastContact} days since last contact
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">Last interacted: {alert.lastInteractionDate}</span>
                    </div>
                  </div>
                </div>

                {/* Strength Gauge Bar */}
                <div className="w-full lg:w-48 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-slate-400">Strength Score</span>
                    <span className={alert.relationshipStrength < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                      {alert.relationshipStrength}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        alert.relationshipStrength < 50 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${alert.relationshipStrength}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* AI Draft Suggestion Box */}
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5" /> AI-Generated Contextual Follow-up Draft
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    {alert.suggestedAction.channel === 'omni_chat' ? <MessageSquare className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                    Target Channel: {alert.suggestedAction.channel}
                  </span>
                </div>

                {editingAlertId === alert.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={customDraft}
                      onChange={e => setCustomDraft(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-500 rounded p-2 text-xs text-white focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingAlertId(null)}
                        className="px-2.5 py-1 bg-slate-800 text-xs text-slate-300 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveDraft(alert.id)}
                        className="px-2.5 py-1 bg-indigo-600 text-xs text-white font-bold rounded"
                      >
                        Save Draft
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-300 italic mb-2">"{alert.suggestedAction.draftBody}"</p>
                )}

                {/* Key Context Notes */}
                <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-800/80">
                  {alert.keyNotes.map((note, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800">
                      • {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setEditingAlertId(alert.id);
                    setCustomDraft(alert.suggestedAction.draftBody);
                  }}
                  className="text-xs text-slate-400 hover:text-indigo-300 font-semibold"
                >
                  Edit Message Draft
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSendAction(alert)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> 1-Click Send Follow-Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Relationship Milestones */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Upcoming Milestones & Celebration Opportunities</h3>
            <p className="text-xs text-slate-400">Never miss an executive promotion, birthday, or closed funding milestone</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map(mls => (
            <div key={mls.id} className="p-4 bg-slate-800/70 border border-slate-700 rounded-xl flex items-start gap-3">
              <img src={mls.contactAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-white">{mls.contactName}</h4>
                  <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded">
                    {mls.milestoneDate}
                  </span>
                </div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">
                  {mls.milestoneType.replace('_', ' ')}
                </div>
                <p className="text-xs text-slate-300 italic p-2 bg-slate-900 rounded border border-slate-800">
                  "{mls.suggestedGreeting}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
