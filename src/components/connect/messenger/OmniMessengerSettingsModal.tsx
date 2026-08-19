import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Laptop,
  Globe,
  Shield,
  ShieldAlert,
  Bot,
  Sliders,
  Trash2,
  CheckCircle2,
  Key,
  Database,
  Lock,
  Radio,
  FileText
} from 'lucide-react';
import {
  OmniMessengerDevice,
  OmniMessengerSettings,
  OmniMessengerAdminPolicies
} from '../../../types/omni_messenger';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  devices: OmniMessengerDevice[];
  settings: OmniMessengerSettings;
  adminPolicies: OmniMessengerAdminPolicies;
  onRevokeDevice: (deviceId: string) => void;
  onUpdateSettings: (newSettings: Partial<OmniMessengerSettings>) => void;
  onUpdateAdminPolicies: (newPolicies: Partial<OmniMessengerAdminPolicies>) => void;
}

export const OmniMessengerSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  devices,
  settings,
  adminPolicies,
  onRevokeDevice,
  onUpdateSettings,
  onUpdateAdminPolicies
}) => {
  const [activeTab, setActiveTab] = useState<'devices' | 'encryption' | 'ai' | 'admin'>('devices');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">OMNI Messenger Settings & Security</h3>
              <p className="text-xs text-slate-400">Multi-Device Mesh, E2EE Double Ratchet & Enterprise Governance</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-slate-800 pb-2">
          {[
            { id: 'devices', label: 'Linked Devices', icon: Laptop, count: devices.length },
            { id: 'encryption', label: 'E2EE & Keys', icon: Shield },
            { id: 'ai', label: 'AI Message Copilot', icon: Bot },
            { id: 'admin', label: 'Enterprise Policies', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="px-1.5 py-0.2 bg-slate-900 rounded-full text-[10px]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto space-y-4 py-2 text-xs">
          {/* Tab 1: Linked Devices */}
          {activeTab === 'devices' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-slate-300">
                  All messages sync across your authenticated sovereign devices using device-specific E2EE sessions.
                </p>
              </div>

              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                {devices.map(dev => (
                  <div key={dev.id} className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl">
                        {dev.deviceType === 'desktop' ? (
                          <Laptop className="w-5 h-5" />
                        ) : dev.deviceType === 'browser' ? (
                          <Globe className="w-5 h-5" />
                        ) : (
                          <Smartphone className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{dev.deviceName}</h4>
                          {dev.isCurrentDevice && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              THIS DEVICE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">
                          IP: {dev.ipAddress} • Last active: {new Date(dev.lastActiveAt).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono truncate max-w-xs">
                          Key: {dev.publicKeyFingerprint}
                        </p>
                      </div>
                    </div>

                    {!dev.isCurrentDevice && (
                      <button
                        onClick={() => onRevokeDevice(dev.id)}
                        className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: E2EE & Keys */}
          {activeTab === 'encryption' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-950/70 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  Signal Double-Ratchet Cryptography Core
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Every single message uses a unique ephemeral symmetric key generated via Diffie-Hellman ratchet step, preventing retrospective decryption even in case of root key compromise.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Post-Quantum Kyber-1024 Hybrid Ratchet</h5>
                    <p className="text-slate-400 text-[11px]">NIST-standardized lattice-based key exchange resistant to quantum computers.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.postQuantumKyberEnabled}
                    onChange={e => onUpdateSettings({ postQuantumKyberEnabled: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Sealed Sender (Metadata Minimization)</h5>
                    <p className="text-slate-400 text-[11px]">Hides sender identity from routing nodes; delivery certificates are signed via zero-knowledge proofs.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.sealedSenderEnabled}
                    onChange={e => onUpdateSettings({ sealedSenderEnabled: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Read Receipts & Presence Broadcasting</h5>
                    <p className="text-slate-400 text-[11px]">Share delivery ticks and online presence with verified contacts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.readReceipts}
                    onChange={e => onUpdateSettings({ readReceipts: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: AI Message Copilot */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Bot className="w-4 h-4" />
                  Client-Side Private AI Inference
                </div>
                <p className="text-slate-300 leading-relaxed">
                  AI suggestions and transcriptions are computed locally or through zero-data-retention sovereign nodes.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Contextual Smart Replies</h5>
                    <p className="text-slate-400 text-[11px]">Generate instant one-click replies based on conversational intent.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.aiSmartRepliesEnabled}
                    onChange={e => onUpdateSettings({ aiSmartRepliesEnabled: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Automatic Voice Note Speech-to-Text</h5>
                    <p className="text-slate-400 text-[11px]">Transcribe incoming voice notes into readable transcripts instantly.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.aiVoiceTranscriptionEnabled}
                    onChange={e => onUpdateSettings({ aiVoiceTranscriptionEnabled: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Automatic CRM Task & Deal Extraction</h5>
                    <p className="text-slate-400 text-[11px]">Identify commercial agreements and route them to OMNI CRM automatically.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.aiCrmActionExtraction}
                    onChange={e => onUpdateSettings({ aiCrmActionExtraction: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1.5">
                  <label className="block font-bold text-white">Default Target Translation Language</label>
                  <select
                    value={settings.aiAutoTranslateTargetLang}
                    onChange={e => onUpdateSettings({ aiAutoTranslateTargetLang: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="French">French (Français)</option>
                    <option value="German">German (Deutsch)</option>
                    <option value="Chinese">Chinese (Mandarin / 中文)</option>
                    <option value="Japanese">Japanese (日本語)</option>
                    <option value="Arabic">Arabic (العربية)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Enterprise Policies */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  Enterprise Compliance & Governance Policy
                </div>
                <p className="text-slate-300">
                  Organization-level data retention, Data Loss Prevention (DLP), and legal audit rules enforced by OMNI Passport permissions.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1.5">
                  <label className="block font-bold text-white">Corporate Message Retention (Days)</label>
                  <input
                    type="number"
                    value={adminPolicies.retentionDays}
                    onChange={e => onUpdateAdminPolicies({ retentionDays: parseInt(e.target.value) || 365 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                  />
                  <p className="text-[10px] text-slate-400">Set to 0 for unlimited cryptographic retention.</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Data Loss Prevention (DLP) Inspection</h5>
                    <p className="text-slate-400 text-[11px]">Block unencrypted transmission of credentials, credit card numbers, or API keys.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={adminPolicies.dlpEnabled}
                    onChange={e => onUpdateAdminPolicies({ dlpEnabled: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                  <div>
                    <h5 className="font-bold text-white">Legal Hold Active</h5>
                    <p className="text-slate-400 text-[11px]">Suspends ephemeral message destruction for active regulatory discovery.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={adminPolicies.legalHoldActive}
                    onChange={e => onUpdateAdminPolicies({ legalHoldActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
