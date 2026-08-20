import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Trash2,
  CheckCircle,
  EyeOff,
  Database,
  Cpu,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniAiPrivacyConfig } from '../../../types/omni_social_ai';

export const OmniAiPrivacyControlView: React.FC = () => {
  const [config, setConfig] = useState<OmniAiPrivacyConfig>(omniSocialAiEngine.getPrivacyConfig());
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleToggle = (key: keyof OmniAiPrivacyConfig) => {
    const updatedVal = !config[key];
    omniSocialAiEngine.updatePrivacyConfig({ [key]: updatedVal });
    setConfig({ ...omniSocialAiEngine.getPrivacyConfig() });
    setToastMsg(`Privacy Policy updated: ${String(key)} is now ${updatedVal ? 'ENABLED' : 'DISABLED'}.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePurgeMemory = () => {
    if (window.confirm('Are you sure you want to completely erase all AI memory embeddings? This cannot be undone.')) {
      omniSocialAiEngine.purgeAllAiMemory();
      setConfig({ ...omniSocialAiEngine.getPrivacyConfig() });
      setToastMsg('All episodic memory vectors and conversational history have been permanently purged!');
      setTimeout(() => setToastMsg(null), 4000);
    }
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI AI Privacy & Memory Controls</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Zero-Leakage Sovereignty
                </span>
              </div>
              <p className="text-sm text-slate-400">Granular toggles over AI access, memory retention, semantic personalization & data usage</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Stored Memory Vectors</div>
              <div className="text-lg font-bold text-white">{config.totalMemoriesStored} Items</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-400">Model Training Status</div>
              <div className="text-sm font-bold text-emerald-300">Strictly Isolated (0% Used)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Control Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Memory & Personalization Switches */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Memory & Context Controls</h3>

          {/* Switch 1: AI Assistance Enabled */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg">
            <div>
              <div className="text-xs font-bold text-white">Master AI Assistance</div>
              <div className="text-[11px] text-slate-400">Enables all 7 specialized agents across OMNI Connect</div>
            </div>
            <button
              onClick={() => handleToggle('aiAssistanceEnabled')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                config.aiAssistanceEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.aiAssistanceEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Switch 2: Episodic Memory */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg">
            <div>
              <div className="text-xs font-bold text-white">Episodic Memory Storage</div>
              <div className="text-[11px] text-slate-400">Allows AI to remember past interactions and preferences</div>
            </div>
            <button
              onClick={() => handleToggle('episodicMemoryEnabled')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                config.episodicMemoryEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.episodicMemoryEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Switch 3: Semantic Personalization */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg">
            <div>
              <div className="text-xs font-bold text-white">Semantic Personalization</div>
              <div className="text-[11px] text-slate-400">Tailors summaries and suggestions to your writing tone</div>
            </div>
            <button
              onClick={() => handleToggle('semanticPersonalization')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                config.semanticPersonalization ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.semanticPersonalization ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Data Usage & Redaction Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Data Protection & Redaction</h3>

          {/* Switch 4: Conversation Analysis */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg">
            <div>
              <div className="text-xs font-bold text-white">Conversation Intent Analysis</div>
              <div className="text-[11px] text-slate-400">Extracts follow-ups and unread action items</div>
            </div>
            <button
              onClick={() => handleToggle('conversationAnalysisAllowed')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                config.conversationAnalysisAllowed ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.conversationAnalysisAllowed ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Switch 5: Strict PII Masking */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/60 border border-slate-700 rounded-lg">
            <div>
              <div className="text-xs font-bold text-white">Strict PII & Financial Masking</div>
              <div className="text-[11px] text-slate-400">Auto-redacts credit cards, IBANs and phone numbers</div>
            </div>
            <button
              onClick={() => handleToggle('piiMaskingStrict')}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                config.piiMaskingStrict ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  config.piiMaskingStrict ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Switch 6: Zero Training Guarantee */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
            <div>
              <div className="text-xs font-bold text-emerald-300">Model Training Contribution</div>
              <div className="text-[11px] text-slate-400">Guaranteed OFF: Your private chats never train foundation models</div>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 rounded">
              LOCKED OFF
            </span>
          </div>
        </div>
      </div>

      {/* Cryptographic Memory Purge ("Forget Me") */}
      <div className="bg-rose-950/20 border border-rose-500/40 rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-300 font-bold text-base mb-1">
            <Trash2 className="w-5 h-5" /> Cryptographic Memory Wipe ("Forget Me")
          </div>
          <p className="text-xs text-slate-300">
            Permanently destroy all {config.totalMemoriesStored} vector embeddings, past conversation context keys, and personalized weights across all agents.
          </p>
          {config.lastMemoryWipeTimestamp && (
            <span className="text-[11px] text-slate-500 mt-1 block">
              Last wiped: {new Date(config.lastMemoryWipeTimestamp).toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handlePurgeMemory}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all shrink-0"
        >
          <Trash2 className="w-4 h-4" /> Purge All AI Memory
        </button>
      </div>
    </div>
  );
};
