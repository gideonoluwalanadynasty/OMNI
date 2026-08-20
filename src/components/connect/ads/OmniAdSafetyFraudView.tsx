import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  UserX,
  RefreshCw,
  Search,
  Filter,
  Brain
} from 'lucide-react';
import { AdSafetyReviewItem, UserAdReport } from '../../../types/omni_ads';
import { SEED_AD_SAFETY_REVIEWS, SEED_USER_AD_REPORTS } from '../../../data/omni_ads_seed';

export const OmniAdSafetyFraudView: React.FC = () => {
  const [reviews, setReviews] = useState<AdSafetyReviewItem[]>(SEED_AD_SAFETY_REVIEWS);
  const [reports, setReports] = useState<UserAdReport[]>(SEED_USER_AD_REPORTS);
  const [activeTab, setActiveTab] = useState<'policy_queue' | 'fraud_radar' | 'user_reports'>('policy_queue');

  const handleApproveAd = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, policyStatus: 'passed', policyViolations: [] } : r));
  };

  const handleRejectAd = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, policyStatus: 'rejected' } : r));
  };

  const handleDismissReport = (id: string) => {
    setReports(prev => prev.map(rep => rep.id === id ? { ...rep, status: 'dismissed' } : rep));
  };

  const handleActionReport = (id: string) => {
    setReports(prev => prev.map(rep => rep.id === id ? { ...rep, status: 'ad_removed' } : rep));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              OMNI Trust, Safety & Anti-Fraud Center
            </div>
            <h2 className="text-2xl font-black text-white">Ad Policy Compliance & Invalid Traffic Defense</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time Gemini 2.5 safety auditing, misleading claim detection, bot click filtration, and community reporting resolution.
            </p>
          </div>

          {/* Sub Tab Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('policy_queue')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'policy_queue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Policy Queue ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('fraud_radar')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'fraud_radar' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              IVT Fraud Radar
            </button>
            <button
              onClick={() => setActiveTab('user_reports')}
              className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
                activeTab === 'user_reports' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              User Reports ({reports.filter(r => r.status === 'pending').length})
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: POLICY REVIEW QUEUE */}
      {activeTab === 'policy_queue' && (
        <div className="space-y-4">
          <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/80">
            {reviews.map(item => (
              <div key={item.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="flex items-start gap-4">
                  <img src={item.mediaUrl} alt="" className="w-20 h-20 object-cover rounded-xl border border-slate-800 shrink-0" />
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white">{item.creativeHeadline}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.policyStatus === 'passed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : item.policyStatus === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.policyStatus}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Score: {item.policyCheckScore}/100</span>
                    </div>

                    <div className="text-xs text-slate-400">
                      Campaign: <strong className="text-slate-300">{item.campaignName}</strong> • Adv: <strong className="text-slate-300">{item.advertiserName}</strong>
                    </div>

                    {item.policyViolations.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.policyViolations.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 bg-rose-950/60 text-rose-300 text-[10px] font-bold rounded border border-rose-500/30">
                            ⚠ {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                  <button
                    onClick={() => handleRejectAd(item.id)}
                    className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold rounded-lg border border-rose-500/30 flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject Ad
                  </button>
                  <button
                    onClick={() => handleApproveAd(item.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: IVT FRAUD RADAR */}
      {activeTab === 'fraud_radar' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400">Click Farm Detection</div>
            <div className="text-2xl font-black text-emerald-400">99.8% Filtered</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated behavioral timing heuristics identify repeated clicks occurring under 250ms interval from single subnet ranges.
            </p>
          </div>

          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400">Impression Stacking Shield</div>
            <div className="text-2xl font-black text-white">Active (Zero-Tolerance)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prevents hidden 1x1 iframes and stacked ad impressions across publisher sites using WebGPU viewability shaders.
            </p>
          </div>

          <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400">Advertiser Auto-Credit</div>
            <div className="text-2xl font-black text-indigo-300">100% Zero Cost</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Any click flagged as suspicious or non-human is automatically excluded from the advertiser's billing ledger before invoice generation.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: USER REPORTS */}
      {activeTab === 'user_reports' && (
        <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/80">
          {reports.map(rep => (
            <div key={rep.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white uppercase">{rep.reason}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rep.status === 'ad_removed' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {rep.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">"{rep.comment || 'No comment provided'}"</p>
                <div className="text-[10px] text-slate-500">Reported at: {rep.reportedAt}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDismissReport(rep.id)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => handleActionReport(rep.id)}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Takedown Ad
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
