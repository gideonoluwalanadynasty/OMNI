import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Star,
  Download,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sliders,
  DollarSign,
  Lock,
  Building,
  Terminal,
  Cpu,
  Zap,
  Globe,
  Tag,
  Info,
  ShieldAlert,
  Puzzle,
  Filter
} from 'lucide-react';
import {
  OmniDeveloperExtensionItem,
  ExtensionArchitectureTarget,
  ExtensionPricingModel
} from '../../../types';
import { omniExtensionEcosystemService } from '../../../sdk/browser-services/OmniExtensionEcosystemService';
import { OmniExtensionSecurityAuditModal } from './OmniExtensionSecurityAuditModal';

interface OmniExtensionStoreViewProps {
  onOpenDeveloperPortal?: () => void;
  onSelectExtension?: (extensionId: string) => void;
}

export const OmniExtensionStoreView: React.FC<OmniExtensionStoreViewProps> = ({
  onOpenDeveloperPortal,
  onSelectExtension
}) => {
  const [extensions, setExtensions] = useState<OmniDeveloperExtensionItem[]>(
    omniExtensionEcosystemService.getExtensions()
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArchitecture, setSelectedArchitecture] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedExtensionDetails, setSelectedExtensionDetails] = useState<OmniDeveloperExtensionItem | null>(null);
  const [selectedAuditExtension, setSelectedAuditExtension] = useState<OmniDeveloperExtensionItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleInstall = (ext: OmniDeveloperExtensionItem) => {
    if (ext.pricingModel !== 'free' && !ext.isPurchased) {
      // Purchase with OMNI Core Billing
      const result = omniExtensionEcosystemService.purchaseExtensionWithOmniBilling(
        ext.id,
        ext.pricingModel === 'subscription_monthly' ? 'subscription' : 'one_time'
      );
      if (result.success) {
        setExtensions(omniExtensionEcosystemService.getExtensions());
        showToast(`Purchased & Installed "${ext.name}" via OMNI Core Billing!`);
      }
    } else {
      omniExtensionEcosystemService.installExtension(ext.id);
      setExtensions(omniExtensionEcosystemService.getExtensions());
      showToast(`Installed "${ext.name}" in OMNI Browser.`);
    }
  };

  const handleUninstall = (ext: OmniDeveloperExtensionItem) => {
    omniExtensionEcosystemService.uninstallExtension(ext.id);
    setExtensions(omniExtensionEcosystemService.getExtensions());
    showToast(`Removed "${ext.name}" from active extensions.`);
  };

  // Filter extensions
  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.authorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || ext.category === selectedCategory;

    const matchesArch =
      selectedArchitecture === 'all' ||
      ext.architecture === selectedArchitecture ||
      ext.supportedArchitectures.includes(selectedArchitecture as any);

    const matchesPricing =
      selectedPricing === 'all' ||
      (selectedPricing === 'free' && ext.pricingModel === 'free') ||
      (selectedPricing === 'paid' && ext.pricingModel === 'one_time') ||
      (selectedPricing === 'subscription' && ext.pricingModel.includes('subscription')) ||
      (selectedPricing === 'enterprise' && ext.isEnterpriseEligible);

    return matchesSearch && matchesCategory && matchesArch && matchesPricing;
  });

  return (
    <div className="space-y-6 text-stone-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-14 right-8 z-50 px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Store Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-indigo-950/40 to-stone-900 border border-stone-800 p-6 sm:p-8">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold tracking-wider">
              store.browser.omni.com
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Zero-Trust Sandboxed
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 tracking-tight">
            OMNI Extension Marketplace & Ecosystem
          </h2>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Discover verified Chrome-compatible, Firefox-compatible, and native OMNI WebExtensions. Every extension is rigorously tested in isolated sandboxes for security, AST safety, and zero telemetry leaks.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {onOpenDeveloperPortal && (
              <button
                onClick={onOpenDeveloperPortal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Developer Console & Submissions</span>
              </button>
            )}
            <div className="px-3 py-1.5 bg-stone-950/80 border border-stone-800 rounded-xl text-[11px] text-stone-400 font-mono flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multi-architecture compatibility tested across 3 sandbox runners.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search extensions, creators, or capabilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Architecture Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedArchitecture}
              onChange={(e) => setSelectedArchitecture(e.target.value)}
              className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="all">All Architectures</option>
              <option value="chrome_mv3">Chrome MV3</option>
              <option value="firefox_webextension">Firefox WebExt</option>
              <option value="omni_native">OMNI Native WASM</option>
            </select>

            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free Only</option>
              <option value="paid">One-Time Paid</option>
              <option value="subscription">Subscriptions</option>
              <option value="enterprise">Enterprise Fleet</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'productivity', label: 'Productivity' },
            { id: 'privacy', label: 'Privacy & Shields' },
            { id: 'ai', label: 'AI & Copilots' },
            { id: 'developer', label: 'Developer Tools' },
            { id: 'security', label: 'Security & Auth' },
            { id: 'enterprise', label: 'Enterprise & DLP' },
            { id: 'finance', label: 'Finance & Web3' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Extensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExtensions.map(ext => {
          const isInstalled = ext.isInstalledInBrowser;
          const isFree = ext.pricingModel === 'free';

          return (
            <div
              key={ext.id}
              className="p-5 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                      {ext.category === 'ai' ? (
                        <Sparkles className="w-5 h-5" />
                      ) : ext.category === 'privacy' || ext.category === 'security' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <Puzzle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-100 group-hover:text-indigo-300 transition-colors">
                        {ext.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <span>by {ext.authorName}</span>
                        {ext.authorVerified && (
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-[10px] font-mono text-stone-400">
                    v{ext.currentVersion}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs text-stone-400 leading-snug line-clamp-2">
                  {ext.tagline}
                </p>

                {/* Architecture and Rating Badges */}
                <div className="flex items-center gap-2 flex-wrap text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono">
                    {ext.architecture}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold">{ext.ratingAverage}</span>
                    <span className="text-stone-500">({ext.ratingCount})</span>
                  </div>
                  <span className="text-stone-500 font-mono">
                    {ext.activeInstallsCount.toLocaleString()} users
                  </span>
                </div>
              </div>

              {/* Action Buttons & Pricing */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold font-mono text-stone-100">
                    {isFree
                      ? 'Free'
                      : ext.pricingModel === 'one_time'
                      ? `$${ext.priceUsd.toFixed(2)}`
                      : `$${(ext.monthlySubPriceUsd || 4.99).toFixed(2)}/mo`}
                  </div>
                  {ext.isEnterpriseEligible && (
                    <div className="text-[9px] text-indigo-400 uppercase font-semibold">
                      Enterprise Seat Ready
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedAuditExtension(ext)}
                    className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-400 hover:text-emerald-400 transition-colors"
                    title="Inspect Sandbox Security Audit"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>

                  {isInstalled ? (
                    <button
                      onClick={() => handleUninstall(ext)}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-rose-950 hover:text-rose-300 text-stone-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Installed</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInstall(ext)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isFree ? 'Get' : 'Buy & Install'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Audit Modal */}
      {selectedAuditExtension && (
        <OmniExtensionSecurityAuditModal
          extension={selectedAuditExtension}
          isOpen={!!selectedAuditExtension}
          onClose={() => setSelectedAuditExtension(null)}
        />
      )}
    </div>
  );
};
