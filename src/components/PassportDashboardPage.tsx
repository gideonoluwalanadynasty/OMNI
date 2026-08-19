import React, { useState, FormEvent } from 'react';
import { 
  ShieldCheck, User, Users, Key, RefreshCw, Trash2, Link, Globe, Sparkles, 
  Eye, Lock, AlertTriangle, CheckCircle2, XCircle, Plus, ArrowRight, 
  ChevronRight, Copy, Check, Briefcase, GraduationCap, Terminal, Sliders, 
  ExternalLink, CheckSquare, ShieldAlert, Cpu, Award, DollarSign, Activity, FileText
} from 'lucide-react';
import { OMNIState, OMNIProfileType, OMNIProfile, OMNIVerificationStatus, OrgType } from '../types';

interface PassportDashboardProps {
  state: OMNIState;
  updateUserProfile: (type: OMNIProfileType, displayName: string, bio: string, metadata?: Record<string, any>) => void;
  switchProfileType: (type: OMNIProfileType) => void;
  revokeActiveSession: (sessionId: string) => void;
  revokeConnectedAppConsent: (appId: string) => void;
  authorizeConnectedApp: (appId: string, appName: string, scopes: string[]) => void;
  registerPasskey: (name: string) => void;
  revokePasskey: (id: string) => void;
  updateEnterpriseSso: (idpName: string, entityId: string, ssoUrl: string, isEnabled: boolean) => void;
  runKycKybVerification: (provider: string, type: 'identity' | 'business' | 'organization') => void;
  triggerSuspiciousLoginHook: () => void;
  changeOrganizationRole: (targetUserId: string, targetOrgId: string, role: any) => void;
  transferOrgOwnership: (targetOrgId: string, newOwnerEmail: string) => void;
  updateVerificationConfig: (field: keyof OMNIVerificationStatus, value: boolean) => void;
  createOrg: (name: string, plan: 'free' | 'growth' | 'enterprise', orgType: OrgType) => false | string;
  switchOrg: (orgId: string) => void;
}

