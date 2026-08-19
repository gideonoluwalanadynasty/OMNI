import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  FileText,
  Search,
  Sliders,
  Terminal,
  RotateCcw,
  Flag
} from 'lucide-react';
import { OmniModerationReport, ContentScanResult } from '../../types/omni_social_engine';

interface Props {
  reports: OmniModerationReport[];
  onReviewReport: (reportId: string, action: 'approve' | 'quarantine' | 'delete' | 'warning', reviewerNote?: string) => void;
  onScanContent: (text: string) => ContentScanResult;
}

export const OmniModerationCenterView: React.FC<Props> = ({
  reports,
  onReviewReport,
  onScanContent
}) => {
  const [testInputText, setTestInputText] = useState(
    'Special crypto giveaway! Send 1 ETH to double your money in 10 minutes!'
  );
  const [scanResult, setScanResult] = useState<ContentScanResult | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'actioned' | 'dismissed'>('all');
  const [reviewerNote, setReviewerNote] = useState('');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const handleRunScan = () => {
    if (!testInputText.trim()) return;
    const res = onScanContent(testInputText.trim());
    setScanResult(res);
  };

  const filteredReports = reports.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const actionedReports = reports.filter(r => r.status === 'actioned').length;

  return (
    <div id="omni-moderation-center-view" className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            OMNI CONTENT SAFETY & TRUST PLATFORM
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Automated Moderation & Human Review Center</h2>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Real-time AI toxicity screening, multi-lingual spam filters, copyright verification, and decentralized community review queues keeping the sovereign network safe and compliant.
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold">Total Reports</span>
            <div className="text-xl font-bold text-white">{totalReports}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] text-amber-400 font-semibold">Pending Review</span>
            <div className="text-xl font-bold text-amber-300">{pendingReports}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] text-emerald-400 font-semibold">Actioned & Resolved</span>
            <div className="text-xl font-bold text-emerald-300">{actionedReports}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] text-indigo-400 font-semibold">AI Scan Latency</span>
            <div className="text-xl font-bold text-indigo-300">14 ms</div>
          </div>
        </div>
      </div>

      {/* Two Columns: Live AI Scanner Playground & Pending Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live AI Scanner Playground (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Live AI Content Scanner</h3>
            </div>
            <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
              Gemini Safety API
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Test any content snippet against our real-time multi-dimensional toxicity and spam classification model.
          </p>

          <div className="space-y-2">
            <textarea
              rows={4}
              value={testInputText}
              onChange={e => setTestInputText(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="Type or paste sample content here..."
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => setTestInputText('Honored to deliver the keynote on sovereign computing at OMNI Summit 2026!')}
                className="text-[11px] text-slate-400 hover:text-indigo-300 underline"
              >
                Load clean example
              </button>
              <button
                onClick={handleRunScan}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Run Safety Scan
              </button>
            </div>
          </div>

          {/* Scan Results Card */}
          {scanResult && (
            <div
              className={`rounded-2xl p-4 border space-y-3 ${
                scanResult.isSafe
                  ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="flex items-center gap-1.5">
                  {scanResult.isSafe ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  )}
                  {scanResult.isSafe ? 'Verdict: Content Clean' : 'Verdict: Safety Risk Flagged'}
                </span>
                <span className="font-mono text-[11px]">
                  Safety Score: {Math.round(scanResult.safetyScore * 100)}%
                </span>
              </div>

              <p className="text-xs text-slate-200">{scanResult.reason}</p>

              {/* Categorical Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Toxicity Index</span>
                  <span className="font-mono text-slate-200">{((scanResult.categories?.toxicity ?? scanResult.toxicityScore ?? 0) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Severe Harassment</span>
                  <span className="font-mono text-slate-200">{((scanResult.categories?.harassment ?? 0) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hate Speech</span>
                  <span className="font-mono text-slate-200">{((scanResult.categories?.hateSpeech ?? 0) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Spam / Scam Detection</span>
                  <span className="font-mono text-slate-200">{((scanResult.categories?.spam ?? 0) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="text-[11px] font-bold pt-1 uppercase tracking-wider text-slate-300">
                Action Recommendation: <span className="text-white">{scanResult.actionRecommendation}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Moderation Reports Queue (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
                <Flag className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Community Report Queue</h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['all', 'pending', 'actioned', 'dismissed'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-colors ${
                    filterStatus === tab
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>No moderation reports in this category. Queue is all clear!</p>
              </div>
            ) : (
              filteredReports.map(rep => (
                <div
                  key={rep.id}
                  className={`bg-slate-800/50 border rounded-2xl p-4 space-y-3 transition-all ${
                    selectedReportId === rep.id
                      ? 'border-indigo-500 bg-slate-800/80 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {rep.reason}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Target: {rep.targetType} ({rep.targetId})
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        Reported Author: {rep.reportedAuthorHandle}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Reporter: {rep.reporterHandle} • {new Date(rep.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                        rep.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : rep.status === 'actioned'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {rep.status}
                    </span>
                  </div>

                  {/* Snippet */}
                  <div className="bg-slate-900/80 rounded-xl p-2.5 text-xs text-slate-300 border border-slate-800 italic">
                    "{rep.snippet}"
                  </div>

                  {/* AI Safety Assessment */}
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>AI Confidence: <strong className="text-indigo-400">{(rep.aiConfidenceScore * 100).toFixed(0)}%</strong></span>
                    <span>Action Taken: <strong className="text-white">{rep.actionTaken || 'None yet'}</strong></span>
                  </div>

                  {/* Action Buttons for Pending */}
                  {rep.status === 'pending' && (
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => onReviewReport(rep.id, 'approve', 'Clean content')}
                        className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors"
                      >
                        ✓ Dismiss / Approve
                      </button>
                      <button
                        onClick={() => onReviewReport(rep.id, 'warning', 'Policy reminder sent to author')}
                        className="px-3 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors"
                      >
                        ⚠️ Issue Warning
                      </button>
                      <button
                        onClick={() => onReviewReport(rep.id, 'quarantine', 'Quarantined for policy violations')}
                        className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                      >
                        🚫 Quarantine Content
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
