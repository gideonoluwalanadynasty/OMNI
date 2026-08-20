import React, { useState } from 'react';
import {
  X,
  Globe,
  Lock,
  Building,
  GraduationCap,
  Sparkles,
  Briefcase,
  Heart,
  Layers,
  DollarSign,
  Shield,
  CheckCircle2,
  Sliders,
  Plus
} from 'lucide-react';
import { OmniSpace, OmniSpaceType, OmniSpaceCategory, OmniSpaceModuleKey } from '../../../types/omni_spaces';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: ConnectProfile;
  onCreateSpace: (newSpace: OmniSpace) => void;
}

export const OmniSpaceCreationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activeProfile,
  onCreateSpace
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [spaceType, setSpaceType] = useState<OmniSpaceType>('public_space');
  const [category, setCategory] = useState<OmniSpaceCategory>('interests');
  const [membershipType, setMembershipType] = useState<'free' | 'paid_subscription' | 'approval_required' | 'invite_only'>('free');
  const [priceUsd, setPriceUsd] = useState(0);
  const [tags, setTags] = useState('Community, Sovereign, Innovation');

  // AI Assistant Config
  const [aiName, setAiName] = useState('Space Copilot');
  const [aiPersonality, setAiPersonality] = useState('Helpful, grounded, technical community assistant');

  if (!isOpen) return null;

  const handleFinish = () => {
    if (!name.trim()) return;

    const newSpace: OmniSpace = {
      id: `space_${Date.now()}`,
      tenantId: 'tenant_primary_001',
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      tagline: tagline.trim() || 'A sovereign OMNI community space',
      description: description.trim() || 'Welcome to our OMNI space for collaboration and learning.',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      spaceType,
      category,
      membershipType,
      membershipPriceUsd: membershipType === 'paid_subscription' ? priceUsd : undefined,
      billingPeriod: 'monthly',
      ownerProfileId: activeProfile.id,
      ownerName: activeProfile.displayName,
      membersCount: 1,
      onlineCount: 1,
      isVerified: true,
      isFeatured: false,
      rules: [
        'Respect all members and adhere to sovereign covenanted discussions.',
        'No unsolicited commercial spam or unauthorized promotions.',
        'Keep technical discussions constructive and citation-grounded.'
      ],
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      enabledModules: [
        'home',
        'feed',
        'discussion',
        'chat',
        'members',
        'events',
        'resources',
        'courses',
        'store',
        'media',
        'ai_assistant'
      ],
      aiAssistantConfig: {
        assistantName: aiName.trim() || 'Space Copilot',
        avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        personalityPrompt: aiPersonality,
        qaGroundingDocsCount: 10,
        autoModerationEnabled: true,
        autoWelcomeEnabled: true,
        welcomeMessageTemplate: `Welcome to ${name.trim()}! I am your dedicated AI Assistant. Let me know if you need assistance exploring our curriculum or documents.`,
        supportedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ar', 'yo', 'ig', 'ha', 'pt']
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onCreateSpace(newSpace);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">OMNI Spaces Wizard</span>
            <h2 className="text-xl font-bold text-white">Create a New Sovereign OMNI Space</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span className={step === 1 ? 'text-indigo-400' : ''}>1. Space Archetype & Category</span>
          <span className={step === 2 ? 'text-indigo-400' : ''}>2. Branding & Membership</span>
          <span className={step === 3 ? 'text-indigo-400' : ''}>3. AI Copilot & Launch</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Space Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Apex Quantum Computing Collective"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Space Archetype (8 Supported Types)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'public_space', label: 'Public Space', icon: Globe },
                  { key: 'private_space', label: 'Private Space', icon: Lock },
                  { key: 'enterprise_space', label: 'Enterprise Space', icon: Building },
                  { key: 'learning_space', label: 'Learning Space', icon: GraduationCap },
                  { key: 'business_space', label: 'Business Space', icon: Briefcase },
                  { key: 'creator_space', label: 'Creator Space', icon: Sparkles },
                  { key: 'family_space', label: 'Family Space', icon: Heart },
                  { key: 'organisation_space', label: 'Organisation Space', icon: Layers }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSpaceType(item.key as OmniSpaceType)}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      spaceType === item.key
                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-[11px] text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as OmniSpaceCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="interests">Interests & Hobbies</option>
                <option value="businesses">Businesses & Commerce</option>
                <option value="schools">Schools & Universities</option>
                <option value="churches">Churches & Ministries</option>
                <option value="families">Families & Kinship</option>
                <option value="brands">Brands & Product Hubs</option>
                <option value="courses">Courses & Bootcamps</option>
                <option value="events">Events & Festivals</option>
                <option value="professional_networks">Professional Networks</option>
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!name.trim()}
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all"
              >
                Continue to Branding →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Tagline / Vision</label>
              <input
                type="text"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="A high-performance sovereign community"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your space's covenant, mission, and activities..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Membership Tier</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'free', label: 'Free Access' },
                  { key: 'paid_subscription', label: 'Paid Monthly ($)' },
                  { key: 'approval_required', label: 'Approval Required' },
                  { key: 'invite_only', label: 'Invite Token Only' }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMembershipType(item.key as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      membershipType === item.key
                        ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {membershipType === 'paid_subscription' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-400">Monthly Subscription Price (USD)</label>
                <input
                  type="number"
                  value={priceUsd}
                  onChange={e => setPriceUsd(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                Configure AI Copilot →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/40 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Dedicated Space Gemini AI Assistant
              </div>
              <p className="text-xs text-slate-300">
                Every OMNI Space is endowed with an autonomous AI copilot to ground answers in space documents, summarize chat feeds, welcome new members, and enforce community rules.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">AI Assistant Name</label>
              <input
                type="text"
                value={aiName}
                onChange={e => setAiName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Assistant Persona / Directives</label>
              <textarea
                value={aiPersonality}
                onChange={e => setAiPersonality(e.target.value)}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
              ✓ All 11 OMNI Space modules (Home, Feed, Discussion, Chat, Members, Events, Resources, Courses, Store, Media, AI Assistant) will be provisioned with instant sovereign ledger linkage.
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Launch OMNI Space</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
