import React, { useState } from 'react';
import {
  Send,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Users,
  Eye,
  MousePointer,
  UserX,
  Sparkles,
  Calendar,
  Radio,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { BroadcastCampaign, ExternalChannelType } from '../../../types/omni_universal_inbox';

interface Props {
  campaigns: BroadcastCampaign[];
  onCreateCampaign: (campaign: Partial<BroadcastCampaign>) => void;
  onSendCampaign: (campaignId: string) => void;
}

export const OmniBroadcastCampaignsView: React.FC<Props> = ({
  campaigns,
  onCreateCampaign,
  onSendCampaign
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<ExternalChannelType>('whatsapp');
  const [content, setContent] = useState('');
  const [templateName, setTemplateName] = useState('waba_general_announcement_v1');
  const [verifiedConsentOnly, setVerifiedConsentOnly] = useState(true);

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return;
    onCreateCampaign({
      title: title.trim(),
      targetChannel: channel,
      templateName,
      messageContent: content.trim(),
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 3600000).toISOString(),
      audienceFilter: {
        verifiedOptInOnly: verifiedConsentOnly,
        customerTier: 'Enterprise'
      },
      metrics: {
        targetedRecipients: 5400,
        sentCount: 0,
        deliveredCount: 0,
        readCount: 0,
        clickedCount: 0,
        optOutCount: 0
      },
      consentEnforced: true
    });
    setShowCreateModal(false);
    setTitle('');
    setContent('');
  };

  const getChannelBadge = (ch: ExternalChannelType) => {
    switch (ch) {
      case 'whatsapp': return { label: 'WhatsApp Broadcast', icon: MessageSquare, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'email': return { label: 'Email Newsletter', icon: Mail, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'sms': return { label: 'SMS Drop', icon: Phone, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      default: return { label: ch, icon: Radio, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-indigo-400" />
                MULTICHANNEL BROADCAST FOUNDATION
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Consent & Opt-Out Compliant
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Campaigns & Outbound Announcements</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
              Deliver targeted product announcements, event invites, and newsletters across WhatsApp, Email, and SMS with strict double opt-in consent and automated STOP frequency capping.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>New Multichannel Campaign</span>
          </button>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map(camp => {
          const ch = getChannelBadge(camp.targetChannel);
          const ChIcon = ch.icon;
          const isDone = camp.status === 'completed';

          return (
            <div
              key={camp.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${ch.color}`}>
                    <ChIcon className="w-3 h-3" />
                    <span>{ch.label}</span>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {camp.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-white">{camp.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{camp.messageContent}</p>
                </div>
              </div>

              {/* Campaign Metrics */}
              <div className="grid grid-cols-4 gap-1.5 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Sent</span>
                  <strong className="text-white font-mono">{camp.metrics.sentCount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Delivered</span>
                  <strong className="text-emerald-400 font-mono">{camp.metrics.deliveredCount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Read</span>
                  <strong className="text-indigo-300 font-mono">{camp.metrics.readCount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Opt-Out</span>
                  <strong className="text-rose-400 font-mono">{camp.metrics.optOutCount}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Double Opt-In Enforced</span>
                </div>

                {!isDone && (
                  <button
                    onClick={() => onSendCampaign(camp.id)}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Broadcast Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Broadcast Campaign</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Sovereign Ecosystem Update"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-bold uppercase block mb-1">Delivery Channel</label>
                  <select
                    value={channel}
                    onChange={e => setChannel(e.target.value as ExternalChannelType)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                  >
                    <option value="whatsapp">WhatsApp Business API</option>
                    <option value="email">Email Newsletter (SendGrid)</option>
                    <option value="sms">SMS Toll-Free Drop (10DLC)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 font-bold uppercase block mb-1">Message Template</label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={e => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-indigo-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Message Body Content</label>
                <textarea
                  rows={3}
                  placeholder="Enter message text with unsubscribe footer..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Enforce Verified Opt-In Only</span>
                  <span className="text-[10px] text-slate-400">Skip contacts without recorded consent timestamp</span>
                </div>
                <input
                  type="checkbox"
                  checked={verifiedConsentOnly}
                  onChange={e => setVerifiedConsentOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded bg-slate-900 border-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!title.trim() || !content.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Schedule Broadcast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
