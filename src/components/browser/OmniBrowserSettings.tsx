import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Search,
  Globe,
  Sliders,
  CheckCircle2,
  Trash2,
  RotateCcw,
  Sparkles,
  Server,
  Layers,
  Key
} from 'lucide-react';
import {
  OmniBrowserSettings as BrowserSettingsType,
  OmniBrowserSearchEngine
} from '../../types';

interface OmniBrowserSettingsProps {
  settings: BrowserSettingsType;
  searchEngines: OmniBrowserSearchEngine[];
  onUpdateSettings: (settings: Partial<BrowserSettingsType>) => void;
  onClearBrowsingData: () => void;
  onClose: () => void;
}

export const OmniBrowserSettings: React.FC<OmniBrowserSettingsProps> = ({
  settings,
  searchEngines,
  onUpdateSettings,
  onClearBrowsingData,
  onClose
}) => {
  const [dataCleared, setDataCleared] = useState(false);

  const handleClear = () => {
    onClearBrowsingData();
    setDataCleared(true);
    setTimeout(() => setDataCleared(false), 2500);
  };

  return (
    <div
      id="browser-settings-view"
      className="flex-1 overflow-y-auto bg-stone-950 text-stone-100 p-6 md:p-8 select-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Settings className="w-4 h-4" />
              <span>OMNI Browser Configuration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-100">Preferences & System Settings</h1>
            <p className="text-xs text-stone-400">Manage search engines, privacy isolation levels, and sovereign sync credentials.</p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Back to Browser
          </button>
        </div>

        {/* 1. SEARCH ENGINE PREFERENCE */}
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <div className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-400" />
            <span>Default Search Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {searchEngines.map(engine => (
              <div
                key={engine.id}
                onClick={() => onUpdateSettings({ defaultSearchEngineId: engine.id })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  settings.defaultSearchEngineId === engine.id
                    ? 'bg-indigo-950/70 border-indigo-600 text-white shadow-md'
                    : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-stone-200">{engine.name}</div>
                  {engine.isAiGrounded && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-900 text-indigo-300 font-mono">
                      AI
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-stone-500 font-mono truncate mt-1">
                  Prefix: {engine.keyword}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. STARTUP & TAB BEHAVIOR */}
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <div className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>On Startup & Session Restoration</span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'home', label: 'Open Sovereign Home Dashboard' },
              { id: 'restore', label: 'Restore previous workspace tabs & sessions' },
              { id: 'blank', label: 'Open blank isolated container' }
            ].map(opt => (
              <label
                key={opt.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 cursor-pointer hover:bg-stone-800/50"
              >
                <input
                  type="radio"
                  name="startupBehavior"
                  checked={settings.startupBehavior === opt.id}
                  onChange={() => onUpdateSettings({ startupBehavior: opt.id as any })}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-stone-200">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. PRIVACY & TELEMETRY CONTROLS */}
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <div className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Telemetry & Sovereign Sync</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-stone-950/60 border border-stone-800 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-stone-200">Zero-Knowledge Cloud Sync</div>
                <div className="text-[11px] text-stone-400">End-to-end encrypt tabs, history & bookmarks with OMNI Passport</div>
              </div>
              <button
                onClick={() => onUpdateSettings({ cloudSyncEnabled: !settings.cloudSyncEnabled })}
                className={`w-10 h-6 rounded-full p-1 transition-colors ${
                  settings.cloudSyncEnabled ? 'bg-emerald-600' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.cloudSyncEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-stone-950/60 border border-stone-800 rounded-xl">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-stone-200">AI Prompt Zero-Retention Policy</div>
                <div className="text-[11px] text-stone-400">Ensure webpage contexts sent to AI Copilot are purged immediately</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
                Enforced by Architecture
              </span>
            </div>
          </div>
        </div>

        {/* 4. CLEAR BROWSING DATA */}
        <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-4">
          <div className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Clear Browsing & Cache Data</span>
          </div>
          <p className="text-xs text-stone-400">
            Purge cookies, session storage, cached scripts, and browsing history across all workspace containers.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-200 rounded-xl text-xs font-semibold transition-colors"
            >
              Clear All Browsing Data
            </button>
            {dataCleared && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>All local caches and cookies securely cleared!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
