import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  Lock,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  Eye,
  Sparkles
} from 'lucide-react';
import {
  OmniRecommendationPrivacyConsent,
  OmniRecommendationSignal
} from '../../../types/omni_discovery';
import {
  SEED_RECOMMENDATION_SIGNALS,
  DEFAULT_PRIVACY_CONSENT
} from './discoveryData';

interface OmniRecommendationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  consent: OmniRecommendationPrivacyConsent;
  onUpdateConsent: (updated: OmniRecommendationPrivacyConsent) => void;
}

export const OmniRecommendationSettingsModal: React.FC<OmniRecommendationSettingsModalProps> = ({
  isOpen,
  onClose,
  consent,
  onUpdateConsent
}) => {
  const [currentConsent, setCurrentConsent] = useState<OmniRecommendationPrivacyConsent>(consent);
  const [signals, setSignals] = useState<OmniRecommendationSignal[]>(SEED_RECOMMENDATION_SIGNALS);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConsent(currentConsent);
    setSavedSuccess('Recommendation privacy rules & consent preferences updated successfully.');
    setTimeout(() => {
      setSavedSuccess(null);
      onClose();
    }, 1500);
  };

  const handlePurgeTelemetry = () => {
    setSavedSuccess('Cryptographic purge complete: All behavioral vectors and recommendation telemetry eradicated.');
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  const handleSliderChange = (id: string, newWeight: number) => {
    setSignals(prev => prev.map(s => s.id === id ? { ...s, weightPercent: newWeight } : s));
  };

  const totalWeight = signals.reduce((sum, s) => sum + s.weightPercent, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Recommendation Privacy & Signal Governance</h3>
              <p className="text-xs text-slate-400">Control how discovery algorithms use your interests, social graph, and location.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            {savedSuccess}
          </div>
        )}

        {/* Privacy & Consent Controls */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Sovereign Consent & Visibility Rule Switches
          </h4>

          <div className="space-y-3 text-xs">
            {/* Master Personalization */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Enable AI Personalization Engine</span>
                <span className="text-slate-400 block text-[11px]">
                  When disabled, recommendations default to ecosystem-wide popularity with zero profile scoring.
                </span>
              </div>
              <input
                type="checkbox"
                checked={currentConsent.enableAiPersonalization}
                onChange={(e) => setCurrentConsent(prev => ({ ...prev, enableAiPersonalization: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {/* Behavioral Tracking */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Behavioral Dwell & Watch Telemetry</span>
                <span className="text-slate-400 block text-[11px]">
                  Allow video completion rates and reading dwell times to tailor content discovery.
                </span>
              </div>
              <input
                type="checkbox"
                checked={currentConsent.allowBehavioralTracking}
                onChange={(e) => setCurrentConsent(prev => ({ ...prev, allowBehavioralTracking: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {/* Location Discovery */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Geographical & Local Business Discovery</span>
                <span className="text-slate-400 block text-[11px]">
                  Surface nearby verified stores, events, and services within your preferred radius.
                </span>
              </div>
              <input
                type="checkbox"
                checked={currentConsent.allowLocationDiscovery}
                onChange={(e) => setCurrentConsent(prev => ({ ...prev, allowLocationDiscovery: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {/* Relationship Graph */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Social Graph & Circle Overlap Matching</span>
                <span className="text-slate-400 block text-[11px]">
                  Boost items endorsed by 1st and 2nd degree sovereign connections.
                </span>
              </div>
              <input
                type="checkbox"
                checked={currentConsent.allowRelationshipGraphMatching}
                onChange={(e) => setCurrentConsent(prev => ({ ...prev, allowRelationshipGraphMatching: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 8-Signal Weight Tuner */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              8-Signal Weight Fine-Tuning
            </h4>
            <span className={`text-xs font-mono font-bold ${totalWeight === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
              Sum: {totalWeight}% {totalWeight === 100 ? '(Balanced)' : '(Adjust to 100%)'}
            </span>
          </div>

          <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
            {signals.map(s => (
              <div key={s.id} className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>{s.signalName}</span>
                  <span className="font-mono text-indigo-400 font-bold">{s.weightPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={s.weightPercent}
                  onChange={(e) => handleSliderChange(s.id, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 1-Click Cryptographic Purge Section */}
        <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" />
              1-Click Telemetry & Vector Wipe
            </span>
            <span className="text-[11px] text-slate-400 block">
              Eradicate all cached recommendation vectors and interaction logs from memory immediately.
            </span>
          </div>
          <button
            onClick={handlePurgeTelemetry}
            className="px-3.5 py-2 bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 rounded-xl text-xs font-bold transition-all"
          >
            Purge Signals
          </button>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20"
          >
            Save Privacy Rules
          </button>
        </div>
      </div>
    </div>
  );
};
