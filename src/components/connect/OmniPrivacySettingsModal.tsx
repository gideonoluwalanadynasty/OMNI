import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  MessageSquare,
  UserCheck,
  CheckCircle2,
  X,
  Search,
  Globe,
  Sliders
} from 'lucide-react';
import { IdentityPrivacySettings } from '../../types/omni_identity';

interface OmniPrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: IdentityPrivacySettings;
  onSave: (updated: Partial<IdentityPrivacySettings>) => void;
  username: string;
}

export const OmniPrivacySettingsModal: React.FC<OmniPrivacySettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  username
}) => {
  const [formData, setFormData] = useState<IdentityPrivacySettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sovereign Privacy & Access Controls</h3>
              <p className="text-xs text-slate-400">Manage visibility and access rules for @{username}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Profile Visibility */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              Who Can View Your Profile
            </label>
            <select
              value={formData.profileVisibility}
              onChange={(e) => setFormData({ ...formData, profileVisibility: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="public">Public (Everyone on Web & OMNI)</option>
              <option value="followers_only">Followers & Connections Only</option>
              <option value="private">Private (Restricted / Stealth Mode)</option>
            </select>
          </div>

          {/* Direct Messaging Access */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Who Can Send You Encrypted Direct Messages
            </label>
            <select
              value={formData.allowDirectMessages}
              onChange={(e) => setFormData({ ...formData, allowDirectMessages: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="everyone">Everyone (Open Inquiries)</option>
              <option value="verified_only">Verified OMNI Passport Holders Only</option>
              <option value="followers">Followers & Contacts Only</option>
              <option value="none">Nobody (Closed Inbox)</option>
            </select>
          </div>

          {/* Who can follow */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-amber-400" />
              Following & Graph Permissions
            </label>
            <select
              value={formData.whoCanFollow}
              onChange={(e) => setFormData({ ...formData, whoCanFollow: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="everyone">Open (Anyone can follow)</option>
              <option value="approval_required">Approval Required (Manual Verification)</option>
              <option value="none">Disabled (No new followers allowed)</option>
            </select>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <div className="text-slate-200 font-bold">Search Engine Indexing</div>
                <div className="text-[11px] text-slate-400">Allow Google and external crawlers to discover omni.com/@{username}</div>
              </div>
              <input
                type="checkbox"
                checked={formData.allowSearchEngineIndexing}
                onChange={(e) => setFormData({ ...formData, allowSearchEngineIndexing: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <div className="text-slate-200 font-bold">Show Online Activity & Presence</div>
                <div className="text-[11px] text-slate-400">Display active status indicator in real-time chats</div>
              </div>
              <input
                type="checkbox"
                checked={formData.showOnlineStatus}
                onChange={(e) => setFormData({ ...formData, showOnlineStatus: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer">
              <div>
                <div className="text-slate-200 font-bold">Display Financial & Verification Badges</div>
                <div className="text-[11px] text-slate-400">Show verified checkmarks, creator tiers, and verified store badges</div>
              </div>
              <input
                type="checkbox"
                checked={formData.showFinancialBadges}
                onChange={(e) => setFormData({ ...formData, showFinancialBadges: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
              />
            </label>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Privacy settings successfully updated and saved to OMNI Passport!</span>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Save Privacy Rules</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
