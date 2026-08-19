import React, { useState } from 'react';
import {
  RefreshCw,
  Lock,
  ShieldCheck,
  Key,
  HardDrive,
  CheckCircle2,
  Clock,
  Laptop,
  Smartphone,
  Sliders,
  Sparkles,
  Layers,
  Bookmark,
  BookOpen,
  Puzzle,
  Settings
} from 'lucide-react';
import {
  OmniBrowserSyncConfig,
  OmniBrowserSyncPayload,
  OMNIState
} from '../../../types';
import { encryptedSyncService } from '../../../sdk/browser-services/EncryptedSyncService';

interface EncryptedSyncDrawerProps {
  syncConfig: OmniBrowserSyncConfig;
  syncPayloads: OmniBrowserSyncPayload[];
  fullState: OMNIState;
  onUpdateSyncConfig: (config: OmniBrowserSyncConfig) => void;
  onAddSyncPayload: (payload: OmniBrowserSyncPayload, newConfig: OmniBrowserSyncConfig) => void;
}

export const EncryptedSyncDrawer: React.FC<EncryptedSyncDrawerProps> = ({
  syncConfig,
  syncPayloads,
  fullState,
  onUpdateSyncConfig,
  onAddSyncPayload
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showPassphraseModal, setShowPassphraseModal] = useState(false);
  const [newPassphraseInput, setNewPassphraseInput] = useState('');

  const handleToggleOption = (key: keyof OmniBrowserSyncConfig) => {
    const updated = {
      ...syncConfig,
      [key]: !syncConfig[key]
    };
    onUpdateSyncConfig(updated);
  };

  const handleExecuteSyncNow = async () => {
    setIsSyncing(true);
    try {
      await new Promise(r => setTimeout(r, 650));
      const { updatedConfig, newPayload } = await encryptedSyncService.executeSync(
        fullState,
        syncConfig.primaryDeviceId,
        'MacBook Pro 16" (Gideon Sovereign Enclave)'
      );
      onAddSyncPayload(newPayload, updatedConfig);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div id="encrypted-sync-drawer" className="space-y-4 text-stone-100">
      {/* 1. Sync Health & Live Status Card */}
      <div className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-100 flex items-center gap-1.5">
                <span>Zero-Knowledge Encrypted Sync</span>
                <span className="px-1.5 py-0.2 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded text-[9px] font-mono">
                  AES-GCM-256
                </span>
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">
                Last sync: {new Date(syncConfig.lastSyncTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          <button
            id="btn-trigger-manual-sync"
            onClick={handleExecuteSyncNow}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        {/* Cryptographic Key Fingerprint */}
        <div className="p-2.5 bg-stone-900/90 border border-stone-800 rounded-lg space-y-1 text-xs">
          <div className="flex items-center justify-between text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <Key className="w-3 h-3 text-amber-400" />
              <span>Passphrase Enclave Fingerprint</span>
            </span>
            <span className="font-mono text-indigo-400">PBKDF2-SHA256</span>
          </div>
          <div className="font-mono text-[10px] text-stone-300 truncate bg-stone-950 px-2 py-1 rounded border border-stone-800">
            {syncConfig.passphraseHash}
          </div>
        </div>
      </div>

      {/* 2. Granular Sync Item Toggles (User Controls What Syncs) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1 flex items-center justify-between">
          <span>Sovereign Sync Control Matrix</span>
          <span className="text-[10px] text-stone-500 font-mono">User-Controlled</span>
        </div>

        <div className="p-1 bg-stone-950 border border-stone-800 rounded-xl divide-y divide-stone-800/80">
          {/* Tabs */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-indigo-400" />
              <div>
                <div className="font-medium text-stone-200">Open Tabs & Tab Groups</div>
                <div className="text-[10px] text-stone-500">Cross-device tab state restoration</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncTabs')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncTabs ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncTabs ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Bookmarks */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="font-medium text-stone-200">Bookmarks & Folders</div>
                <div className="text-[10px] text-stone-500">Encrypted bookmarks and AI tags</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncBookmarks')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncBookmarks ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncBookmarks ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* History */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <div className="font-medium text-stone-200">Browsing History</div>
                <div className="text-[10px] text-stone-500">Zero-telemetry encrypted history log</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncHistory')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncHistory ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncHistory ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reading List */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <div className="font-medium text-stone-200">Reading List & AI Notes</div>
                <div className="text-[10px] text-stone-500">Offline articles & executive summaries</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncReadingList')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncReadingList ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncReadingList ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Workspaces & Projects */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <div>
                <div className="font-medium text-stone-200">Workspaces & Project Spaces</div>
                <div className="text-[10px] text-stone-500">Cryptographic container partitions</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncWorkspaces')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncWorkspaces ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncWorkspaces ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Extensions */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Puzzle className="w-3.5 h-3.5 text-rose-400" />
              <div>
                <div className="font-medium text-stone-200">Browser Extensions</div>
                <div className="text-[10px] text-stone-500">Installed extensions & configurations</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncExtensions')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncExtensions ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncExtensions ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Preferences */}
          <div className="flex items-center justify-between p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-stone-400" />
              <div>
                <div className="font-medium text-stone-200">Preferences & Shield Policies</div>
                <div className="text-[10px] text-stone-500">DoH, VPN, and anti-telemetry rules</div>
              </div>
            </div>
            <button
              onClick={() => handleToggleOption('syncSettings')}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                syncConfig.syncSettings ? 'bg-indigo-600' : 'bg-stone-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  syncConfig.syncSettings ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Encrypted Payload Ledger (Vector Clocks) */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-400 px-1">Recent Encrypted Sync Ledger</div>
        <div className="space-y-1.5">
          {syncPayloads.slice(0, 4).map(payload => (
            <div
              key={payload.id}
              className="p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-stone-200">{payload.deviceName}</span>
                <span className="text-[10px] font-mono text-indigo-400">Clock #{payload.vectorClock}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                <span>{(payload.encryptedBlobLength / 1024).toFixed(1)} KB Encrypted</span>
                <span>{new Date(payload.syncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
