import React, { useState } from 'react';
import {
  User,
  Shield,
  CheckCircle2,
  Globe,
  ExternalLink,
  Edit3,
  Lock,
  Sparkles,
  Search,
  Check,
  AlertCircle,
  Copy,
  Briefcase,
  GraduationCap,
  Building,
  Heart,
  Calendar,
  DollarSign,
  BookOpen,
  MapPin,
  Clock,
  Phone,
  Mail,
  Share2,
  ChevronRight,
  Layers,
  Star,
  Users
} from 'lucide-react';
import {
  UniversalOmniProfile,
  VerificationBadgeType,
  UsernameRuleConfig,
  IdentityPrivacySettings
} from '../../types/omni_identity';
import { OmniPrivacySettingsModal } from './OmniPrivacySettingsModal';

interface OmniIdentityHubProps {
  activeProfile: UniversalOmniProfile;
  allProfiles: UniversalOmniProfile[];
  rules: UsernameRuleConfig;
  onSelectProfile: (profileId: string) => void;
  onCheckAvailability: (username: string) => { available: boolean; status: string; message: string; canonicalUrl?: string; subdomainUrl?: string };
  onChangeUsername: (profileId: string, newUsername: string) => void;
  onUpdateProfile: (profileId: string, updates: Partial<UniversalOmniProfile>) => void;
  onNavigateTab: (tab: any) => void;
  privacySettings: IdentityPrivacySettings;
  onUpdatePrivacySettings: (profileId: string, settings: Partial<IdentityPrivacySettings>) => void;
}

