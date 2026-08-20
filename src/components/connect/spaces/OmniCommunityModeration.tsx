import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  UserX,
  Lock,
  Eye,
  Sliders,
  FileText,
  Sparkles,
  Search,
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import { OmniCommunityReport, ModerationActionType } from '../../../types/omni_spaces';
import { SEED_COMMUNITY_REPORTS } from '../../../data/omni_spaces_seed';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  activeProfile: ConnectProfile;
}

export const OmniCommunityModeration: React.FC<Props> = ({ activeProfile }) => {
  const [reports, setReports] = useState<OmniCommunityReport[]>(SEED_COMMUNITY_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string>(SEED_COMMUNITY_REPORTS[0]?.id || '');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Selected report
  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const filteredReports = reports.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const handleTakeAction = (action: ModerationActionType, notes: string) => {
    if (!selectedReport) return;
    setReports(prev => prev.map(r => {
      if (r.id === selectedReport.id) {
        return {
          ...r,
          status: 'resolved' as const,
          resolvedBy: activeProfile.displayName,
          resolutionAction: action,
          resolutionNotes: notes
        };
      }
      return r;
    }));

    setActionSuccessMsg(`Action "${action.toUpperCase()}" applied successfully to ${selectedReport.reportedProfileName}. Report #${selectedReport.id} marked as RESOLVED.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'medium':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div id="omni-community-moderation" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              COMMUNITY MODERATION & TRUST CENTER
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AI SAFETY PIPELINE ACTIVE
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Reports Triage, Member Restrictions & Audit Log
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Manage flagged content, enforce community covenants, mute/restrict disruptive members, and review automated AI safety risk scores across all Spaces, Groups, and Channels.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'pending', label: 'Pending (3)' },
            { id: 'reviewing', label: 'In Review' },
            { id: 'resolved', label: 'Resolved' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === f.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* 2-Column Moderation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Reports Queue (Col 5) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredReports.map(rep => {
            const isSelected = rep.id === selectedReportId;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReportId(rep.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-950/30 border-rose-500/80 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getSeverityBadge(rep.severity)}`}>
                        {rep.severity}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Target: <strong className="text-white">{rep.reportedProfileName}</strong>
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate capitalize">{rep.violation.replace('_', ' ')}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">"{rep.targetContentSnippet}"</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                      Risk: {rep.aiRiskScore}/100
                    </div>
                    <span className="text-[9px] text-slate-500 block mt-1 capitalize">{rep.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Report Detail & Actions (Col 7) */}
        {selectedReport && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400">Report #{selectedReport.id}</span>
                <h3 className="text-base font-extrabold text-white mt-0.5 capitalize">{selectedReport.violation.replace('_', ' ')}</h3>
                <p className="text-xs text-slate-400">Filed by {selectedReport.reporterName} • {new Date(selectedReport.createdAt).toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getSeverityBadge(selectedReport.severity)}`}>
                {selectedReport.severity} SEVERITY
              </span>
            </div>

            {/* AI Risk Analysis Callout */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  Gemini AI Risk Assessment
                </span>
                <span className="font-extrabold text-rose-400">{selectedReport.aiRiskScore} / 100 Risk Score</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suggested Action: <strong className="text-indigo-400 uppercase">{selectedReport.aiSuggestedAction.replace('_', ' ')}</strong>. Evaluated by Zero Data Retention (ZDR) safety classifier based on community covenant policies.
              </p>
            </div>

            {/* Flagged Content Excerpt */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reported Content Excerpt</label>
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono">
                "{selectedReport.targetContentSnippet}"
              </div>
            </div>

            {/* Action Buttons Matrix */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Enforcement Actions</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleTakeAction('warning', 'Issued formal covenant warning to member.')}
                  className="p-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors text-center"
                >
                  ⚠️ Warn User
                </button>
                <button
                  onClick={() => handleTakeAction('user_muted_24h', 'Muted member posting rights for 24 hours.')}
                  className="p-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-colors text-center"
                >
                  🔇 Mute 24h
                </button>
                <button
                  onClick={() => handleTakeAction('content_removed', 'Flagged content purged from network.')}
                  className="p-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors text-center"
                >
                  🗑️ Purge Content
                </button>
                <button
                  onClick={() => handleTakeAction('user_banned', 'Permanent network eviction.')}
                  className="p-2.5 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors text-center"
                >
                  🚫 Ban Member
                </button>
              </div>
            </div>

            {selectedReport.status === 'resolved' && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                ✓ Report Resolved by <strong>{selectedReport.resolvedBy}</strong> with action: <strong>{selectedReport.resolutionAction?.toUpperCase()}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