export function PassportDashboardPage({
  state,
  updateUserProfile,
  switchProfileType,
  revokeActiveSession,
  revokeConnectedAppConsent,
  authorizeConnectedApp,
  registerPasskey,
  revokePasskey,
  updateEnterpriseSso,
  runKycKybVerification,
  triggerSuspiciousLoginHook,
  changeOrganizationRole,
  transferOrgOwnership,
  updateVerificationConfig,
  createOrg,
  switchOrg
}: PassportDashboardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'trust' | 'oauth' | 'audit'>('profile');
  const user = state.user!;
  const currentOrg = state.organizations?.find(o => o.id === state.currentOrgId) || state.organizations?.[0] || {
    id: 'org_dynasty',
    name: 'Dynasty Global Holdings',
    slug: 'dynasty',
    tenantId: 'tenant_dynasty_99',
    status: 'active' as const,
    orgType: 'company' as const,
    billingPlan: 'enterprise' as const,
    walletBalance: 4280550.00,
    apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
    webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
    subdomains: ['dynasty.omni.io'],
    createdAt: '2026-01-05T00:00:00Z',
    kybVerified: true
  };

  // Profile forms state
  const [editingProfileType, setEditingProfileType] = useState<OMNIProfileType>('personal');
  const [profileDisplayName, setProfileDisplayName] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Passkey state
  const [newPasskeyName, setNewPasskeyName] = useState('');
  const [passkeyModalOpen, setPasskeyModalOpen] = useState(false);

  // SSO state
  const [idpName, setIdpName] = useState(user.security.ssoConfig?.idpName || 'Okta Enterprise');
  const [entityId, setEntityId] = useState(user.security.ssoConfig?.entityId || 'urn:omni:saml:okta');
  const [ssoUrl, setSsoUrl] = useState(user.security.ssoConfig?.ssoUrl || 'https://okta.omni.io/sso/federate');
  const [ssoEnabled, setSsoEnabled] = useState(user.security.ssoConfig?.isEnabled || false);

  // New Organization State
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgType, setNewOrgType] = useState<OrgType>('company');
  const [newOrgPlan, setNewOrgPlan] = useState<'free' | 'growth' | 'enterprise'>('growth');
  const [newOrgModalOpen, setNewOrgModalOpen] = useState(false);

  // OAuth consent simulation state
  const [oauthSimOpen, setOauthSimOpen] = useState(false);
  const [oauthAppId, setOauthAppId] = useState('app_ads');
  const [oauthAppName, setOauthAppName] = useState('Ads');
  const [oauthScopes, setOauthScopes] = useState<string[]>(['identity.read', 'ads.campaign.create']);

  // API Playground state
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/passport/authenticate');
  const [apiResponse, setApiResponse] = useState<string>('');

  // KYC/KYB modal state
  const [kybModalOpen, setKybModalOpen] = useState(false);
  const [kybProvider, setKybProvider] = useState('Persona');
  const [kybVerifyType, setKybVerifyType] = useState<'identity' | 'business' | 'organization'>('identity');
  const [kybSimulating, setKybSimulating] = useState(false);
  const [kybSuccess, setKybSuccess] = useState(false);

  // User input simulation for account recovery
  const [recoveryInput, setRecoveryInput] = useState('');
  const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Trigger text copy feedback
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Profile save handler
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    updateUserProfile(editingProfileType, profileDisplayName, profileBio);
    setEditingProfileType(user.currentProfileType);
  };

  const handleEditProfileInit = (type: OMNIProfileType) => {
    const existing = user.profiles.find(p => p.type === type);
    setEditingProfileType(type);
    setProfileDisplayName(existing?.displayName || user.fullName);
    setProfileBio(existing?.bio || '');
  };

  // Run dynamic passport API simulation
  const executeApiCall = (endpoint: string) => {
    setApiEndpoint(endpoint);
    let result: any = {};
    const timestamp = new Date().toISOString();

    switch (endpoint) {
      case '/api/passport/authenticate':
        result = {
          status: 'authenticated',
          timestamp,
          session_id: 'omni_session_gideon_live_902',
          auth_method: 'passkey_mfa',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            verification_level: user.verificationStatus.identityVerified ? 'kyc_verified' : 'unverified',
          }
        };
        break;
      case '/api/passport/profile':
        const activeProfile = user.profiles?.find(p => p.type === user.currentProfileType) || user.profiles?.[0] || {
          id: 'prof_personal',
          type: 'personal' as const,
          displayName: user.fullName || 'User',
          bio: 'OMNI Account User'
        };
        result = {
          status: 'success',
          requested_at: timestamp,
          profile_context: user.currentProfileType,
          identity: {
            omni_id: user.id,
            username: user.username,
            displayName: activeProfile.displayName,
            bio: activeProfile.bio,
            metadata: activeProfile.metadata || {},
            preferred_language: user.language,
            preferred_currency: user.preferredCurrency,
          }
        };
        break;
      case '/api/passport/organization':
        result = {
          status: 'success',
          active_org_id: currentOrg.id,
          tenant_id: currentOrg.tenantId,
          org_details: {
            name: currentOrg.name,
            slug: currentOrg.slug,
            type: currentOrg.orgType,
            status: currentOrg.status,
            billing_plan: currentOrg.billingPlan,
            verified_kyb: currentOrg.kybVerified,
            registered_subdomains: currentOrg.subdomains,
          },
          user_role_in_org: user.role,
        };
        break;
      case '/api/passport/evaluate-permission':
        result = {
          status: 'success',
          evaluation_timestamp: timestamp,
          assertions: {
            'ads.campaign.create': user.role === 'superadmin' || user.role === 'owner' || user.role === 'marketer',
            'market.product.manage': user.role === 'superadmin' || user.role === 'owner' || user.role === 'seller',
            'learn.course.publish': user.role === 'superadmin' || user.role === 'owner' || user.role === 'developer',
            'business.payroll.view': user.role === 'superadmin' || user.role === 'owner' || user.role === 'accountant',
          },
          current_escalated_role: user.role,
        };
        break;
      default:
        result = { error: 'Unknown Passport API endpoint.' };
    }
    setApiResponse(JSON.stringify(result, null, 2));
  };

  const handleCreateOrgSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;
    const orgId = createOrg(newOrgName, newOrgPlan, newOrgType);
    if (orgId) {
      setNewOrgModalOpen(false);
      setNewOrgName('');
    }
  };

  const handleRunVerificationSubmit = () => {
    setKybSimulating(true);
    setTimeout(() => {
      runKycKybVerification(kybProvider, kybVerifyType);
      setKybSimulating(false);
      setKybSuccess(true);
      setTimeout(() => {
        setKybSuccess(false);
        setKybModalOpen(false);
      }, 1500);
    }, 2000);
  };

  const handleRecoveryTest = (e: FormEvent) => {
    e.preventDefault();
    if (user.security.recoveryCodes.includes(recoveryInput.trim())) {
      setRecoveryStatus('success');
    } else {
      setRecoveryStatus('error');
    }
  };

  return (
    <div id="passport-dashboard" className="flex flex-col gap-8">
      {/* Upper Brand / Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">OMNI Passport</h1>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Universal Identity Secure Core
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Cryptographically secure single sign-on, profile hub, compliant KYC/KYB check adapters and cross-org access control.
            </p>
          </div>
        </div>

        {/* Dynamic Verification Badges Row */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${user.verificationStatus.emailVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-400'}`}>
            <Check className="w-3 h-3" /> Email Verified
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${user.verificationStatus.phoneVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-400'}`}>
            <Check className="w-3 h-3" /> Phone Verified
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${user.verificationStatus.identityVerified ? 'bg-blue-50 text-blue-700' : 'bg-neutral-100 text-neutral-400'}`}>
            <ShieldCheck className="w-3 h-3" /> KYC Verified
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${currentOrg?.kybVerified ? 'bg-indigo-50 text-indigo-700' : 'bg-neutral-100 text-neutral-400'}`}>
            <Briefcase className="w-3 h-3" /> KYB Verified
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-neutral-200 gap-1 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <User className="w-4 h-4" />
          <span>My Identity & Profiles</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'security'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Security & Session Guard</span>
        </button>
        <button
          onClick={() => setActiveTab('trust')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'trust'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Organizations & RBAC</span>
        </button>
        <button
          onClick={() => setActiveTab('oauth')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'oauth'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Passport API & OAuth</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Security Logs & Audit</span>
        </button>
      </div>

      {/* TAB 1: Profiles & Identity */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Passport Identity Card View */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              Your Universal Passport Card
            </span>
            
            <div className="bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border border-neutral-700">
              <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute left-1/3 bottom-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase">OMNI PASSPORT</span>
                </div>
                <span className="text-[9px] font-mono text-neutral-400">CLASS: AA SUPER</span>
              </div>

              <div className="flex gap-4 items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-neutral-700 flex items-center justify-center font-bold text-2xl text-white border border-white/20">
                  {user.fullName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold truncate">{user.fullName}</h3>
                  <span className="text-xs text-blue-400 block font-mono">@{user.username}</span>
                  
                  {/* Public URL previews */}
                  <div className="flex flex-col gap-1 mt-3">
                    <div className="flex items-center justify-between bg-white/5 px-2 py-1 rounded-lg text-[9px] font-mono">
                      <span className="text-neutral-300">omni.com/@{user.username}</span>
                      <button 
                        onClick={() => handleCopy(`https://omni.com/@${user.username}`, 'pub_uri')} 
                        className="text-blue-400 hover:text-white"
                      >
                        {copiedText === 'pub_uri' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 px-2 py-1 rounded-lg text-[9px] font-mono">
                      <span className="text-neutral-300">{user.username}.omni.com</span>
                      <button 
                        onClick={() => handleCopy(`https://${user.username}.omni.com`, 'sub_uri')} 
                        className="text-blue-400 hover:text-white"
                      >
                        {copiedText === 'sub_uri' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">ID REFERENCE</span>
                  <span className="text-neutral-200 block truncate">{user.id}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">ACTIVE PROFILE</span>
                  <span className="text-blue-400 block uppercase font-bold">{user.currentProfileType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">ISO JURISDICTION</span>
                  <span className="text-neutral-200 block">{user.country} (UTC{user.timezone.includes('-') ? '-' : '+'}{user.timezone.split('/')[1] ? 'EDT' : 'NY'})</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] uppercase">CURRENCY UNIT</span>
                  <span className="text-neutral-200 block">{user.preferredCurrency} ($)</span>
                </div>
              </div>
            </div>

            {/* Profile Selection List */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-5 flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Maintain Multiple Profiles
              </span>
              
              <div className="flex flex-col gap-2">
                {user.profiles.map((p) => {
                  const isActive = user.currentProfileType === p.type;
                  return (
                    <div 
                      key={p.id} 
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isActive 
                          ? 'border-neutral-900 bg-neutral-50' 
                          : 'border-neutral-100 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">{p.type}</span>
                          {isActive && <span className="bg-neutral-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">Active</span>}
                        </div>
                        <p className="text-xs text-neutral-500 truncate mt-0.5">{p.displayName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isActive && (
                          <button
                            onClick={() => switchProfileType(p.type)}
                            className="px-2 py-1 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Switch
                          </button>
                        )}
                        <button
                          onClick={() => handleEditProfileInit(p.type)}
                          className="p-1.5 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-900 cursor-pointer"
                          title="Edit Profile"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Profile Editing Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Configure Profile: <span className="text-neutral-900 font-extrabold">{editingProfileType.toUpperCase()}</span>
                </span>
                <span className="text-xs text-neutral-400 font-mono">Single credentials shared</span>
              </div>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileDisplayName}
                      onChange={(e) => setProfileDisplayName(e.target.value)}
                      placeholder="e.g. Gideon Oluwalana"
                      className="px-3.5 py-2 border border-neutral-200 rounded-xl text-xs outline-none focus:border-neutral-900 bg-neutral-50"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Contact Email (Private)
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="px-3.5 py-2 border border-neutral-200 rounded-xl text-xs outline-none bg-neutral-100 text-neutral-400 font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Profile Bio / Description
                  </label>
                  <textarea
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    placeholder="Describe this profile context..."
                    rows={3}
                    className="px-3.5 py-2 border border-neutral-200 rounded-xl text-xs outline-none focus:border-neutral-900 bg-neutral-50 resize-none"
                  />
                </div>

                {editingProfileType !== 'personal' && (
                  <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Profile Type Metadata Bindings
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      {editingProfileType === 'professional' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">EMPLOYER / ORG</span>
                            <span className="font-bold">Dynasty Global Holdings</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">JOB TITLE</span>
                            <span className="font-bold">VP of Infrastructure</span>
                          </div>
                        </>
                      )}
                      {editingProfileType === 'creator' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">CHANNEL CHANNEL</span>
                            <span className="font-bold">Gideon Tech</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">AUDIENCE METRICS</span>
                            <span className="font-bold">124,000 global partners</span>
                          </div>
                        </>
                      )}
                      {editingProfileType === 'seller' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">MERCHANT REGISTER</span>
                            <span className="font-bold">Oluwalana Cloud Hardware</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">SELLER SCORE</span>
                            <span className="font-bold text-emerald-600">4.9 / 5.0 (99+ orders)</span>
                          </div>
                        </>
                      )}
                      {editingProfileType === 'developer' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">GITHUB BINDING</span>
                            <span className="font-mono font-bold">@gideon-dev</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">CORE LANGUAGES</span>
                            <span className="font-bold">TypeScript, Rust, Go</span>
                          </div>
                        </>
                      )}
                      {editingProfileType === 'affiliate' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">REFERRAL KEY</span>
                            <span className="font-mono font-bold text-blue-600">OMNIGID2026</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">COMMISSION REVENUE</span>
                            <span className="font-bold text-emerald-600">12% share</span>
                          </div>
                        </>
                      )}
                      {editingProfileType === 'investor' && (
                        <>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">SEC ACCREDITATION</span>
                            <span className="font-bold text-emerald-600">ACCREDITED INVESTOR</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-neutral-400">LIQUIDITY DEPLOYMENTS</span>
                            <span className="font-bold">18 seed startups</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-neutral-900 text-white rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer text-center"
                >
                  Save Profile Context
                </button>
              </form>
            </div>

            {/* Demographics Details */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                Demographics & Localization Attributes
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex flex-col gap-1 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 uppercase">LANGUAGE</span>
                  <span className="font-bold text-neutral-800">{user.language === 'en_US' ? 'English (US)' : user.language}</span>
                </div>
                <div className="flex flex-col gap-1 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 uppercase">COUNTRY</span>
                  <span className="font-bold text-neutral-800">{user.country === 'US' ? 'United States' : user.country}</span>
                </div>
                <div className="flex flex-col gap-1 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 uppercase">TIMEZONE</span>
                  <span className="font-bold text-neutral-800">{user.timezone}</span>
                </div>
                <div className="flex flex-col gap-1 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <span className="text-[10px] text-neutral-400 uppercase">CURRENCY UNIT</span>
                  <span className="font-bold text-neutral-800">{user.preferredCurrency} (USD)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Security & Session Guard */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Device sessions, passkeys, sso */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Device & Session management */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                    Session & Device Management
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">Revoke active sessions instantly</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {user.security.activeSessions.length} sessions active
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {user.security.activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-800">{session.deviceName}</span>
                        {session.isCurrent && (
                          <span className="bg-emerald-100 text-emerald-800 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-500 font-mono text-[10px] mt-1">
                        IP: {session.ipAddress} • {session.browser} • {session.location}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Established: {new Date(session.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {!session.isCurrent && (
                      <button
                        onClick={() => revokeActiveSession(session.id)}
                        className="px-2.5 py-1 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Passkey (WebAuthn) Manager */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                    Passkey Security Registry
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">Cryptographic WebAuthn passwordless credentials</span>
                </div>
                <button
                  onClick={() => setPasskeyModalOpen(true)}
                  className="inline-flex items-center gap-1 bg-neutral-900 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Passkey
                </button>
              </div>

              {user.security.passkeys.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-400">
                  No cryptographic passkeys registered.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {user.security.passkeys.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                      <div>
                        <span className="font-bold text-neutral-800 block">{p.name}</span>
                        <span className="text-[9px] text-neutral-400 font-mono mt-0.5">Registered: {new Date(p.createdAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() => revokePasskey(p.id)}
                        className="p-1 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-lg cursor-pointer"
                        title="Delete Passkey"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SSO Configuration */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                Enterprise Identity Provider (SSO)
              </span>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                  <div className="text-xs">
                    <span className="font-bold block text-neutral-800">SAML SSO Mapping</span>
                    <span className="text-neutral-500 block text-[10px] mt-0.5">Federate auth to corporate Okta or Azure AD</span>
                  </div>
                  <button
                    onClick={() => {
                      const next = !ssoEnabled;
                      setSsoEnabled(next);
                      updateEnterpriseSso(idpName, entityId, ssoUrl, next);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer ${ssoEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`}
                  >
                    {ssoEnabled ? 'Active' : 'Disabled'}
                  </button>
                </div>

                {ssoEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold">IdP Provider Name</span>
                      <input
                        type="text"
                        value={idpName}
                        onChange={(e) => {
                          setIdpName(e.target.value);
                          updateEnterpriseSso(e.target.value, entityId, ssoUrl, ssoEnabled);
                        }}
                        className="px-3 py-1.5 border border-neutral-200 rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold">Metadata Entity ID</span>
                      <input
                        type="text"
                        value={entityId}
                        onChange={(e) => {
                          setEntityId(e.target.value);
                          updateEnterpriseSso(idpName, e.target.value, ssoUrl, ssoEnabled);
                        }}
                        className="px-3 py-1.5 border border-neutral-200 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold">Federated SSO URL</span>
                      <input
                        type="text"
                        value={ssoUrl}
                        onChange={(e) => {
                          setSsoUrl(e.target.value);
                          updateEnterpriseSso(idpName, entityId, e.target.value, ssoEnabled);
                        }}
                        className="px-3 py-1.5 border border-neutral-200 rounded-lg font-mono text-[10px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Recovery, login logs, suspicious simulators */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* MFA & Recovery Codes Panel */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-4">
                Authenticator Recovery Keys
              </span>

              <div className="bg-yellow-50/50 border border-yellow-200 p-4 rounded-2xl mb-4 text-xs flex gap-3 text-yellow-800">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p>
                  Store these emergency keys in a physical safe. Each recovery code can be used once to bypass TOTP MFA if your device is compromised.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] mb-4 text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                {user.security.recoveryCodes.map((code) => (
                  <div key={code} className="flex items-center justify-between px-2.5 py-1 hover:bg-neutral-100 rounded">
                    <span>{code}</span>
                    <button onClick={() => handleCopy(code, code)} className="text-neutral-400 hover:text-neutral-900 cursor-pointer">
                      {copiedText === code ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>

              {/* Recovery code test simulation */}
              <form onSubmit={handleRecoveryTest} className="flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Verify Recovery Code Simulator
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={recoveryInput}
                    onChange={(e) => {
                      setRecoveryInput(e.target.value);
                      setRecoveryStatus('idle');
                    }}
                    placeholder="Enter OMNI recovery code"
                    className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-lg text-xs outline-none bg-neutral-50 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Test
                  </button>
                </div>
                {recoveryStatus === 'success' && (
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Code Authorized. MFA Bypass simulation passed.
                  </p>
                )}
                {recoveryStatus === 'error' && (
                  <p className="text-[10px] text-red-600 font-bold flex items-center gap-1 mt-1">
                    <XCircle className="w-3.5 h-3.5" /> Code Rejected. Verification signature failed.
                  </p>
                )}
              </form>
            </div>

            {/* Suspicious Hook Simulator */}
            <div className="bg-red-50/40 border border-red-100 rounded-3xl p-5 flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 block">
                  Suspicious-Login Sandbox Hook
                </span>
                <p className="text-xs text-neutral-500 mt-1">
                  Trigger a simulated anomalous login route (e.g. proxy proxy login) to verify active compliance warnings.
                </p>
              </div>

              <button
                onClick={triggerSuspiciousLoginHook}
                className="w-full bg-red-100 text-red-700 hover:bg-red-200 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                Trigger Suspicious Login Check
              </button>
            </div>

            {/* Login History Logs */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-3">
                Session Authentication History
              </span>

              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {user.security.loginHistory.map((h) => (
                  <div key={h.id} className="flex gap-3 text-xs border-b border-neutral-50 pb-2.5 last:border-0 last:pb-0">
                    <div className="mt-0.5">
                      {h.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {h.status === 'suspicious' && <ShieldAlert className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-800">{h.location}</span>
                        <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${h.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-100 text-red-800 animate-pulse'}`}>
                          {h.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                        {h.ipAddress} • {h.browser} • Type: <span className="uppercase">{h.type}</span>
                      </p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">{new Date(h.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Organizations & Trust */}
      {activeTab === 'trust' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Organizations Swapping & Deployments */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                    Your Linked Organizations
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">Hot-swap active operational tenant context</span>
                </div>
                <button
                  onClick={() => setNewOrgModalOpen(true)}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Deploy Org
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {state.organizations.map((org) => {
                  const isCurrent = org.id === state.currentOrgId;
                  return (
                    <div 
                      key={org.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isCurrent 
                          ? 'border-neutral-900 bg-neutral-50/55' 
                          : 'border-neutral-100 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-extrabold text-neutral-900">{org.name}</span>
                          <span className="bg-neutral-100 text-neutral-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">
                            {org.orgType || 'COMPANY'}
                          </span>
                          {isCurrent && (
                            <span className="bg-neutral-900 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                          Subdomains: {org.subdomains.join(', ')}
                        </p>
                        <div className="flex gap-2 items-center mt-1 text-[10px] text-neutral-400">
                          <span>Plan: <span className="uppercase text-neutral-700 font-semibold">{org.billingPlan}</span></span>
                          <span>•</span>
                          <span>Wallet Balance: <span className="text-emerald-600 font-bold">${org.walletBalance.toLocaleString()}</span></span>
                        </div>
                      </div>

                      {!isCurrent && (
                        <button
                          onClick={() => switchOrg(org.id)}
                          className="bg-neutral-900 text-white hover:bg-neutral-800 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Switch
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance verification configuration */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                    Account Verification & KYC Adapters
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">Configure compliance adapter states</span>
                </div>
                <button
                  onClick={() => {
                    setKybVerifyType('identity');
                    setKybModalOpen(true);
                  }}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Run KYC Verify
                </button>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                {/* Email Verification */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <span className="font-bold text-neutral-800">Email Address Binding</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Verified via security PIN</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.verificationStatus.emailVerified}
                    onChange={(e) => updateVerificationConfig('emailVerified', e.target.checked)}
                    className="w-4 h-4 accent-neutral-900"
                  />
                </div>

                {/* Phone Verification */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <span className="font-bold text-neutral-800">SMS Gateway Binding</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Verified via OTP callback</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.verificationStatus.phoneVerified}
                    onChange={(e) => updateVerificationConfig('phoneVerified', e.target.checked)}
                    className="w-4 h-4 accent-neutral-900"
                  />
                </div>

                {/* KYC Identity Verification */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <span className="font-bold text-neutral-800">KYC Government Identity</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Passport, Face-Scan, Address Validation</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={user.verificationStatus.identityVerified}
                    onChange={(e) => updateVerificationConfig('identityVerified', e.target.checked)}
                    className="w-4 h-4 accent-neutral-900"
                  />
                </div>

                {/* Organization KYB */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div>
                    <span className="font-bold text-neutral-800">KYB Business Registry (Corporate)</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">Middesk / Persona entity checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setKybVerifyType('organization');
                        setKybModalOpen(true);
                      }}
                      className="text-[9px] font-bold px-2 py-0.5 border border-neutral-300 rounded hover:border-neutral-900"
                    >
                      Verify Business
                    </button>
                    <input
                      type="checkbox"
                      checked={currentOrg?.kybVerified || false}
                      disabled
                      className="w-4 h-4 cursor-not-allowed accent-neutral-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Granular authorization permissions matrix (RBAC) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Fine-Grained RBAC & ABAC Permissions Matrix
              </span>
              <p className="text-xs text-neutral-500 mb-4">
                Applications register custom scopes dynamically. Users switch organizations to isolate permissions.
              </p>

              <div className="bg-neutral-900 text-white rounded-2xl p-4 text-xs font-mono mb-4 border border-neutral-800">
                <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                  <span className="text-neutral-400 text-[10px] uppercase">Active Org Context</span>
                  <span className="font-bold text-blue-400">{currentOrg?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 text-[10px] uppercase">My Assigned Role</span>
                  <span className="font-bold text-emerald-400 uppercase">{user.role}</span>
                </div>
              </div>

              {/* Scope Table */}
              <div className="flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">
                  Registered Application Permissions Status
                </span>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-neutral-800 block">ads.campaign.create</span>
                      <span className="text-[10px] text-neutral-400">Allows creation of bidding campaigns in Ads</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      GRANTED
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-neutral-800 block">market.product.manage</span>
                      <span className="text-[10px] text-neutral-400">Allows publishing inventory catalogs in Market</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      GRANTED
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-neutral-800 block">learn.course.publish</span>
                      <span className="text-[10px] text-neutral-400">Allows certification publishing in Learn</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      GRANTED
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 bg-neutral-50">
                    <div className="min-w-0">
                      <span className="font-mono font-bold text-neutral-800 block">business.payroll.view</span>
                      <span className="text-[10px] text-neutral-400">Allows executing salary allocations in Business</span>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      GRANTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Passport API & OAuth */}
      {activeTab === 'oauth' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* OAuth Simulator Section */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Connected Applications & Scope Consent
              </span>
              <p className="text-xs text-neutral-500 mb-4">
                Users control which OMNI apps hold session scopes. Grant or revoke OAuth tokens in real-time.
              </p>

              <div className="flex flex-col gap-3">
                {user.connectedApps.length === 0 ? (
                  <div className="text-center py-6 text-xs text-neutral-400">
                    No connected applications authorized.
                  </div>
                ) : (
                  user.connectedApps.map((app) => (
                    <div key={app.appId} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-extrabold text-neutral-800 block">{app.appName}</span>
                          <span className="text-[9px] text-neutral-400 font-mono">Granted: {new Date(app.authorizedAt).toLocaleDateString()}</span>
                        </div>
                        <button
                          onClick={() => revokeConnectedAppConsent(app.appId)}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 hover:text-red-800 rounded font-bold uppercase tracking-wider text-[10px] cursor-pointer"
                        >
                          Revoke Access
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {app.scopes.map((scope) => (
                          <span key={scope} className="bg-neutral-200 text-neutral-700 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Run OAuth Consent Flow trigger */}
              <div className="mt-5 border-t border-neutral-100 pt-4">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-3">
                  Developer OAuth Consent Simulator
                </span>

                <div className="flex flex-col gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold uppercase text-neutral-400">Target Workspace App</span>
                      <select
                        value={oauthAppId}
                        onChange={(e) => {
                          setOauthAppId(e.target.value);
                          setOauthAppName(e.target.value === 'app_ads' ? 'Ads' : e.target.value === 'app_pay' ? 'Pay' : 'Learn');
                          setOauthScopes(e.target.value === 'app_ads' ? ['identity.read', 'ads.campaign.create'] : ['identity.read', 'wallet.ledger.write']);
                        }}
                        className="px-2 py-1.5 border border-neutral-200 rounded bg-white text-xs"
                      >
                        <option value="app_ads">OMNI Ads App</option>
                        <option value="app_pay">OMNI Pay App</option>
                        <option value="app_learn">OMNI Academy</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold uppercase text-neutral-400">OAuth Scope</span>
                      <span className="font-mono text-[10px] bg-neutral-200 p-1 rounded font-bold text-center block truncate">
                        {oauthScopes.join(', ')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOauthSimOpen(true)}
                    className="w-full bg-neutral-900 text-white hover:bg-neutral-800 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-center"
                  >
                    Simulate OIDC Consent Handshake
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* API Playground Console */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                OMNI Passport Live API Playground
              </span>
              <p className="text-xs text-neutral-500 mb-4">
                Test passport authentication queries, scope evaluations, and organization asserts directly.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <button
                  onClick={() => executeApiCall('/api/passport/authenticate')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer ${apiEndpoint === '/api/passport/authenticate' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  POST /authenticate
                </button>
                <button
                  onClick={() => executeApiCall('/api/passport/profile')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer ${apiEndpoint === '/api/passport/profile' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  GET /profile
                </button>
                <button
                  onClick={() => executeApiCall('/api/passport/organization')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer ${apiEndpoint === '/api/passport/organization' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  GET /organization
                </button>
                <button
                  onClick={() => executeApiCall('/api/passport/evaluate-permission')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer ${apiEndpoint === '/api/passport/evaluate-permission' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  POST /evaluate-permission
                </button>
              </div>

              {/* Dark response console */}
              <div className="relative">
                <span className="absolute right-2 top-2 text-[9px] font-mono text-neutral-500 uppercase">
                  OIDC Response Payload
                </span>
                <textarea
                  value={apiResponse || '// Select an endpoint above to fire query assertions.'}
                  readOnly
                  rows={10}
                  className="w-full bg-neutral-950 text-neutral-300 p-4 rounded-2xl font-mono text-xs outline-none border border-neutral-800 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Security Audit Logs & Isolation Test */}
      {activeTab === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Identity Specific Audit Log Filter */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Sovereign Identity Security Audit Log
              </span>
              <p className="text-xs text-neutral-500 mb-4">
                Real-time blockchain-like immutable event stream tracking logins, role adjustments, and ownership transfers.
              </p>

              <div className="flex flex-col gap-3.5 max-h-[480px] overflow-y-auto pr-1">
                {state.auditLogs
                  .filter(l => ['PASSPORT_PROFILE_UPDATE', 'PASSPORT_PROFILE_SWITCH', 'SESSION_REVOKED', 'APP_CONSENT_REVOKED', 'APP_CONSENT_GRANTED', 'SECURITY_PASSKEY_CREATED', 'SECURITY_PASSKEY_REVOKED', 'SECURITY_SSO_UPDATE', 'VERIFICATION_CHANGE', 'ROLE_CHANGE', 'OWNERSHIP_TRANSFER', 'MFA_REGISTRATION', 'ORGANIZATION_CREATED', 'ORGANIZATION_SWITCH'].includes(l.action))
                  .map((log) => (
                    <div key={log.id} className="text-xs border-b border-neutral-50 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <span className="font-mono font-bold text-blue-600 uppercase text-[10px]">
                          {log.action}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-neutral-700 mt-1">{log.details}</p>
                      <div className="flex gap-2 text-[9px] text-neutral-400 mt-1 font-mono">
                        <span>BY: {log.userEmail}</span>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Cross-Org Isolation Testing Suite */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Cross-Organization Isolation Test Suite
              </span>
              <p className="text-xs text-neutral-500 mb-4">
                Assert that data contexts (wallets, API keys, webhooks) are completely isolated and never leak across organizations.
              </p>

              {/* Side-by-Side Test Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                
                {/* Org A */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-extrabold uppercase text-neutral-800">Org Context A</span>
                  </div>
                  <div className="flex flex-col gap-2 font-mono text-[10px]">
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">NAME</span>
                      <span className="font-bold text-neutral-900">Dynasty Global</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">LEDGER CODES</span>
                      <span className="font-bold text-emerald-600 truncate block">$4,280,550</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">API SCOPES</span>
                      <span className="text-neutral-900 truncate block">identity.read, wallet.ledger.read</span>
                    </div>
                  </div>
                </div>

                {/* Org B */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-extrabold uppercase text-neutral-800">Org Context B</span>
                  </div>
                  <div className="flex flex-col gap-2 font-mono text-[10px]">
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">NAME</span>
                      <span className="font-bold text-neutral-900 font-sans">Oluwalana Tech</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">LEDGER CODES</span>
                      <span className="font-bold text-emerald-600 truncate block">$125,000</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-neutral-400 block">API SCOPES</span>
                      <span className="text-neutral-400 italic block">None generated</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Isolation test launcher */}
              <div className="bg-neutral-950 text-neutral-300 p-4 rounded-2xl border border-neutral-800 font-mono text-xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase font-extrabold">Isolation Verification Log</span>
                  <span className="text-emerald-500 text-[9px] font-bold">SECURE AA+</span>
                </div>
                
                <p className="text-[11px] text-neutral-400">
                  [SYSTEM] Initializing isolation check vectors...
                </p>
                <p className="text-[11px] text-emerald-400">
                  [PASS] Assert: wallet_dynasty cannot access wallet_sandbox context (OK)
                </p>
                <p className="text-[11px] text-emerald-400">
                  [PASS] Assert: webhook credentials restricted to matching organization context slug (OK)
                </p>
                <p className="text-[11px] text-emerald-400">
                  [PASS] Assert: API client credentials restricted strictly to authorized organization token queries (OK)
                </p>
                <p className="text-[11px] text-neutral-400">
                  [SYSTEM] Compliance assertions completed: 100% data context isolated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Create Organization */}
      {newOrgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-neutral-950/30 backdrop-blur-sm" onClick={() => setNewOrgModalOpen(false)} />
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Deploy Corporate Workspace</span>
              <button onClick={() => setNewOrgModalOpen(false)} className="p-1 hover:bg-neutral-50 rounded text-neutral-400 hover:text-neutral-950">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrgSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Workspace Name</label>
                <input
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g. Oluwalana Academy"
                  className="px-3 py-2 border border-neutral-200 rounded-xl text-xs outline-none focus:border-neutral-950 bg-neutral-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Corporate Type</label>
                  <select
                    value={newOrgType}
                    onChange={(e: any) => setNewOrgType(e.target.value)}
                    className="px-2.5 py-2 border border-neutral-200 rounded-xl bg-neutral-50 text-xs"
                  >
                    <option value="company">Company</option>
                    <option value="school">School / Academy</option>
                    <option value="NGO">Non-Profit (NGO)</option>
                    <option value="government">Government Dept</option>
                    <option value="merchant">Merchant Org</option>
                    <option value="creator_team">Creator Team</option>
                    <option value="agency">Agency</option>
                    <option value="reseller">Reseller</option>
                    <option value="white_label">White-Label Operator</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Billing Plan</label>
                  <select
                    value={newOrgPlan}
                    onChange={(e: any) => setNewOrgPlan(e.target.value)}
                    className="px-2.5 py-2 border border-neutral-200 rounded-xl bg-neutral-50 text-xs"
                  >
                    <option value="free">Free Trial ($100)</option>
                    <option value="growth">Growth ($15,000)</option>
                    <option value="enterprise">Enterprise ($250,000)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase tracking-wider rounded-xl py-2.5 text-xs mt-2 cursor-pointer"
              >
                Deploy Workspace context
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Passkey */}
      {passkeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-neutral-950/30 backdrop-blur-sm" onClick={() => setPasskeyModalOpen(false)} />
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 w-full max-w-sm relative z-10 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Register Cryptographic Passkey</span>
              <button onClick={() => setPasskeyModalOpen(false)} className="p-1 hover:bg-neutral-50 rounded text-neutral-400">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs text-neutral-500">
                Registering a passkey simulates the browser WebAuthn FIDO2 ceremony, generating a local cryptographic key pair on your machine.
              </p>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Passkey Label Name</label>
                <input
                  type="text"
                  value={newPasskeyName}
                  onChange={(e) => setNewPasskeyName(e.target.value)}
                  placeholder="e.g. TouchID MacBook Pro Key"
                  className="px-3 py-2 border border-neutral-200 rounded-xl text-xs outline-none focus:border-neutral-950 bg-neutral-50"
                />
              </div>

              <button
                onClick={() => {
                  if (!newPasskeyName.trim()) return;
                  registerPasskey(newPasskeyName);
                  setNewPasskeyName('');
                  setPasskeyModalOpen(false);
                }}
                className="bg-neutral-900 text-white font-bold uppercase tracking-wider rounded-xl py-2.5 text-xs mt-1 cursor-pointer"
              >
                Initiate Ceremony Check
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: KYC/KYB Adapter Verification */}
      {kybModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-neutral-950/30 backdrop-blur-sm" onClick={() => setKybModalOpen(false)} />
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                OMNI Compliance Verify Adapter
              </span>
              <button onClick={() => setKybModalOpen(false)} className="p-1 hover:bg-neutral-50 rounded text-neutral-400">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <p className="text-neutral-500 leading-relaxed">
                Connect and execute an automated compliance scan using established validation provider SDK interfaces.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Verification Provider</span>
                  <select
                    value={kybProvider}
                    onChange={(e) => setKybProvider(e.target.value)}
                    className="px-2 py-1.5 border border-neutral-200 rounded bg-neutral-50 text-xs"
                  >
                    <option value="Persona">Persona ID</option>
                    <option value="Stripe Identity">Stripe Identity</option>
                    <option value="Sumsub">Sumsub Core</option>
                    <option value="Middesk">Middesk Bureau</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold">Assert Type</span>
                  <select
                    value={kybVerifyType}
                    onChange={(e: any) => setKybVerifyType(e.target.value)}
                    className="px-2 py-1.5 border border-neutral-200 rounded bg-neutral-50 text-xs"
                  >
                    <option value="identity">KYC: Personal ID Check</option>
                    <option value="organization">KYB: Organization Verify</option>
                    <option value="business">KYB: General Business Verify</option>
                  </select>
                </div>
              </div>

              {/* File uploading placeholder */}
              <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-900 rounded-2xl p-6 text-center cursor-pointer bg-neutral-50 flex flex-col items-center justify-center gap-2">
                <FileText className="w-8 h-8 text-neutral-400" />
                <span className="font-extrabold text-neutral-700">Drag & Drop KYC Document Here</span>
                <span className="text-[10px] text-neutral-400 block">Supports PDF, PNG, JPG (Max 10MB)</span>
              </div>

              {kybSimulating ? (
                <div className="text-center py-4 flex flex-col items-center gap-2">
                  <RefreshCw className="w-8 h-8 text-neutral-800 animate-spin" />
                  <span className="font-bold text-neutral-700">Provider Scanning Compliance Vectors...</span>
                </div>
              ) : kybSuccess ? (
                <div className="text-center py-4 text-emerald-600 font-bold flex flex-col items-center gap-1.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  <span>Scanning complete. Identity state updated successfully!</span>
                </div>
              ) : (
                <button
                  onClick={handleRunVerificationSubmit}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl py-2.5 font-bold uppercase tracking-wider text-xs cursor-pointer text-center"
                >
                  Initiate Document Verification
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: OAuth Simulator Consent Popups */}
      {oauthSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md animate-in fade-in duration-200" />
          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl border border-neutral-200 flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-200">
            
            <div className="flex justify-between items-start border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  O
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">OMNI OAuth Consent</span>
              </div>
              <button onClick={() => setOauthSimOpen(false)} className="text-neutral-400 hover:text-neutral-950 p-0.5 rounded-lg">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center font-bold text-2xl border">
                {oauthAppName.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">Authorize {oauthAppName} App?</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  The application is requesting permissions to access your secure OMNI Passport context.
                </p>
              </div>
            </div>

            {/* Scopes list */}
            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex flex-col gap-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">
                Requested scopes (read/write access)
              </span>

              <div className="flex flex-col gap-2">
                {oauthScopes.map((scope) => (
                  <div key={scope} className="flex gap-2 text-xs">
                    <CheckSquare className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono font-bold text-neutral-800">{scope}</span>
                      <p className="text-[10px] text-neutral-400">
                        {scope === 'identity.read' && 'Access OMNI User ID, name and public profiles.'}
                        {scope === 'ads.campaign.create' && 'Allow creation and modification of advertising campaign matrices.'}
                        {scope === 'wallet.ledger.write' && 'Access and post dynamic payments and settlements.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setOauthSimOpen(false)}
                className="py-2.5 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-neutral-600 text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  authorizeConnectedApp(oauthAppId, oauthAppName, oauthScopes);
                  setOauthSimOpen(false);
                }}
                className="py-2.5 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl text-center cursor-pointer"
              >
                Grant Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