export const OmniIdentityHub: React.FC<OmniIdentityHubProps> = ({
  activeProfile,
  allProfiles,
  rules,
  onSelectProfile,
  onCheckAvailability,
  onChangeUsername,
  onUpdateProfile,
  onNavigateTab,
  privacySettings,
  onUpdatePrivacySettings
}) => {
  // Username check & change state
  const [usernameSearch, setUsernameSearch] = useState('');
  const [checkResult, setCheckResult] = useState<ReturnType<typeof onCheckAvailability> | null>(null);
  const [isChangingUsername, setIsChangingUsername] = useState(false);
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [usernameChangeError, setUsernameChangeError] = useState<string | null>(null);
  const [usernameChangeSuccess, setUsernameChangeSuccess] = useState<string | null>(null);

  // Profile Edit Modal State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    displayName: activeProfile.displayName,
    headline: activeProfile.headline,
    bio: activeProfile.bio,
    location: activeProfile.personalData?.location || activeProfile.businessData?.headquartersAddress || '',
    countryCode: activeProfile.countryCode
  });

  // Privacy Modal State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCheck = (val: string) => {
    setUsernameSearch(val);
    if (!val.trim()) {
      setCheckResult(null);
      return;
    }
    const res = onCheckAvailability(val);
    setCheckResult(res);
  };

  const handleExecuteUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameChangeError(null);
    try {
      onChangeUsername(activeProfile.id, newUsernameInput);
      setUsernameChangeSuccess(`Successfully claimed @${newUsernameInput.toLowerCase()}! Old handle redirected.`);
      setTimeout(() => {
        setIsChangingUsername(false);
        setUsernameChangeSuccess(null);
        setNewUsernameInput('');
      }, 1500);
    } catch (err: any) {
      setUsernameChangeError(err.message || 'Failed to change username');
    }
  };

  const handleSaveProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(activeProfile.id, {
      displayName: editFormData.displayName,
      headline: editFormData.headline,
      bio: editFormData.bio,
      countryCode: editFormData.countryCode
    });
    setIsEditingProfile(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Badge icon helper
  const renderVerificationBadge = (badge: VerificationBadgeType) => {
    switch (badge) {
      case 'verified_creator':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Verified Creator
          </span>
        );
      case 'verified_business':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Verified Business
          </span>
        );
      case 'verified_official':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Official Organisation
          </span>
        );
      case 'verified_human':
        return (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            Verified Person
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Digital Identity Ecosystem Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                SOVEREIGN DIGITAL IDENTITY & USERNAME REGISTRY
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
              Permanent OMNI Passport Identity
            </h2>
            <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Your sovereign handle <strong className="text-indigo-400">@{activeProfile.username}</strong> works seamlessly across Connect, Finance OS, AI Mesh, and is accessible anywhere via universal URLs and custom domains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Privacy Rules</span>
            </button>
            <button
              onClick={() => onNavigateTab('page_builder')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Convert to Omni Page</span>
            </button>
            <button
              onClick={() => onNavigateTab('custom_domains')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-slate-700"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Custom Domains</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Identity Switcher & Profile Archetypes Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            Switch Active OMNI Passport Profile
          </div>
          <span className="text-[11px] text-slate-500">6 Specialized Profile Archetypes Supported</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          {allProfiles.map(p => {
            const isCurrent = p.id === activeProfile.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProfile(p.id)}
                className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md text-white'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-300'
                }`}
              >
                <img
                  src={p.avatarUrl}
                  alt={p.displayName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate flex items-center gap-1">
                    <span>{p.displayName}</span>
                    {p.verificationBadge !== 'none' && <CheckCircle2 className="w-3 h-3 text-indigo-400 inline" />}
                  </div>
                  <div className="text-[11px] text-indigo-400 font-mono truncate">@{p.username}</div>
                  <div className="text-[10px] text-slate-400 capitalize truncate">{p.profileType} Profile</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Profile Showcase Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Cover Image Banner */}
        <div className="h-52 lg:h-64 relative bg-slate-950">
          <img
            src={activeProfile.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

          {/* Action buttons on banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="px-3.5 py-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-xl text-xs font-bold backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setIsChangingUsername(true)}
              className="px-3.5 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Change Handle</span>
            </button>
          </div>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 lg:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="relative">
                <img
                  src={activeProfile.avatarUrl}
                  alt={activeProfile.displayName}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-slate-900 shadow-2xl bg-slate-800"
                />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">{activeProfile.displayName}</h1>
                  {renderVerificationBadge(activeProfile.verificationBadge)}
                </div>
                <div className="text-sm font-mono text-indigo-400 font-bold">@{activeProfile.username}</div>
                <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">{activeProfile.headline}</p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
              <div className="text-center px-2">
                <div className="text-sm font-extrabold text-white">{activeProfile.stats.followersCount.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 font-semibold">Followers</div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center px-2">
                <div className="text-sm font-extrabold text-white">{activeProfile.stats.postsCount}</div>
                <div className="text-[10px] text-slate-400 font-semibold">Posts</div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center px-2">
                <div className="text-sm font-extrabold text-emerald-400">{activeProfile.reputationScore}</div>
                <div className="text-[10px] text-slate-400 font-semibold">Reputation</div>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-xs text-slate-300 leading-relaxed mb-6">
            {activeProfile.bio}
          </div>

          {/* Universal Access URLs Bar */}
          <div className="space-y-2 mb-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Universal Permanent Access URLs
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 1. Canonical Universal URL */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-semibold">Universal Canonical Path</div>
                  <div className="text-xs text-indigo-300 font-mono truncate">{activeProfile.canonicalUrl}</div>
                </div>
                <button
                  onClick={() => handleCopy(`https://${activeProfile.canonicalUrl}`)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === `https://${activeProfile.canonicalUrl}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* 2. Subdomain URL */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-semibold">Subdomain Web Address</div>
                  <div className="text-xs text-emerald-300 font-mono truncate">{activeProfile.subdomain}</div>
                </div>
                <button
                  onClick={() => handleCopy(`https://${activeProfile.subdomain}`)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === `https://${activeProfile.subdomain}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* 3. Custom Domain */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-500 font-semibold">Custom Domain</div>
                  <div className="text-xs text-amber-300 font-mono truncate">
                    {activeProfile.customDomain ? activeProfile.customDomain : 'No custom domain attached'}
                  </div>
                </div>
                {activeProfile.customDomain ? (
                  <button
                    onClick={() => handleCopy(`https://${activeProfile.customDomain}`)}
                    className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedUrl === `https://${activeProfile.customDomain}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateTab('custom_domains')}
                    className="text-[10px] font-bold text-indigo-400 hover:underline"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Archetype Specialized Fields */}
          {/* ARCHETYPE A: CREATOR PROFILE */}
          {activeProfile.creatorData && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Creator Economy & Monetization Envelopes
                </h3>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  MRR: ${(activeProfile.creatorData.monthlyRevenueUsd).toLocaleString()} USD
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Membership Tiers */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300">Paid Subscriber Membership Tiers</div>
                  {activeProfile.creatorData.membershipTiers.map(tier => (
                    <div key={tier.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{tier.name}</div>
                        <div className="text-[10px] text-slate-400">{tier.benefits.join(' • ')}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-purple-400">${tier.priceUsdMonth}/mo</div>
                        <div className="text-[9px] text-slate-500">{tier.subscribersCount} active</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Courses & Media */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-300">Masterclasses & Media Assets</div>
                  {activeProfile.creatorData.courses.map(crs => (
                    <div key={crs.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{crs.title}</div>
                        <div className="text-[10px] text-slate-400">{crs.modulesCount} modules • {crs.studentsCount} enrolled</div>
                      </div>
                      <div className="text-xs font-extrabold text-emerald-400">${crs.priceUsd}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ARCHETYPE B: BUSINESS PROFILE */}
          {activeProfile.businessData && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                Enterprise Catalogue, Services & Registered Entity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Company Information</div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>Reg: <span className="font-mono text-slate-200">{activeProfile.businessData.companyRegistrationNumber}</span></div>
                    <div>VAT: <span className="font-mono text-slate-200">{activeProfile.businessData.taxVatNumber}</span></div>
                    <div>HQ: <span className="text-slate-200">{activeProfile.businessData.headquartersAddress}</span></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Contact & Support</div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {activeProfile.businessData.contactOptions.email}</div>
                    <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {activeProfile.businessData.contactOptions.phone}</div>
                    <div>Reviews: <span className="text-amber-400 font-bold">★ {activeProfile.businessData.averageRating}</span> ({activeProfile.businessData.totalReviewsCount})</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Commercial Services</div>
                  {activeProfile.businessData.services.slice(0, 2).map(s => (
                    <div key={s.id} className="text-[11px] text-slate-300">
                      <div className="font-bold text-white">{s.title}</div>
                      <div className="text-indigo-400 font-mono text-[10px]">From ${s.startingPriceUsd.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ARCHETYPE C: ORGANISATION / CHURCH PROFILE */}
          {activeProfile.organisationData && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Diocese Branches, Governance & Mission Funds
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Affiliated Branches ({activeProfile.organisationData.affiliatedBranches.length})</div>
                  <div className="space-y-2">
                    {activeProfile.organisationData.affiliatedBranches.map(br => (
                      <div key={br.id} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{br.branchName}</div>
                          <div className="text-slate-400">{br.pastorOrLeadName} • {br.locationCity}</div>
                        </div>
                        <span className="text-xs text-emerald-400 font-semibold">{br.membersCount.toLocaleString()} members</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300">Mission Funds & Tithes</div>
                  {activeProfile.organisationData.donationCampaigns.map(don => (
                    <div key={don.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{don.title}</span>
                        <span className="text-emerald-400 font-mono">${don.raisedAmountUsd.toLocaleString()} / ${don.targetAmountUsd.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${Math.min(100, (don.raisedAmountUsd / don.targetAmountUsd) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Real-Time Username Search & Collision Checker Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Global Username Registry Checker</h3>
            <p className="text-xs text-slate-400">Search and verify availability across all personal, business, creator, and organisation namespaces.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-mono font-bold text-sm">@</span>
            <input
              type="text"
              placeholder="e.g. fenol, gideon, kingdomhub, churchworld"
              value={usernameSearch}
              onChange={(e) => handleCheck(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-9 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <button
            onClick={() => handleCheck(usernameSearch)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Check Availability</span>
          </button>
        </div>

        {checkResult && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
              checkResult.available
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            {checkResult.available ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold">{checkResult.message}</div>
              {checkResult.available && (
                <div className="text-[11px] font-mono text-slate-300">
                  Will map to: <strong className="text-white">{checkResult.canonicalUrl}</strong> and <strong className="text-white">{checkResult.subdomainUrl}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reserved Keywords Pill List */}
        <div className="pt-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Protected System Reserved Keywords</div>
          <div className="flex flex-wrap gap-1.5">
            {rules.reservedKeywords.slice(0, 14).map(kw => (
              <span key={kw} className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded text-[10px] font-mono">
                @{kw}
              </span>
            ))}
            <span className="px-2 py-0.5 text-slate-500 text-[10px] font-mono">+12 more</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Edit Profile Information</h3>
            <form onSubmit={handleSaveProfileEdit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Display Name</label>
                <input
                  type="text"
                  value={editFormData.displayName}
                  onChange={(e) => setEditFormData({ ...editFormData, displayName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Headline / Title</label>
                <input
                  type="text"
                  value={editFormData.headline}
                  onChange={(e) => setEditFormData({ ...editFormData, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Biography</label>
                <textarea
                  rows={4}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Username Modal */}
      {isChangingUsername && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Change OMNI Username Handle</h3>
            <p className="text-xs text-slate-400">
              Current handle: <strong className="text-indigo-400">@{activeProfile.username}</strong>. Changing will preserve historical redirects from your old handle.
            </p>

            <form onSubmit={handleExecuteUsernameChange} className="space-y-4 text-xs">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 font-mono font-bold">@</span>
                <input
                  type="text"
                  placeholder="new_handle"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3.5 py-2.5 text-white font-mono"
                  required
                />
              </div>

              {usernameChangeError && (
                <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs">
                  {usernameChangeError}
                </div>
              )}

              {usernameChangeSuccess && (
                <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{usernameChangeSuccess}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingUsername(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Confirm & Claim Handle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      <OmniPrivacySettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        settings={privacySettings}
        onSave={(updated) => onUpdatePrivacySettings(activeProfile.id, updated)}
        username={activeProfile.username}
      />
    </div>
  );
};
