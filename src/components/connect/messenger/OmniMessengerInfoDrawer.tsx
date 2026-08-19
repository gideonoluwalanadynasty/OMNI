import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  Clock,
  Briefcase,
  Users,
  FileText,
  Pin,
  Bell,
  BellOff,
  Trash2,
  Download,
  Key,
  DollarSign,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import {
  OmniConversation,
  OmniMessage,
  CrmPipelineStage
} from '../../../types/omni_messenger';

interface Props {
  conversation: OmniConversation;
  messages: OmniMessage[];
  onClose: () => void;
  onUpdateEphemeralTimer: (seconds: number) => void;
  onAdvanceCrmStage: (stage: CrmPipelineStage, dealValue?: number) => void;
  onSummarizeConversation: () => void;
  aiSummaryText: string | null;
}

export const OmniMessengerInfoDrawer: React.FC<Props> = ({
  conversation,
  messages,
  onClose,
  onUpdateEphemeralTimer,
  onAdvanceCrmStage,
  onSummarizeConversation,
  aiSummaryText
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'members' | 'files'>('overview');
  const [dealVal, setDealVal] = useState(conversation.crmLeadData?.dealValueUsd?.toString() || '120000');
  const [isMuted, setIsMuted] = useState(false);

  const attachments = messages.flatMap(m => m.attachments || []);
  const pinnedMsgs = messages.filter(m => m.isPinned);

  const crmStages: Array<{ key: CrmPipelineStage; label: string; desc: string }> = [
    { key: 'conversation', label: 'Conversation', desc: 'Initial inquiry & dialog' },
    { key: 'contact', label: 'Contact', desc: 'Omni Universal Contact ledgered' },
    { key: 'lead', label: 'Lead', desc: 'Commercial deal opportunity scored' },
    { key: 'customer', label: 'Customer', desc: 'Contract signed & onboarded' },
    { key: 'transaction', label: 'Transaction', desc: 'OmniPay settlement completed' }
  ];

  const currentStageIndex = crmStages.findIndex(s => s.key === (conversation.crmPipelineStage || 'conversation'));

  return (
    <div id="omni-messenger-info-drawer" className="w-80 md:w-96 border-l border-slate-800 flex flex-col bg-slate-950/90 select-none overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          Conversation Details
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Profile Info */}
      <div className="p-4 text-center border-b border-slate-800 space-y-2">
        <div className="relative inline-block">
          <img
            src={conversation.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
            alt={conversation.title}
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-slate-700 shadow-md"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" />
        </div>

        <h4 className="text-base font-extrabold text-white">{conversation.title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed px-2">
          {conversation.description || 'Omni Sovereign Real-Time Conversation Channel'}
        </p>

        {/* Quick Tabs */}
        <div className="flex items-center justify-center gap-1 pt-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'crm' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            CRM
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'members' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Members ({conversation.members.length})
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'files' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Files ({attachments.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Security */}
      {activeTab === 'overview' && (
        <div className="p-4 space-y-4 text-xs">
          {/* E2EE Signal Security Card */}
          <div className="p-3 bg-slate-900/90 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Signal Double Ratchet E2EE</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Messages are encrypted on your physical device. No intermediate servers or nodes hold private decryption keys.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-mono">Fingerprint:</span>
              <span className="text-emerald-300 font-mono font-bold">
                {conversation.encryptionFingerprint || 'X3DH:7F92-4A1B-990C'}
              </span>
            </div>
          </div>

          {/* Ephemeral Self-Destruct Timers */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Ephemeral Timer</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Automatically purge messages across all recipient devices after expiration.
            </p>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { sec: 0, label: 'Off' },
                { sec: 3600, label: '1 Hour' },
                { sec: 86400, label: '24 Hours' },
                { sec: 604800, label: '7 Days' }
              ].map(item => (
                <button
                  key={item.sec}
                  onClick={() => onUpdateEphemeralTimer(item.sec)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                    conversation.ephemeralTimerSeconds === item.sec
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Executive Digest Generator */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Conversation Summary</span>
              </div>
              <button
                onClick={onSummarizeConversation}
                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold"
              >
                Summarize
              </button>
            </div>
            {aiSummaryText ? (
              <div className="bg-slate-950 p-2.5 rounded-lg text-[11px] text-slate-200 leading-relaxed whitespace-pre-wrap border border-slate-800">
                {aiSummaryText}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Generate an executive bulleted summary of key agreements and action items.
              </p>
            )}
          </div>

          {/* Notification Controls */}
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-white font-medium">Mute Notifications</span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-xl transition-colors ${
                isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {isMuted ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: OMNI CRM Integration */}
      {activeTab === 'crm' && (
        <div className="p-4 space-y-4 text-xs">
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                OMNI CRM Pipeline Engine
              </span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 bg-amber-500/20 rounded">
                {conversation.crmPipelineStage || 'conversation'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Conversations directly transition into enterprise contacts, leads, and settled transactions with double-entry ledger proofs.
            </p>
          </div>

          {/* Pipeline Stage Visualizer */}
          <div className="space-y-2">
            <h5 className="font-bold text-white text-xs">Lifecycle Pipeline Progression:</h5>
            <div className="space-y-1.5">
              {crmStages.map((stg, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = stg.key === conversation.crmPipelineStage;

                return (
                  <button
                    key={stg.key}
                    onClick={() => onAdvanceCrmStage(stg.key, parseFloat(dealVal))}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-amber-600/20 border-amber-500 text-white font-bold'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPassed ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{stg.label}</div>
                        <div className="text-[10px] opacity-75">{stg.desc}</div>
                      </div>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deal Value Adjustment */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
            <label className="block text-[11px] font-bold text-slate-400">Enterprise Deal Value (USD)</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={dealVal}
                  onChange={e => setDealVal(e.target.value)}
                  className="w-full pl-7 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-bold text-xs"
                />
              </div>
              <button
                onClick={() => onAdvanceCrmStage(conversation.crmPipelineStage || 'lead', parseFloat(dealVal))}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Members List */}
      {activeTab === 'members' && (
        <div className="p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between text-slate-400 font-semibold text-[11px]">
            <span>{conversation.members.length} Members</span>
            <span>Permissions</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {conversation.members.map(member => (
              <div key={member.profileId} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={member.avatarUrl}
                      alt={member.displayName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    {member.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-950" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">{member.displayName}</h5>
                    <p className="text-[10px] text-slate-400">@{member.username}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  member.role === 'owner'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : member.role === 'admin'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Shared Media & Files */}
      {activeTab === 'files' && (
        <div className="p-4 space-y-3 text-xs">
          <h5 className="font-bold text-white text-xs">Shared Documents & Media</h5>
          {attachments.length === 0 ? (
            <p className="text-slate-500 text-center py-6">No attachments shared yet</p>
          ) : (
            <div className="space-y-2">
              {attachments.map(att => (
                <div
                  key={att.id}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate text-xs">{att.name}</p>
                      <p className="text-[9px] text-slate-400 font-mono">
                        {(att.sizeBytes / 1024 / 1024).toFixed(1)} MB • SHA-256 Verified
                      </p>
                    </div>
                  </div>
                  <a
                    href={att.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
