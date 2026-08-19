import React, { useState } from 'react';
import {
  Upload,
  Plus,
  FileCode,
  DollarSign,
  Layers,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Edit,
  History,
  Trash2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Building,
  CreditCard,
  Zap,
  Tag,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Sliders,
  Settings
} from 'lucide-react';
import {
  OmniDeveloperExtensionItem,
  ExtensionDeveloperProfile,
  ExtensionArchitectureTarget,
  ExtensionPricingModel,
  ExtensionVersionRelease
} from '../../../types';
import { omniExtensionEcosystemService } from '../../../sdk/browser-services/OmniExtensionEcosystemService';
import { OmniExtensionSecurityAuditModal } from './OmniExtensionSecurityAuditModal';

interface OmniDeveloperPortalViewProps {
  onNavigateStore?: (extensionId?: string) => void;
}

export const OmniDeveloperPortalView: React.FC<OmniDeveloperPortalViewProps> = ({
  onNavigateStore
}) => {
  const [profile, setProfile] = useState<ExtensionDeveloperProfile>(
    omniExtensionEcosystemService.getDeveloperProfile()
  );
  const [extensions, setExtensions] = useState<OmniDeveloperExtensionItem[]>(
    omniExtensionEcosystemService.getExtensions()
  );

  const [activeTab, setActiveTab] = useState<'my_extensions' | 'submit_new' | 'economy' | 'audit_queue'>('my_extensions');
  const [selectedAuditExtension, setSelectedAuditExtension] = useState<OmniDeveloperExtensionItem | null>(null);

  // New Extension Submission Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [category, setCategory] = useState<OmniDeveloperExtensionItem['category']>('productivity');
  const [architecture, setArchitecture] = useState<ExtensionArchitectureTarget>('chrome_mv3');
  const [supportedArchs, setSupportedArchs] = useState<ExtensionArchitectureTarget[]>([
    'chrome_mv3',
    'omni_native'
  ]);
  const [version, setVersion] = useState('1.0.0');
  const [changelog, setChangelog] = useState('Initial public release.');
  const [pricingModel, setPricingModel] = useState<ExtensionPricingModel>('free');
  const [priceUsd, setPriceUsd] = useState(0);
  const [monthlySubPriceUsd, setMonthlySubPriceUsd] = useState(4.99);
  const [enterpriseSeatPriceUsd, setEnterpriseSeatPriceUsd] = useState(29.00);
  const [isEnterpriseEligible, setIsEnterpriseEligible] = useState(true);
  const [permissionsInput, setPermissionsInput] = useState('activeTab, storage, declarativeNetRequest');
  const [manifestJsonInput, setManifestJsonInput] = useState(`{
  "manifest_version": 3,
  "name": "My OMNI Extension",
  "version": "1.0.0",
  "description": "Empowering sovereign web intelligence",
  "permissions": ["activeTab", "storage", "declarativeNetRequest"]
}`);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleSupportedArch = (arch: ExtensionArchitectureTarget) => {
    if (supportedArchs.includes(arch)) {
      if (supportedArchs.length > 1) {
        setSupportedArchs(supportedArchs.filter(a => a !== arch));
      }
    } else {
      setSupportedArchs([...supportedArchs, arch]);
    }
  };

  const handleSubmitExtension = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !version.trim()) {
      showToast('Please fill in required fields (Name, Version).');
      return;
    }

    const perms = permissionsInput
      .split(',')
      .map(p => p.trim())
      .filter(Boolean);

    const newExt = omniExtensionEcosystemService.submitNewExtension({
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      tagline: tagline.trim() || 'High-performance extension for OMNI Browser',
      descriptionMarkdown: descriptionMarkdown.trim() || 'Comprehensive extension features and capabilities.',
      category,
      architecture,
      supportedArchitectures: supportedArchs,
      version: version.trim(),
      changelog: changelog.trim(),
      manifestJson: manifestJsonInput,
      pricingModel,
      priceUsd: pricingModel === 'one_time' ? priceUsd : 0,
      monthlySubPriceUsd: pricingModel.includes('subscription') ? monthlySubPriceUsd : undefined,
      enterpriseSeatPriceUsd: isEnterpriseEligible ? enterpriseSeatPriceUsd : undefined,
      isEnterpriseEligible,
      permissions: perms
    });

    setExtensions(omniExtensionEcosystemService.getExtensions());
    setProfile(omniExtensionEcosystemService.getDeveloperProfile());
    showToast(`Extension "${newExt.name}" submitted! Security scan initiated.`);
    setActiveTab('my_extensions');

    // Reset Form
    setName('');
    setSlug('');
    setTagline('');
    setDescriptionMarkdown('');
  };

  const handleAdvanceReview = (extId: string) => {
    const updated = omniExtensionEcosystemService.advanceReviewStage(extId);
    if (updated) {
      setExtensions(omniExtensionEcosystemService.getExtensions());
      setProfile(omniExtensionEcosystemService.getDeveloperProfile());
      if (selectedAuditExtension?.id === extId) {
        setSelectedAuditExtension(updated);
      }
      showToast(`Extension advanced to: ${updated.reviewStatus.toUpperCase()}`);
    }
  };

  return (
    <div className="space-y-6 text-stone-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-14 right-8 z-50 px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Developer Portal Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/50 border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                developers.browser.omni.com
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> KYC Verified ISV
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-100">
              OMNI Extension Developer Ecosystem & Console
            </h2>
            <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
              Build, review, test sandbox compatibility, price, and distribute Chrome-compatible, Firefox-compatible, and native OMNI WebExtensions with sovereign double-entry monetization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('submit_new')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Extension</span>
            </button>
            {onNavigateStore && (
              <button
                onClick={() => onNavigateStore()}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Browse Store</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Developer Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-800/80">
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Total Submissions</div>
            <div className="text-lg font-bold text-stone-100">{profile.totalSubmissions} Extensions</div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Live in Store</div>
            <div className="text-lg font-bold text-emerald-400">{profile.publishedCount} Published</div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Accrued Revenue (90% Split)</div>
            <div className="text-lg font-bold text-indigo-300">
              ${profile.accruedRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">OMNI Core Ledger Payout</div>
            <div className="text-lg font-bold text-emerald-400">
              ${profile.pendingPayoutUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Console Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 text-xs overflow-x-auto">
        {[
          { id: 'my_extensions', label: 'My Submissions & Versions', count: extensions.length },
          { id: 'submit_new', label: 'Submit New Extension', icon: Plus },
          { id: 'economy', label: 'Extension Economy & Monetization (90/10 Split)' },
          { id: 'audit_queue', label: 'DevSecOps Review Pipeline' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono text-[10px]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: MY EXTENSIONS & VERSION MANAGEMENT */}
      {activeTab === 'my_extensions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-100">Managed Extensions</h3>
            <span className="text-xs text-stone-400">
              Showing {extensions.length} extensions across Chrome MV3, Firefox, and OMNI Native architectures.
            </span>
          </div>

          <div className="space-y-3">
            {extensions.map(ext => (
              <div
                key={ext.id}
                className="p-5 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400 shrink-0">
                      {ext.category === 'ai' ? (
                        <Sparkles className="w-6 h-6" />
                      ) : ext.category === 'security' || ext.category === 'privacy' ? (
                        <ShieldCheck className="w-6 h-6" />
                      ) : (
                        <FileCode className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-base font-bold text-stone-100">{ext.name}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-stone-800 font-mono text-stone-300 text-[10px]">
                          v{ext.currentVersion}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            ext.reviewStatus === 'published'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : ext.reviewStatus === 'approval'
                              ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                              : ext.reviewStatus === 'permission_review'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : 'bg-stone-800 text-stone-300'
                          }`}
                        >
                          {ext.reviewStatus.replace('_', ' ')}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-[10px]">
                          {ext.architecture}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-1">{ext.tagline}</p>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedAuditExtension(ext)}
                      className="px-3 py-1.5 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Security Audit</span>
                    </button>
                    {ext.reviewStatus !== 'published' && (
                      <button
                        onClick={() => handleAdvanceReview(ext.id)}
                        className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Advance Stage</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Architecture & Pricing Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-800/80 text-xs">
                  <div className="text-stone-400">
                    <span className="text-stone-500">Pricing:</span>{' '}
                    <span className="font-semibold text-stone-200 font-mono">
                      {ext.pricingModel === 'free'
                        ? 'Free'
                        : ext.pricingModel === 'one_time'
                        ? `$${ext.priceUsd.toFixed(2)} one-time`
                        : `$${(ext.monthlySubPriceUsd || 4.99).toFixed(2)}/mo`}
                    </span>
                  </div>
                  <div className="text-stone-400">
                    <span className="text-stone-500">Installs:</span>{' '}
                    <span className="font-semibold text-stone-200 font-mono">
                      {ext.activeInstallsCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-stone-400">
                    <span className="text-stone-500">Revenue:</span>{' '}
                    <span className="font-semibold text-emerald-400 font-mono">
                      ${ext.totalRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-stone-400 truncate">
                    <span className="text-stone-500">Supported:</span>{' '}
                    <span className="font-semibold text-indigo-300 font-mono text-[10px]">
                      {ext.supportedArchitectures.join(', ')}
                    </span>
                  </div>
                </div>

                {/* Versions Release History */}
                <div className="p-3 bg-stone-950/80 border border-stone-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-400">
                    <span>Version Releases ({ext.versions.length})</span>
                    <span className="text-[10px] font-mono text-stone-500">SHA-256 Validated</span>
                  </div>
                  <div className="space-y-1.5">
                    {ext.versions.map((ver, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-stone-900/50 rounded-lg flex items-center justify-between text-xs text-stone-300 font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-400">v{ver.version}</span>
                          <span className="text-stone-500 text-[10px]">{ver.releaseDate}</span>
                          <span className="text-stone-400 truncate max-w-xs">{ver.changelog}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-stone-500">
                          <span>{(ver.packageSizeBytes / 1024).toFixed(0)} KB</span>
                          <span className="text-emerald-400">{ver.reviewStatus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SUBMIT NEW EXTENSION */}
      {activeTab === 'submit_new' && (
        <form onSubmit={handleSubmitExtension} className="space-y-6">
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-stone-100">Submit Extension for Automated Sandbox Review</h3>
              <p className="text-xs text-stone-400 mt-1">
                Upload your extension package and manifest for multi-target testing against Chrome MV3, Firefox WebExtensions, and native OMNI containers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Extension Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OMNI Smart Dark Reader"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Unique Slug / Package Identifier *</label>
                <input
                  type="text"
                  placeholder="e.g. smart-dark-reader"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-stone-300">Tagline / Short Summary *</label>
                <input
                  type="text"
                  placeholder="e.g. Intelligent high-contrast eye-safe inversion engine"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="productivity">Productivity & Tabs</option>
                  <option value="developer">Developer & DevSecOps</option>
                  <option value="security">Security & Encryption</option>
                  <option value="privacy">Privacy & Tracking Shields</option>
                  <option value="ai">AI & Machine Intelligence</option>
                  <option value="finance">Finance & Sovereign Web3</option>
                  <option value="enterprise">Enterprise & Fleet DLP</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Primary Target Architecture</label>
                <select
                  value={architecture}
                  onChange={(e) => setArchitecture(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                >
                  <option value="chrome_mv3">Chrome Manifest V3 (Standard)</option>
                  <option value="firefox_webextension">Firefox WebExtension (browser.*)</option>
                  <option value="omni_native">OMNI Sovereign Native WASM</option>
                  <option value="chrome_mv2">Legacy Chrome MV2 (Shimmed)</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-stone-300">Supported Target Architectures</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: 'chrome_mv3', label: 'Chrome MV3' },
                    { id: 'firefox_webextension', label: 'Firefox WebExt' },
                    { id: 'omni_native', label: 'OMNI Native' },
                    { id: 'chrome_mv2', label: 'Legacy MV2' }
                  ].map(arch => (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => handleToggleSupportedArch(arch.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        supportedArchs.includes(arch.id as any)
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-stone-950 border border-stone-800 text-stone-400'
                      }`}
                    >
                      {arch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Model Configuration */}
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    OMNI Core Monetization & Pricing Model (90/10 Split)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Instant Double-Entry Settlement</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'free', label: 'Free (Open Source / Zero Cost)' },
                  { id: 'one_time', label: 'One-Time Purchase' },
                  { id: 'subscription_monthly', label: 'Monthly Recurring Subscription' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPricingModel(p.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      pricingModel === p.id
                        ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200 ring-1 ring-emerald-600'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                    }`}
                  >
                    <div className="font-bold">{p.label}</div>
                  </button>
                ))}
              </div>

              {pricingModel === 'one_time' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.99"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(parseFloat(e.target.value) || 0)}
                    className="w-48 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {pricingModel === 'subscription_monthly' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Monthly Subscription (USD/mo)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.99"
                    value={monthlySubPriceUsd}
                    onChange={(e) => setMonthlySubPriceUsd(parseFloat(e.target.value) || 0)}
                    className="w-48 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}

              {/* Enterprise Extensions Toggle */}
              <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-200">Enterprise Fleet License Support</div>
                  <div className="text-[11px] text-stone-400">
                    Enables seat-based volume licensing for corporate organizations via OMNI Admin Console.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isEnterpriseEligible && (
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-stone-400">Seat:</span>
                      <input
                        type="number"
                        step="1"
                        min="5"
                        value={enterpriseSeatPriceUsd}
                        onChange={(e) => setEnterpriseSeatPriceUsd(parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1 bg-stone-950 border border-stone-700 rounded text-stone-100 text-xs font-mono"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsEnterpriseEligible(!isEnterpriseEligible)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                      isEnterpriseEligible ? 'bg-indigo-600' : 'bg-stone-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        isEnterpriseEligible ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Manifest JSON & Permissions */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">
                  Requested Permissions (Comma Separated) *
                </label>
                <input
                  type="text"
                  value={permissionsInput}
                  onChange={(e) => setPermissionsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-stone-500">
                  Note: Excessive permissions like \`&lt;all_urls&gt;\` or \`webRequestBlocking\` trigger manual security review.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">manifest.json Snippet *</label>
                <textarea
                  rows={5}
                  value={manifestJsonInput}
                  onChange={(e) => setManifestJsonInput(e.target.value)}
                  className="w-full p-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('my_extensions')}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Submit to Review Pipeline</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: EXTENSION ECONOMY & MONETIZATION */}
      {activeTab === 'economy' && (
        <div className="space-y-6">
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-100">OMNI Core Sovereign Billing Economics</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Automated double-entry settlement engine. 90% direct to verified developer wallet, 10% platform fee.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold rounded-lg">
                90% Developer Revenue Share
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
                <div className="text-xs text-stone-400">Total Ecosystem Sales</div>
                <div className="text-xl font-bold font-mono text-stone-100">
                  ${(profile.accruedRevenueUsd * 1.11).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-stone-500">Gross transaction volume</div>
              </div>

              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
                <div className="text-xs text-stone-400">Developer Net Earnings</div>
                <div className="text-xl font-bold font-mono text-indigo-300">
                  ${profile.accruedRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-emerald-400">90% net share settled</div>
              </div>

              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
                <div className="text-xs text-stone-400">Payout Wallet</div>
                <div className="text-xs font-bold font-mono text-stone-300 truncate">
                  {profile.payoutWalletAddress}
                </div>
                <div className="text-[10px] text-stone-500">Instant on-chain or fiat ACH transfer</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REVIEW PIPELINE QUEUE */}
      {activeTab === 'audit_queue' && (
        <div className="space-y-4">
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-100">DevSecOps Multi-Stage Review Queue</h3>
                <p className="text-xs text-stone-400 mt-1">
                  Workflow: submitted → security scan → permission review → approval → published
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {extensions.map(ext => (
                <div
                  key={ext.id}
                  className="p-4 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-100">{ext.name}</span>
                      <span className="text-xs text-stone-400 font-mono">v{ext.currentVersion}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {ext.reviewStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-mono">
                      Target: {ext.architecture} • Permissions: {ext.permissionsRequired.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedAuditExtension(ext)}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Audit Report
                    </button>
                    {ext.reviewStatus !== 'published' && (
                      <button
                        onClick={() => handleAdvanceReview(ext.id)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Advance
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security Review Modal */}
      {selectedAuditExtension && (
        <OmniExtensionSecurityAuditModal
          extension={selectedAuditExtension}
          isOpen={!!selectedAuditExtension}
          onClose={() => setSelectedAuditExtension(null)}
          onAdvanceReviewStage={() => handleAdvanceReview(selectedAuditExtension.id)}
        />
      )}
    </div>
  );
};
