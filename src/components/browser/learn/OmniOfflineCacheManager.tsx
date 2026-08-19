import React, { useState } from 'react';
import {
  WifiOff,
  Wifi,
  HardDrive,
  Download,
  Trash2,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowLeft,
  FileCheck,
  ServerCrash,
  Sparkles
} from 'lucide-react';
import { OfflineCachePackage } from '../../../types/play_learn_ecosystem';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';

interface OmniOfflineCacheManagerProps {
  onBack: () => void;
}

export const OmniOfflineCacheManager: React.FC<OmniOfflineCacheManagerProps> = ({ onBack }) => {
  const [packages, setPackages] = useState<OfflineCachePackage[]>(
    omniPlayLearnService.getOfflinePackages()
  );
  const [isOfflineActive, setIsOfflineActive] = useState<boolean>(
    omniPlayLearnService.isOfflineModeActive()
  );
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const usedMb = omniPlayLearnService.getTotalOfflineStorageUsedMb();
  const maxStorageMb = 5120; // 5 GB quota
  const storagePercentage = Math.round((usedMb / maxStorageMb) * 100);

  const handleToggleOfflineMode = () => {
    const next = !isOfflineActive;
    setIsOfflineActive(next);
    omniPlayLearnService.setOfflineModeActive(next);
  };

  const handleDownloadPackage = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      omniPlayLearnService.downloadPackage(id);
      setPackages([...omniPlayLearnService.getOfflinePackages()]);
      setSyncingId(null);
    }, 1000);
  };

  const handleDeletePackage = (id: string) => {
    omniPlayLearnService.deleteOfflinePackage(id);
    setPackages([...omniPlayLearnService.getOfflinePackages()]);
  };

  return (
    <div id="omni-offline-cache-manager" className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-indigo-400" />
                <span>Sovereign Offline Architecture & Enclave Cache</span>
              </h1>
              <p className="text-xs text-stone-400">
                Manage local air-gapped content packs, cryptographic integrity, and zero-telemetry offline storage
              </p>
            </div>
          </div>

          {/* Air-Gapped Toggle */}
          <div className="flex items-center gap-3 bg-stone-900 px-4 py-2 rounded-2xl border border-stone-800">
            <span className="text-xs font-bold text-stone-300">
              {isOfflineActive ? 'Air-Gapped Mode: ON' : 'Online Sync: Active'}
            </span>
            <button
              onClick={handleToggleOfflineMode}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                isOfflineActive ? 'bg-indigo-600' : 'bg-stone-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  isOfflineActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Air-Gapped Mode Notification */}
        {isOfflineActive && (
          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/50 flex items-center gap-3 text-xs text-indigo-200 shadow-xl">
            <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <strong className="text-white block font-bold">100% Air-Gapped Sandbox Active</strong>
              All courses, interactive games, and cryptographic quizzes are executing from local offline memory blocks. Zero telemetry requests are emitted.
            </div>
          </div>
        )}

        {/* Storage Usage Card */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-bold text-stone-100">Local Enclave Storage Quota</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {usedMb.toFixed(1)} MB / {(maxStorageMb / 1024).toFixed(0)} GB ({storagePercentage}%)
            </span>
          </div>

          <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden border border-stone-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${Math.max(4, storagePercentage)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span>Encrypted IndexedDB & Local Blob Storage</span>
            <span>SHA-256 Cryptographic Parity Guaranteed</span>
          </div>
        </div>

        {/* Packages List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-stone-200 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Cached Courses, Game Engines & Model Weights</span>
          </h2>

          <div className="space-y-3">
            {packages.map((pkg) => {
              const isDownloaded = pkg.status === 'downloaded';
              const isSyncing = syncingId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-4 shadow-md"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-stone-100 truncate">{pkg.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-stone-950 text-indigo-300 border border-stone-800 text-[10px] font-mono">
                        v{pkg.version}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span className="font-mono text-stone-300">{pkg.sizeMb} MB</span>
                      <span>•</span>
                      <span>Last synced: {pkg.lastSynced}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400 truncate max-w-[200px]">
                        {pkg.integrityChecksum}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDownloaded ? (
                      <>
                        <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold px-3 py-1 bg-emerald-950/60 rounded-xl border border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Ready</span>
                        </div>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-2 rounded-xl text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                          title="Purge Local Cache"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDownloadPackage(pkg.id)}
                        disabled={isSyncing}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        {isSyncing ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>{isSyncing ? 'Syncing...' : 'Cache Offline'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
