import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  Lock,
  Building,
  GraduationCap,
  Briefcase,
  Heart,
  Users,
  Shield,
  Bot,
  DollarSign,
  Check,
  X
} from 'lucide-react';
import { OmniSpaceType, OmniMembershipTier } from '../../../types/omni_community_spaces';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  engine: OmniConnectEngine;
  currentProfileId: string;
  onSpaceCreated: (spaceId: string) => void;
}

export const OmniCreateSpaceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  engine,
  currentProfileId,
  onSpaceCreated
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [spaceType, setSpaceType] = useState<OmniSpaceType>('public');
  const [category, setCategory] = useState('Technology');
  const [membershipTier, setMembershipTier] = useState<OmniMembershipTier>('free');
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(0);
  const [customDomain, setCustomDomain] = useState('');
  const [aiAssistantName, setAiAssistantName] = useState('SpacePilot AI');
  const [aiSystemPrompt, setAiSystemPrompt] = useState('You are the helpful resident AI assistant for this space. Answer member questions and cite space documents.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const created = engine.createOmniSpace({
      name: name.trim(),
      slug: generatedSlug,
      tagline: tagline.trim() || `${name} Sovereign Space`,
      description: description.trim() || `Welcome to ${name}. Connect, collaborate and build.`,
      spaceType,
      category,
      membershipTier,
      subscriptionPriceMonthlyUsd: membershipTier === 'paid' ? subscriptionPrice : undefined,
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
      bannerUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600',
      ownerProfileId: currentProfileId,
      customDomain: customDomain.trim() || undefined,
      rules: [
        'Maintain high-signal constructive discourse',
        'Respect intellectual property and privacy',
        'Follow OMNI Global Community Safety Guidelines'
      ],
      aiAssistant: {
        assistantName: aiAssistantName.trim() || 'Resident AI',
        avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
        systemPrompt: aiSystemPrompt.trim(),
        welcomeMessageTemplate: `Welcome to ${name}, {{name}}! Ask me anything about our resources.`,
        autoModerationEnabled: true,
        toxicityThreshold: 0.75,
        autoWelcomeNewMembers: true,
        groundedResourceIds: [],
        supportedLanguages: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Yoruba', 'Japanese']
      },
      crmIntegration: {
        enabled: spaceType === 'business' || spaceType === 'enterprise',
        autoSyncMembersToLeads: true,
        pipelineStage: 'Community Member Lead'
      },
      financialConfig: {
        acceptsDonations: true,
        acceptsOmniCoins: true,
        stripeAccountId: 'acct_omni_mock_' + Date.now(),
        payoutSchedule: 'weekly'
      }
    });

    onSpaceCreated(created.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create Flagship OMNI Space</h3>
              <p className="text-xs text-slate-400">Unified website, forum, classroom, store and AI assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Space Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                }}
                placeholder="e.g. NextGen Web3 Founders"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">URL Identifier (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="e.g. web3-founders"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-indigo-400 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="e.g. Building sovereign decentralized infrastructure"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Description & Mission</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the mission, governance, and focus of your space..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Space Archetype</label>
              <select
                value={spaceType}
                onChange={e => setSpaceType(e.target.value as OmniSpaceType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="public">Public Community Space</option>
                <option value="private">Private Gated Space</option>
                <option value="enterprise">Enterprise Team Space</option>
                <option value="learning">Learning & Academic Space</option>
                <option value="business">Business & Client Hub</option>
                <option value="creator">Creator & VIP Fan Space</option>
                <option value="family">Family & Kinship Space</option>
                <option value="organisation">Faith & Non-Profit Space</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Membership Access Tier</label>
              <select
                value={membershipTier}
                onChange={e => setMembershipTier(e.target.value as OmniMembershipTier)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="free">Free for All</option>
                <option value="approval">Approval / Application Required</option>
                <option value="invitation">Invitation Only</option>
                <option value="paid">Paid Monthly Subscription</option>
              </select>
            </div>
          </div>

          {membershipTier === 'paid' && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Monthly Subscription Fee (USD)</label>
              <input
                type="number"
                value={subscriptionPrice}
                onChange={e => setSubscriptionPrice(Number(e.target.value))}
                min={1}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* AI Assistant Config */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              <Bot className="w-4 h-4 text-purple-400" />
              <span>Configure Resident AI Assistant</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">AI Assistant Name</label>
                <input
                  type="text"
                  value={aiAssistantName}
                  onChange={e => setAiAssistantName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">System Personality Directive</label>
                <input
                  type="text"
                  value={aiSystemPrompt}
                  onChange={e => setAiSystemPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
            >
              Launch Sovereign Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
