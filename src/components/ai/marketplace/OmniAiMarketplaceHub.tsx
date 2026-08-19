import React, { useState, useMemo } from 'react';
import { 
  OmniMarketplaceItem, 
  OmniMarketplaceItemType, 
  OmniMarketplacePricingModel,
  OmniMarketplaceInstallation,
  OmniMarketplaceDeveloperPayout
} from '../../../types';
import { 
  SEED_MARKETPLACE_ITEMS, 
  SEED_MARKETPLACE_INSTALLATIONS, 
  SEED_DEVELOPER_PAYOUT_DASHBOARD 
} from '../../../monetisation_store_data';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Shield, 
  CheckCircle2, 
  Star, 
  Download, 
  ExternalLink, 
  Layers, 
  DollarSign, 
  Key, 
  Lock, 
  Cpu, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Check, 
  PlusCircle, 
  Clock, 
  ArrowRight,
  UserCheck,
  Building,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Award,
  Wallet,
  ArrowUpRight,
  Play
} from 'lucide-react';

interface OmniAiMarketplaceHubProps {
  triggerToast?: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  onNavigateToAgent?: (agentId: string) => void;
}

export function OmniAiMarketplaceHub({ triggerToast, onNavigateToAgent }: OmniAiMarketplaceHubProps) {
  // State management
  const [items, setItems] = useState<OmniMarketplaceItem[]>(SEED_MARKETPLACE_ITEMS);
  const [installations, setInstallations] = useState<OmniMarketplaceInstallation[]>(SEED_MARKETPLACE_INSTALLATIONS);
  const [payouts, setPayouts] = useState<OmniMarketplaceDeveloperPayout>(SEED_DEVELOPER_PAYOUT_DASHBOARD);
  
  // Navigation & Sub-views
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'installed' | 'creator_studio' | 'review_pipeline' | 'developer_earnings'>('catalog');
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price_low' | 'price_high'>('popular');

  // Selected item modal
  const [selectedItem, setSelectedItem] = useState<OmniMarketplaceItem | null>(null);
  const [itemModalTab, setItemModalTab] = useState<'overview' | 'features' | 'security' | 'creator' | 'privacy' | 'dependencies'>('overview');

  // Scope Approval & Install Flow Modal
  const [scopeModalItem, setScopeModalItem] = useState<OmniMarketplaceItem | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Creator Submission Studio State
  const [creatorStep, setCreatorStep] = useState<number>(1);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSubtitle, setDraftSubtitle] = useState('');
  const [draftType, setDraftType] = useState<OmniMarketplaceItemType>('agent');
  const [draftCategory, setDraftCategory] = useState<string>('finance');
  const [draftDescription, setDraftDescription] = useState('');
  const [draftPricingModel, setDraftPricingModel] = useState<OmniMarketplacePricingModel>('monthly_subscription');
  const [draftPrice, setDraftPrice] = useState<number>(29.00);
  const [draftScopes, setDraftScopes] = useState<string[]>(['ai.agents.run', 'ai.tools.invoke']);
  const [draftSupportEmail, setDraftSupportEmail] = useState('developer@dynastyholdings.com');
  const [draftPrivacyUrl, setDraftPrivacyUrl] = useState('https://dynastyholdings.com/privacy');
  const [isSubmittingDraft, setIsSubmittingDraft] = useState(false);
  const [securityScanRunning, setSecurityScanRunning] = useState(false);
  const [simulatedSecurityScore, setSimulatedSecurityScore] = useState<number | null>(null);

  // Item Types List
  const itemTypeOptions: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: items.length },
    { id: 'agent', label: 'Autonomous Agents', count: items.filter(i => i.itemType === 'agent').length },
    { id: 'prompt_system', label: 'Prompt Packs', count: items.filter(i => i.itemType === 'prompt_system').length },
    { id: 'workflow', label: 'Multi-Agent Workflows', count: items.filter(i => i.itemType === 'workflow').length },
    { id: 'skill', label: 'Specialist Skills', count: items.filter(i => i.itemType === 'skill').length },
    { id: 'connector', label: 'RAG Connectors', count: items.filter(i => i.itemType === 'connector').length },
    { id: 'knowledge_template', label: 'Knowledge Vaults', count: items.filter(i => i.itemType === 'knowledge_template').length },
    { id: 'specialist_ai_product', label: 'AI Products', count: items.filter(i => i.itemType === 'specialist_ai_product').length },
  ];

  // Filtered and sorted listings
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Must be published or draft in user's studio
      if (item.reviewStatus !== 'published' && activeSubTab === 'catalog') return false;

      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'all' || item.itemType === selectedType;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPricing = 
        selectedPricing === 'all' || 
        (selectedPricing === 'free' && item.priceUsd === 0) ||
        (selectedPricing === 'paid' && item.priceUsd > 0) ||
        (selectedPricing === 'subscription' && item.pricingModel === 'monthly_subscription');

      return matchesSearch && matchesType && matchesCategory && matchesPricing;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.installCount - a.installCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price_low') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price_high') return b.priceUsd - a.priceUsd;
      return 0;
    });
  }, [items, searchQuery, selectedType, selectedCategory, selectedPricing, sortBy, activeSubTab]);

  // Handle Installation Execution with Ledger settlement
  const handleExecuteInstall = () => {
    if (!scopeModalItem) return;
    setIsInstalling(true);

    setTimeout(() => {
      const newInstallation: OmniMarketplaceInstallation = {
        id: `inst_${Date.now()}`,
        marketplaceItemId: scopeModalItem.id,
        itemTitle: scopeModalItem.title,
        itemType: scopeModalItem.itemType,
        tenantId: 'tenant_dynasty_99',
        organizationId: 'org_dynasty',
        installedByUserId: 'usr_gideon',
        installedByUserEmail: 'gideonoluwalanadynasty@gmail.com',
        approvedScopes: scopeModalItem.requiredScopes,
        autoUpdate: true,
        status: 'active',
        priceUsd: scopeModalItem.priceUsd,
        doubleEntryLedgerRef: scopeModalItem.priceUsd > 0 ? `tx_de_${Date.now().toString().slice(-4)}` : 'tx_de_free',
        installedAt: new Date().toISOString(),
        lastUsedAt: new Date().toISOString()
      };

      setInstallations(prev => [newInstallation, ...prev.filter(i => i.marketplaceItemId !== scopeModalItem.id)]);
      
      // Update item count & flag
      setItems(prev => prev.map(item => item.id === scopeModalItem.id ? { 
        ...item, 
        installCount: item.installCount + 1, 
        isInstalledInCurrentOrg: true 
      } : item));

      setIsInstalling(false);
      setScopeModalItem(null);
      setAcceptedTerms(false);

      if (triggerToast) {
        triggerToast(
          'Installation Complete',
          `"${scopeModalItem.title}" installed successfully with approved sandbox scopes. Ledger transaction settled.`,
          'success'
        );
      }
    }, 900);
  };

  // Handle Uninstall
  const handleUninstall = (installId: string, itemTitle: string, itemId: string) => {
    setInstallations(prev => prev.filter(i => i.id !== installId));
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, isInstalledInCurrentOrg: false } : item));
    if (triggerToast) {
      triggerToast('Item Uninstalled', `"${itemTitle}" removed and permissions revoked.`, 'info');
    }
  };

  // Handle Submission Pipeline
  const handleRunSecurityPreScan = () => {
    setSecurityScanRunning(true);
    setTimeout(() => {
      setSecurityScanRunning(false);
      setSimulatedSecurityScore(98);
      if (triggerToast) {
        triggerToast('Security Scan Passed', 'Automated AST & boundary leak scan passed with score 98/100.', 'success');
      }
    }, 1200);
  };

  const handleFinalizeSubmission = () => {
    if (!draftTitle.trim() || !draftDescription.trim()) {
      if (triggerToast) triggerToast('Incomplete Form', 'Please provide a title and detailed description.', 'warning');
      return;
    }

    setIsSubmittingDraft(true);
    setTimeout(() => {
      const newItem: OmniMarketplaceItem = {
        id: `mp_${Date.now()}`,
        slug: draftTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: draftTitle,
        subtitle: draftSubtitle || 'Enterprise-grade sovereign AI capability',
        itemType: draftType,
        category: draftCategory as any,
        creatorId: 'usr_dynasty_labs',
        creatorName: 'Dynasty Capital Labs',
        creatorOrg: 'Dynasty Global Holdings',
        creatorVerified: true,
        isOmniOfficial: false,
        description: draftDescription,
        fullMarkdown: `### ${draftTitle}\n\n${draftDescription}\n\n### Sovereign Isolation\nOperates strictly within authorized tenant sandboxes. Zero external egress.`,
        featuresList: ['Automated multi-step pipeline', 'Zero data retention', 'Double-entry accounting integration'],
        screenshots: [{ id: 'ss_new', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80', caption: 'Live preview telemetry' }],
        version: '1.0.0',
        releaseNotes: 'Initial production release candidate.',
        changelog: [{ version: '1.0.0', date: new Date().toISOString().split('T')[0], notes: 'First submission to OMNI AI review queue.' }],
        pricingModel: draftPricingModel,
        priceUsd: draftPrice,
        creditsPrice: draftPrice * 40,
        requiredScopes: draftScopes,
        allowedRoles: ['owner', 'admin', 'manager'],
        supportedCountries: ['ALL'],
        dependencies: [{ type: 'model', name: 'gemini-2.5-pro', isRequired: true, isSatisfied: true }],
        supportInfo: { email: draftSupportEmail, docsUrl: 'https://docs.dynastyholdings.com', responseTimeSla: '< 6 hours' },
        privacyInfo: { dataRetentionDays: 0, piiCollected: false, telemetryStored: false, zeroDataRetentionSupported: true, privacyPolicyUrl: draftPrivacyUrl },
        reviewStatus: 'submitted',
        automatedScanResults: {
          passed: true,
          securityScore: 98,
          vulnerabilitiesFound: 0,
          piiChecksPassed: true,
          permissionLeakCheck: true,
          scannedAt: new Date().toISOString(),
          reportNotes: 'Static AST analysis passed. 0 data leaks detected.'
        },
        securityPolicyReview: {
          reviewedBy: 'pending_policy_assignee',
          decision: 'pending',
          feedbackNotes: 'Awaiting human security review against OMNI AI Sovereign Safety Directives.'
        },
        rating: 0,
        reviewCount: 0,
        installCount: 0,
        activeTenantsCount: 0,
        isInstalledInCurrentOrg: false,
        tags: [draftType, draftCategory, 'Sovereign'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setItems(prev => [newItem, ...prev]);
      setIsSubmittingDraft(false);
      setCreatorStep(1);
      setDraftTitle('');
      setDraftDescription('');
      setActiveSubTab('review_pipeline');

      if (triggerToast) {
        triggerToast(
          'Product Submitted for Review',
          `"${draftTitle}" entered the review pipeline. Automated scanning complete; pending security officer sign-off.`,
          'success'
        );
      }
    }, 1000);
  };

  return (
    <div id="omni_ai_marketplace_hub" className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METRICS BAR */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Sovereign Intelligence Commerce
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Enclave Sandboxed
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              OMNI AI Ecosystem Marketplace & Monetisation
            </h1>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Discover, install, and commercialize verified agents, multi-step workflows, RAG connectors, and specialized prompt systems with automated double-entry ledger settlement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveSubTab('creator_studio')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Publish to Market
            </button>
            <button
              onClick={() => setActiveSubTab('developer_earnings')}
              className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-bold text-xs flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 transition-colors cursor-pointer"
            >
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Creator Earnings (${payouts.availableForPayoutUsd.toLocaleString()})
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'catalog'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Browse Catalog ({items.filter(i => i.reviewStatus === 'published').length})
          </button>
          <button
            onClick={() => setActiveSubTab('installed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'installed'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Download className="w-4 h-4" /> Installed in Tenant ({installations.length})
          </button>
          <button
            onClick={() => setActiveSubTab('review_pipeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'review_pipeline'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Clock className="w-4 h-4" /> Review Pipeline ({items.filter(i => i.reviewStatus !== 'published').length})
          </button>
          <button
            onClick={() => setActiveSubTab('creator_studio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'creator_studio'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Creator Submission Studio
          </button>
          <button
            onClick={() => setActiveSubTab('developer_earnings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'developer_earnings'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Developer Economics & Payouts
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CATALOG BROWSER VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agents, prompt packs, workflows, RAG connectors, compliance skills..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedPricing}
                  onChange={(e) => setSelectedPricing(e.target.value)}
                  className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-3 py-2.5 text-xs font-bold text-neutral-900 dark:text-white"
                >
                  <option value="all">All Pricing</option>
                  <option value="free">Free Only</option>
                  <option value="paid">Commercial (USD / OCU)</option>
                  <option value="subscription">Subscriptions</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-3 py-2.5 text-xs font-bold text-neutral-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="finance">Finance & Treasury</option>
                  <option value="legal">Legal & Compliance</option>
                  <option value="developer">Developer & Cloud</option>
                  <option value="productivity">Productivity & Support</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl px-3 py-2.5 text-xs font-bold text-neutral-900 dark:text-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Recently Published</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* PRODUCT TYPE CHIPS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {itemTypeOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedType(opt.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedType === opt.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {opt.label} ({opt.count})
                </button>
              ))}
            </div>
          </div>

          {/* GRID OF LISTINGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map(item => {
              const isInstalled = installations.some(i => i.marketplaceItemId === item.id);

              return (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 hover:border-indigo-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        {item.itemType.replace('_', ' ')}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-black font-mono text-neutral-900 dark:text-white">
                          {item.priceUsd === 0 ? 'FREE' : `$${item.priceUsd.toFixed(2)}`}
                        </span>
                        {item.pricingModel === 'monthly_subscription' && (
                          <span className="text-[10px] text-neutral-400 block">/month</span>
                        )}
                      </div>
                    </div>

                    {/* TITLE & DESCRIPTION */}
                    <div>
                      <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* CREATOR & VERIFICATION */}
                    <div className="flex items-center gap-2 pt-1">
                      {item.creatorAvatar ? (
                        <img src={item.creatorAvatar} alt={item.creatorName} className="w-5 h-5 rounded-full object-cover" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-[10px] flex items-center justify-center font-bold">
                          {item.creatorName[0]}
                        </div>
                      )}
                      <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 truncate">
                        {item.creatorName}
                      </span>
                      {item.creatorVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      )}
                    </div>

                    {/* REQUIRED SCOPES SUMMARY */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.requiredScopes.slice(0, 2).map((scope, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                          {scope}
                        </span>
                      ))}
                      {item.requiredScopes.length > 2 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                          +{item.requiredScopes.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-neutral-900 dark:text-white">{item.rating.toFixed(1)}</span>
                      <span>({item.installCount})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setItemModalTab('overview');
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        Inspect
                      </button>

                      {isInstalled ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Installed
                        </span>
                      ) : (
                        <button
                          onClick={() => setScopeModalItem(item)}
                          className="px-3.5 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          {item.priceUsd === 0 ? 'Install' : `Buy ($${item.priceUsd})`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. INSTALLED IN TENANT VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'installed' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">Active Tenant Installations</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Manage installed third-party agents, sandbox permission grants, auto-updates, and ledger billing records.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {installations.length} Active Modules
            </span>
          </div>

          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {installations.map(inst => (
              <div key={inst.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {inst.itemType.replace('_', ' ')}
                    </span>
                    <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">{inst.itemTitle}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 font-bold">
                      ● Active
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                    <span>Installed by: <strong className="text-neutral-700 dark:text-neutral-300">{inst.installedByUserEmail}</strong></span>
                    <span>•</span>
                    <span>Date: {new Date(inst.installedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Ledger Ref: <code className="font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">{inst.doubleEntryLedgerRef}</code></span>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-neutral-400">Granted Scopes:</span>
                    {inst.approvedScopes.map((scope, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const found = items.find(i => i.id === inst.marketplaceItemId);
                      if (found) {
                        setSelectedItem(found);
                        setItemModalTab('security');
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    Audit Scopes
                  </button>
                  <button
                    onClick={() => handleUninstall(inst.id, inst.itemTitle, inst.marketplaceItemId)}
                    className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Revoke & Uninstall
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. REVIEW PIPELINE STATE MACHINE VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'review_pipeline' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">OMNI AI Review & Certification Pipeline</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                State machine verification: Draft → Submitted → Automated AST Scan → Security & Policy Officer Review → Approved & Published.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('creator_studio')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> New Submission
            </button>
          </div>

          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 space-y-4 bg-neutral-50/50 dark:bg-neutral-800/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                        {item.itemType}
                      </span>
                      <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">{item.title} (v{item.version})</h3>
                    </div>
                    <p className="text-xs text-neutral-500">Author: {item.creatorName} ({item.creatorOrg}) • Price: ${item.priceUsd}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      item.reviewStatus === 'published' 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : item.reviewStatus === 'security_review'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    }`}>
                      STATUS: {item.reviewStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* VISUAL REVIEW STAGES PROGRESSION */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">1. Draft</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-[10px] text-neutral-400 block">Spec created</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">2. Submitted</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-[10px] text-neutral-400 block">Enqueued</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                    item.automatedScanResults?.passed
                      ? 'bg-white dark:bg-neutral-900 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">3. AST Scan</span>
                      {item.automatedScanResults?.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 block">Score: {item.automatedScanResults?.securityScore || 'N/A'}/100</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                    item.securityPolicyReview?.decision === 'approved'
                      ? 'bg-white dark:bg-neutral-900 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">4. Security Review</span>
                      {item.securityPolicyReview?.decision === 'approved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 block">{item.securityPolicyReview?.decision || 'In Review'}</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                    item.reviewStatus === 'published'
                      ? 'bg-white dark:bg-neutral-900 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">5. Published</span>
                      {item.reviewStatus === 'published' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 block">{item.installCount} installs</span>
                  </div>
                </div>

                {item.automatedScanResults && (
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-xs flex items-center justify-between gap-3">
                    <span className="text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">
                      Scanner Telemetry: {item.automatedScanResults.reportNotes}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      Scanned: {new Date(item.automatedScanResults.scannedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CREATOR SUBMISSION STUDIO */}
      {/* ========================================================================= */}
      {activeSubTab === 'creator_studio' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white">OMNI AI Creator & Publisher Studio</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Monetize your proprietary AI agents, prompt systems, workflows, and tools with 85% developer revenue split.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-bold">Step {creatorStep} of 4</span>
            </div>
          </div>

          {/* STEPPER BAR */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: 'Metadata & Product Type' },
              { num: 2, label: 'Scopes & Sandboxing' },
              { num: 3, label: 'Pricing & Monetisation' },
              { num: 4, label: 'Security AST Pre-Scan' }
            ].map(s => (
              <button
                key={s.num}
                onClick={() => setCreatorStep(s.num)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  creatorStep === s.num
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300'
                    : creatorStep > s.num
                    ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-300'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-400'
                }`}
              >
                <div className="text-[10px] font-mono font-black uppercase">Step {s.num}</div>
                <div className="text-xs font-extrabold truncate mt-0.5">{s.label}</div>
              </button>
            ))}
          </div>

          {/* STEP 1: METADATA */}
          {creatorStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    placeholder="e.g. Autonomous Financial Reconciler Pro"
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Short Subtitle</label>
                  <input
                    type="text"
                    value={draftSubtitle}
                    onChange={(e) => setDraftSubtitle(e.target.value)}
                    placeholder="e.g. Scans general ledger, flags drift, and drafts journal entries"
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Product Classification</label>
                  <select
                    value={draftType}
                    onChange={(e) => setDraftType(e.target.value as any)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-bold"
                  >
                    <option value="agent">Autonomous Agent</option>
                    <option value="prompt_system">Specialized Prompt System</option>
                    <option value="workflow">Multi-Agent Workflow Pipeline</option>
                    <option value="skill">Modular Tool Skill</option>
                    <option value="connector">RAG Knowledge Connector</option>
                    <option value="knowledge_template">Pre-Indexed Knowledge Space Template</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Industry Category</label>
                  <select
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-bold"
                  >
                    <option value="finance">Finance & Treasury</option>
                    <option value="legal">Legal & Compliance</option>
                    <option value="developer">Developer Tools</option>
                    <option value="productivity">Productivity & Automation</option>
                    <option value="marketing">Marketing & Content</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Detailed Markdown Specification & User Documentation</label>
                <textarea
                  rows={6}
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  placeholder="Describe architecture, input/output schemas, error boundaries, and typical use-cases in Markdown format..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono text-xs"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setCreatorStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  Proceed to Scopes <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SCOPES & SANDBOXING */}
          {creatorStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <strong className="font-extrabold flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Principle of Least Privilege
                </strong>
                <p>Select only the specific OMNI platform capabilities your module requires to function. Excessive permissions will be flagged during the automated AST scan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { scope: 'ai.chat.use', desc: 'Standard interactive chat and conversational inference' },
                  { scope: 'ai.agents.run', desc: 'Execute autonomous multi-step agent reasoning loops' },
                  { scope: 'ai.tools.invoke', desc: 'Invoke authorized sandboxed tools and system functions' },
                  { scope: 'ai.knowledge.read', desc: 'Read vectorized knowledge chunks in authorized tenant spaces' },
                  { scope: 'ai.knowledge.write', desc: 'Index new embeddings and document assets' },
                  { scope: 'ai.code.use', desc: 'Execute code within isolated container sandboxes' },
                  { scope: 'ai.documents.create', desc: 'Generate and edit OMNI Create documents and reports' },
                  { scope: 'ai.billing.view', desc: 'Read tenant-scoped usage logs and ledger references' }
                ].map(item => {
                  const isChecked = draftScopes.includes(item.scope);
                  return (
                    <div
                      key={item.scope}
                      onClick={() => {
                        if (isChecked) {
                          setDraftScopes(draftScopes.filter(s => s !== item.scope));
                        } else {
                          setDraftScopes([...draftScopes, item.scope]);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                          : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <code className="text-xs font-mono font-bold text-neutral-900 dark:text-white">{item.scope}</code>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCreatorStep(1)}
                  className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCreatorStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  Proceed to Pricing <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRICING & MONETISATION */}
          {creatorStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Pricing Model</label>
                  <select
                    value={draftPricingModel}
                    onChange={(e) => setDraftPricingModel(e.target.value as any)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-bold"
                  >
                    <option value="free">Free / Community (0 USD)</option>
                    <option value="monthly_subscription">Monthly Recurring Subscription</option>
                    <option value="one_time">One-Time Perpetual License</option>
                    <option value="usage_based">Usage Units / OCU Metered</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Price in $ USD</label>
                  <input
                    type="number"
                    disabled={draftPricingModel === 'free'}
                    value={draftPricingModel === 'free' ? 0 : draftPrice}
                    onChange={(e) => setDraftPrice(Number(e.target.value))}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              {/* COMMERCIAL ECONOMICS PREVIEW */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3">
                <h4 className="font-extrabold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Revenue Share Breakdown per Sale
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Gross Listed Price</span>
                    <span className="text-base font-black text-neutral-900 dark:text-white font-mono">${draftPricingModel === 'free' ? '0.00' : draftPrice.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">Developer Share (85%)</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      ${draftPricingModel === 'free' ? '0.00' : (draftPrice * 0.85).toFixed(2)}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">OMNI Platform (15%)</span>
                    <span className="text-base font-black text-neutral-600 dark:text-neutral-400 font-mono">
                      ${draftPricingModel === 'free' ? '0.00' : (draftPrice * 0.15).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Developer Support Email</label>
                  <input
                    type="email"
                    value={draftSupportEmail}
                    onChange={(e) => setDraftSupportEmail(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Privacy Policy URL</label>
                  <input
                    type="url"
                    value={draftPrivacyUrl}
                    onChange={(e) => setDraftPrivacyUrl(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCreatorStep(2)}
                  className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCreatorStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  Proceed to Security Scan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SECURITY PRE-SCAN & FINAL SUBMISSION */}
          {creatorStep === 4 && (
            <div className="space-y-5 text-xs">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm">Automated Security & Sandbox AST Pre-Scanner</h4>
                    <p className="text-neutral-500 mt-0.5">Executes static AST analysis to verify zero hardcoded credentials, zero unauthorized egress, and tenant scope adherence.</p>
                  </div>

                  <button
                    onClick={handleRunSecurityPreScan}
                    disabled={securityScanRunning}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {securityScanRunning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Scanning AST...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Run Verification Scan
                      </>
                    )}
                  </button>
                </div>

                {simulatedSecurityScore !== null && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Verification Passed
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-300">
                        Score: {simulatedSecurityScore}/100
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-emerald-700 dark:text-emerald-400 space-y-0.5 text-[11px]">
                      <li>Zero hardcoded API secrets or private tokens detected in AST.</li>
                      <li>Network egress strictly bound to authorized Sovereign enclave endpoints.</li>
                      <li>Requested scopes match declared functionality.</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCreatorStep(3)}
                  className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalizeSubmission}
                  disabled={isSubmittingDraft}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  {isSubmittingDraft ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Enqueuing in Pipeline...
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" /> Submit to Review Pipeline
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. DEVELOPER ECONOMICS & PAYOUTS VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'developer_earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Gross Revenue</span>
              <div className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                ${payouts.grossRevenueUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-neutral-500">From verified marketplace sales</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Platform Fee (15%)</span>
              <div className="text-2xl font-black font-mono text-neutral-600 dark:text-neutral-400">
                -${payouts.platformCommissionUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-neutral-500">Infrastructure & hosting</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Available Payout</span>
              <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                ${payouts.availableForPayoutUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-emerald-600">Cleared for instant settlement</span>
            </div>

            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-1">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold">Pending 14-Day Hold</span>
              <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                ${payouts.pendingHoldUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-neutral-500">Refund escrow reserve</span>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">Recent Marketplace Transactions & Settlement Legs</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Automated double-entry distribution between tenant purchaser, developer treasury, and platform fee pool.</p>
              </div>

              <button
                onClick={() => {
                  if (triggerToast) {
                    triggerToast(
                      'Payout Triggered',
                      `$${payouts.availableForPayoutUsd.toLocaleString()} transferred to ${payouts.payoutMethod.toUpperCase()} with zero gas fee.`,
                      'success'
                    );
                  }
                }}
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowUpRight className="w-4 h-4" /> Request Payout ($18,450.00)
              </button>
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {payouts.recentTransactions.map(tx => (
                <div key={tx.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className="font-extrabold text-neutral-900 dark:text-white">{tx.itemTitle}</strong>
                      <span className="text-[10px] text-neutral-400">• Buyer: <strong>{tx.tenantName}</strong></span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Tx ID: {tx.id} • {new Date(tx.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase block">Gross Sale</span>
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">${tx.amountGrossUsd.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase block">Platform (15%)</span>
                      <span className="font-mono text-neutral-500">-${tx.commissionUsd.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-600 uppercase font-bold block">Net Credited</span>
                      <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">+${tx.netUsd.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. DETAILED PRODUCT INSPECT MODAL */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 max-w-3xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {selectedItem.itemType.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">v{selectedItem.version}</span>
                  {selectedItem.isOmniOfficial && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                      Official OMNI Product
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">{selectedItem.title}</h3>
                <p className="text-xs text-neutral-500">{selectedItem.subtitle}</p>
              </div>

              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MODAL TABS */}
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview & Docs' },
                { id: 'features', label: 'Features & Screenshots' },
                { id: 'security', label: 'Security & Scopes' },
                { id: 'creator', label: 'Creator & Support' },
                { id: 'privacy', label: 'Privacy & Compliance' },
                { id: 'dependencies', label: 'Dependencies' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setItemModalTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    itemModalTab === tab.id
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            {itemModalTab === 'overview' && (
              <div className="space-y-4 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                <div className="whitespace-pre-line p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 font-mono text-[11px]">
                  {selectedItem.fullMarkdown}
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-neutral-900 dark:text-white">Recent Release Notes (v{selectedItem.version})</h4>
                  <p className="text-neutral-500">{selectedItem.releaseNotes}</p>
                </div>
              </div>
            )}

            {itemModalTab === 'features' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedItem.featuresList.map((feat, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">{feat}</span>
                    </div>
                  ))}
                </div>

                {selectedItem.screenshots.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-extrabold text-neutral-900 dark:text-white">Product Visual Previews</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedItem.screenshots.map(ss => (
                        <div key={ss.id} className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
                          <img src={ss.url} alt={ss.caption} className="w-full h-40 object-cover" />
                          <div className="p-2 text-[10px] bg-neutral-50 dark:bg-neutral-800 text-neutral-500">{ss.caption}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {itemModalTab === 'security' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-600" /> Automated Security Verification
                    </span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      Score: {selectedItem.automatedScanResults?.securityScore || 100}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-400">
                    {selectedItem.automatedScanResults?.reportNotes || 'Zero AST security risks detected. Fully compliant with sovereign tenant isolation.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-neutral-900 dark:text-white">Required Sandboxed Scopes</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedItem.requiredScopes.map((scope, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <code className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{scope}</code>
                        <span className="text-[10px] text-neutral-400">Tenant-enforced RLS</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {itemModalTab === 'creator' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedItem.creatorAvatar && (
                      <img src={selectedItem.creatorAvatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <h4 className="font-extrabold text-neutral-900 dark:text-white text-sm flex items-center gap-1.5">
                        {selectedItem.creatorName}
                        {selectedItem.creatorVerified && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                      </h4>
                      <p className="text-neutral-500">{selectedItem.creatorOrg}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase block">Support Response SLA</span>
                    <strong className="text-neutral-900 dark:text-white">{selectedItem.supportInfo.responseTimeSla}</strong>
                  </div>
                  <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-[10px] text-neutral-400 uppercase block">Support Channel</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">{selectedItem.supportInfo.email}</span>
                  </div>
                </div>
              </div>
            )}

            {itemModalTab === 'privacy' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">Data Retention Period:</span>
                    <strong className="text-neutral-900 dark:text-white">{selectedItem.privacyInfo.dataRetentionDays === 0 ? 'Zero Retention (Ephemeral)' : `${selectedItem.privacyInfo.dataRetentionDays} Days`}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">PII Collected:</span>
                    <span className={selectedItem.privacyInfo.piiCollected ? 'text-amber-500 font-bold' : 'text-emerald-500 font-bold'}>
                      {selectedItem.privacyInfo.piiCollected ? 'Yes (Anonymized)' : 'No PII Collected'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-700 dark:text-neutral-300 font-bold">Zero-Retention Mode:</span>
                    <span className="text-emerald-500 font-bold">Guaranteed Sovereign Support</span>
                  </div>
                </div>
              </div>
            )}

            {itemModalTab === 'dependencies' && (
              <div className="space-y-3 text-xs">
                {selectedItem.dependencies.length === 0 ? (
                  <p className="text-neutral-400">Zero external dependencies. Runs purely in standalone sandbox.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedItem.dependencies.map((dep, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <strong className="text-neutral-900 dark:text-white block font-mono">{dep.name}</strong>
                          <span className="text-[10px] text-neutral-400 uppercase">{dep.type}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                          Satisfied in OMNI Core
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MODAL FOOTER ACTION */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="space-y-0.5">
                <span className="text-[10px] text-neutral-400 uppercase block font-mono">Price & Terms</span>
                <span className="text-lg font-black text-neutral-900 dark:text-white font-mono">
                  {selectedItem.priceUsd === 0 ? 'FREE' : `$${selectedItem.priceUsd.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const it = selectedItem;
                    setSelectedItem(null);
                    setScopeModalItem(it);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" /> Continue to Scope Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. EXPLICIT SCOPE APPROVAL & INSTALLATION MODAL */}
      {/* ========================================================================= */}
      {scopeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Approve Sandbox Permissions</h3>
                  <p className="text-xs text-neutral-500">Explicit scope grant for "{scopeModalItem.title}"</p>
                </div>
              </div>

              <button 
                onClick={() => setScopeModalItem(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-neutral-600 dark:text-neutral-300">
                This item is requesting access to the following sovereign platform scopes within your tenant boundary:
              </p>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {scopeModalItem.requiredScopes.map((scope, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-indigo-500" />
                      <code className="font-mono font-bold text-neutral-900 dark:text-white">{scope}</code>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Isolated</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-300 font-bold">Ledger Settlement:</span>
                <span className="font-mono font-black text-neutral-900 dark:text-white">
                  {scopeModalItem.priceUsd === 0 ? 'FREE (No Debit)' : `$${scopeModalItem.priceUsd.toFixed(2)} USD (${scopeModalItem.priceUsd * 40} OCU)`}
                </span>
              </div>

              <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-[11px] text-neutral-500 leading-tight">
                  I authorize these scopes for tenant <code>tenant_dynasty_99</code>. I understand this product runs in a secure sandbox and can be revoked at any time.
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setScopeModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!acceptedTerms || isInstalling}
                onClick={handleExecuteInstall}
                className="px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-40 shadow-sm"
              >
                {isInstalling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Authorizing & Settling...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Grant Scopes & Install
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
