import React, { useState } from 'react';
import { 
  Code, Cpu, Server, Globe, Terminal, ShieldCheck, Layers, Plus, Play, Check, 
  Trash, ExternalLink, Database, BookOpen, Key, RefreshCw, Sliders, Eye, EyeOff, 
  AlertCircle, CheckCircle2, DollarSign, TrendingUp, ShoppingBag, Boxes, FileText, 
  ChevronRight, Download, UserPlus, FolderGit2, ArrowRight, ShieldAlert, BadgeHelp, HelpCircle
} from 'lucide-react';
import { OMNIState, DeveloperProfile, MarketplaceApp, AppInstallation, SandboxApiRequest, DeveloperEarningLog, MarketplaceCategory } from '../types';

interface OMNIDeveloperPortalPageProps {
  state: OMNIState;
  registerDeveloper: (companyName: string, website: string) => void;
  submitMarketplaceApp: (app: Omit<MarketplaceApp, 'id' | 'developerId' | 'developerName' | 'status' | 'rating' | 'installCount' | 'createdAt' | 'revenueSharePercent'>) => void;
  reviewMarketplaceApp: (appId: string, status: MarketplaceApp['status'], notes?: string) => void;
  installMarketplaceApp: (tenantId: string, appId: string, scopes: string[]) => void;
  revokeMarketplaceApp: (installationId: string) => void;
  submitSandboxApiRequest: (apiKey: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, requestPayload: string) => void;
  triggerToast: (title: string, description: string, type: 'success' | 'info' | 'error') => void;
  setView: (view: string, appId: string | null) => void;
}

export default function OMNIDeveloperPortalPage({
  state,
  registerDeveloper,
  submitMarketplaceApp,
  reviewMarketplaceApp,
  installMarketplaceApp,
  revokeMarketplaceApp,
  submitSandboxApiRequest,
  triggerToast,
  setView
}: OMNIDeveloperPortalPageProps) {
  // Navigation tabs: 'marketplace' | 'console' | 'api_docs'
  const [activeTab, setActiveTab] = useState<'marketplace' | 'console' | 'api_docs'>('marketplace');
  
  // Console subsections: 'overview' | 'credentials' | 'sandbox' | 'submissions' | 'earnings' | 'review_queue'
  const [consoleSection, setConsoleSection] = useState<'overview' | 'credentials' | 'sandbox' | 'submissions' | 'earnings' | 'review_queue'>('overview');

  // Registration form state
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  // Submit App Form State
  const [appName, setAppName] = useState('');
  const [appCategory, setAppCategory] = useState<MarketplaceCategory>('integration');
  const [appShortDesc, setAppShortDesc] = useState('');
  const [appLongDesc, setAppLongDesc] = useState('');
  const [appPrivacy, setAppPrivacy] = useState('');
  const [appPricing, setAppPricing] = useState<'free' | 'subscription' | 'one_time' | 'usage'>('free');
  const [appPrice, setAppPrice] = useState('0');
  const [appSupport, setAppSupport] = useState('');
  const [appCountries, setAppCountries] = useState('US, GB, CA, NG, ZA');
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['identity.read']);

  // Sandbox State
  const [sandboxApiKey, setSandboxApiKey] = useState('');
  const [sandboxMethod, setSandboxMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [sandboxEndpoint, setSandboxEndpoint] = useState('/api/v1/ledger/balances?walletId=wallet_dynasty');
  const [sandboxPayload, setSandboxPayload] = useState('{\n  "amount": 100.00\n}');
  
  // App store filters
  const [selectedCategory, setSelectedCategory] = useState<MarketplaceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Detailed App modal
  const [selectedApp, setSelectedApp] = useState<MarketplaceApp | null>(null);
  const [installationScopes, setInstallationScopes] = useState<string[]>([]);
  const [showInstallConsent, setShowInstallConsent] = useState(false);

  // Review reject notes state
  const [reviewNotes, setReviewNotes] = useState('');

  // Find user's developer profile (if registered)
  const myProfile = state.developerProfiles.find(p => p.userId === state.user?.id);

  // Auto populate sandbox API Key if registered
  React.useEffect(() => {
    if (myProfile && !sandboxApiKey) {
      setSandboxApiKey(myProfile.apiKey);
    }
  }, [myProfile, sandboxApiKey]);

  // Toggle scope selection for app submission
  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter(s => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !websiteUrl) {
      triggerToast('Validation Error', 'Please complete all registration fields.', 'error');
      return;
    }
    registerDeveloper(companyName, websiteUrl);
    setCompanyName('');
    setWebsiteUrl('');
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appShortDesc || !appLongDesc || !appSupport) {
      triggerToast('Validation Error', 'Please fill in all required marketplace metadata fields.', 'error');
      return;
    }
    submitMarketplaceApp({
      name: appName,
      slug: appName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: appCategory,
      shortDescription: appShortDesc,
      longDescription: appLongDesc,
      screenshots: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
      manifest: {
        apiVersion: 'v2.0',
        entryPoint: `https://api.${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.io/omni-entry.js`,
        requestedScopes: selectedScopes,
        webhooksEnabled: true
      },
      privacyPolicyUrl: appPrivacy || 'https://omni.io/default-privacy',
      pricingType: appPricing,
      priceAmount: parseFloat(appPrice) || 0,
      supportEmail: appSupport,
      targetCountries: appCountries.split(',').map(c => c.trim())
    });

    // Reset Form
    setAppName('');
    setAppShortDesc('');
    setAppLongDesc('');
    setAppPrivacy('');
    setAppPricing('free');
    setAppPrice('0');
    setAppSupport('');
    setSelectedScopes(['identity.read']);
    setConsoleSection('submissions');
  };

  const executeSandbox = () => {
    if (!sandboxApiKey) {
      triggerToast('Developer Credentials Missing', 'Provide your API client credential key first.', 'error');
      return;
    }
    submitSandboxApiRequest(sandboxApiKey, sandboxMethod, sandboxEndpoint, sandboxPayload);
  };

  // Filter apps
  const filteredApps = state.marketplaceApps.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    // Only show published apps in marketplace, unless user is the author and viewing in submissions
    return matchesCategory && matchesSearch && app.status === 'published';
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950 font-sans p-6 md:p-8" id="developers_portal">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">developers.omni.com</span>
            <span className="text-neutral-400 text-xs font-semibold">Sovereign API Access Gateway</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Developer Platform &amp; App Store</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Build and license third-party integrations, extensions, and AI agents inside OMNI's double-entry isolated sandbox.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 border ${
              activeTab === 'marketplace' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            OMNI Marketplace
          </button>
          
          <button 
            onClick={() => setActiveTab('console')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 border ${
              activeTab === 'console' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Developer Console
          </button>

          <button 
            onClick={() => setActiveTab('api_docs')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 border ${
              activeTab === 'api_docs' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Core API Explorer
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* ====================================================================== */}
        {/* TAB 1: MARKETPLACE */}
        {/* ====================================================================== */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            
            {/* Top Category Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  All Apps
                </button>
                <button 
                  onClick={() => setSelectedCategory('ai_agent')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'ai_agent' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  AI Agents
                </button>
                <button 
                  onClick={() => setSelectedCategory('extension')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'extension' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Extensions
                </button>
                <button 
                  onClick={() => setSelectedCategory('connector')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'connector' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Connectors
                </button>
                <button 
                  onClick={() => setSelectedCategory('automation_template')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'automation_template' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Automations
                </button>
                <button 
                  onClick={() => setSelectedCategory('theme')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCategory === 'theme' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Themes
                </button>
              </div>

              <div className="w-full md:w-80">
                <input 
                  type="text"
                  placeholder="Search solutions & integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-100 text-xs text-neutral-900 border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-400"
                />
              </div>
            </div>

            {/* Application Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <div 
                  key={app.id}
                  className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col"
                >
                  <img 
                    src={app.screenshots?.[0] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'} 
                    alt={app.name} 
                    className="w-full h-40 object-cover border-b border-neutral-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold tracking-wider text-rose-500 uppercase bg-rose-50 px-2 py-0.5 rounded-md">
                          {app.category.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">
                          ★ {app.rating || 'New'} ({app.installCount} installs)
                        </span>
                      </div>
                      <h3 className="text-md font-bold text-neutral-900">{app.name}</h3>
                      <p className="text-xs text-neutral-500 font-normal mt-1.5 line-clamp-2 leading-relaxed">
                        {app.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] block uppercase text-neutral-400 font-semibold">Pricing Plan</span>
                        <span className="text-sm font-bold text-neutral-950">
                          {app.pricingType === 'free' ? 'Free' : `$${app.priceAmount} / ${app.pricingType === 'subscription' ? 'mo' : app.pricingType === 'one_time' ? 'once' : 'use'}`}
                        </span>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedApp(app);
                          setInstallationScopes([...app.manifest.requestedScopes]);
                          setShowInstallConsent(true);
                        }}
                        className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                      >
                        Install Extension
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sandbox Security Advisory Notice */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-950 uppercase tracking-wide">OMNI Sovereign Tenant Protection Notice</h4>
                <p className="text-xs text-rose-800 font-normal leading-relaxed mt-1">
                  Security protocols dictate that third-party applications or developer plugins may **NEVER directly query or inspect physical tables or relational databases** across isolated workspaces. All integration state exchanges must run exclusively via explicit OAuth 2.0 permission grants and localized scopes. You retain immediate revocation control to invalidate API access tokens at any second.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 2: DEVELOPER CONSOLE */}
        {/* ====================================================================== */}
        {activeTab === 'console' && (
          <div>
            {!myProfile ? (
              /* Registration Prompt */
              <div className="max-w-xl mx-auto bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-neutral-900">Become an OMNI Publisher</h2>
                    <p className="text-xs text-neutral-500">Register to generate API keys and publish apps.</p>
                  </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Company / Developer Name</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Oluwalana Systems Ltd"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Developer Website</label>
                    <input 
                      type="url" 
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                    />
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 text-xs text-neutral-600 font-normal leading-relaxed">
                    By registering as a publisher, you agree that your application manifest strictly respects tenant isolation boundaries. Attempting to bypass double-entry ledger audits results in instant api credential revocation.
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-lg transition-all"
                  >
                    Generate Developer Credentials
                  </button>
                </form>
              </div>
            ) : (
              /* Registered Console */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Console Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                  <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm mb-4">
                    <span className="text-[10px] block font-bold uppercase tracking-wider text-neutral-400 mb-1">Logged Publisher</span>
                    <h4 className="text-sm font-bold text-neutral-900">{myProfile.companyName}</h4>
                    <a href={myProfile.developerWebsite} target="_blank" rel="noreferrer" className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-semibold hover:underline">
                      {myProfile.developerWebsite} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button 
                    onClick={() => setConsoleSection('overview')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      consoleSection === 'overview' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <span>Developer Dashboard</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button 
                    onClick={() => setConsoleSection('credentials')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      consoleSection === 'credentials' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <span>API Credentials &amp; Keys</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button 
                    onClick={() => setConsoleSection('sandbox')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      consoleSection === 'sandbox' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <span>API Sandbox &amp; Logs</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button 
                    onClick={() => setConsoleSection('submissions')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      consoleSection === 'submissions' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <span>App Submissions</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  <button 
                    onClick={() => setConsoleSection('earnings')}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      consoleSection === 'earnings' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <span>Earnings Ledger &amp; Payouts</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>

                  {/* ADMIN BACKDOOR ACCESS */}
                  {state.user?.role === 'superadmin' && (
                    <div className="pt-4 border-t border-neutral-200 mt-4">
                      <span className="text-[10px] block font-extrabold uppercase tracking-widest text-neutral-400 px-4 mb-2">Platform Administration</span>
                      <button 
                        onClick={() => setConsoleSection('review_queue')}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all border border-dashed ${
                          consoleSection === 'review_queue' ? 'bg-neutral-900 text-white border-neutral-950' : 'bg-neutral-100 text-rose-600 hover:bg-neutral-200 border-neutral-300'
                        }`}
                      >
                        <span>App Review Queue</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>
                    </div>
                  )}

                </div>

                {/* Console Active Screen */}
                <div className="lg:col-span-3 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm min-h-[500px]">
                  
                  {/* Overview Screen */}
                  {consoleSection === 'overview' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <h3 className="text-lg font-bold text-neutral-900">Developer Overview</h3>
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                          Verified Publisher Account
                        </span>
                      </div>

                      {/* Stat summary widgets */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                          <span className="text-[10px] uppercase font-bold text-neutral-400">Total Installed Base</span>
                          <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                            {state.marketplaceApps.filter(a => a.developerId === myProfile.id).reduce((sum, current) => sum + current.installCount, 0)}
                          </div>
                          <span className="text-[10px] text-neutral-400">Active tenant links</span>
                        </div>

                        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                          <span className="text-[10px] uppercase font-bold text-neutral-400">Pending App Audits</span>
                          <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                            {state.marketplaceApps.filter(a => a.developerId === myProfile.id && a.status !== 'published' && a.status !== 'rejected').length}
                          </div>
                          <span className="text-[10px] text-neutral-400">Under Review</span>
                        </div>

                        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
                          <span className="text-[10px] uppercase font-bold text-neutral-400">Earnings Balance (USD)</span>
                          <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                            ${myProfile.earningsBalanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </div>
                          <span className="text-[10px] text-rose-500 font-semibold cursor-pointer hover:underline" onClick={() => setConsoleSection('earnings')}>
                            View ledger payouts
                          </span>
                        </div>
                      </div>

                      {/* Apps Submissions Listing */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400">Your Marketplace Submissions</h4>
                        <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-100 overflow-hidden">
                          {state.marketplaceApps.filter(a => a.developerId === myProfile.id).length === 0 ? (
                            <div className="p-8 text-center text-xs text-neutral-400">
                              No apps or integrations submitted yet. Publish your first template today.
                            </div>
                          ) : (
                            state.marketplaceApps.filter(a => a.developerId === myProfile.id).map(app => (
                              <div key={app.id} className="p-4 flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-neutral-900">{app.name}</span>
                                    <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                      app.status === 'published' ? 'bg-emerald-50 text-emerald-700' :
                                      app.status === 'submitted' ? 'bg-amber-50 text-amber-700' :
                                      app.status === 'rejected' ? 'bg-rose-50 text-rose-700' : 'bg-neutral-100 text-neutral-700'
                                    }`}>
                                      {app.status}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400 font-normal mt-1">{app.shortDescription}</p>
                                </div>
                                <span className="text-xs font-bold text-neutral-950">
                                  {app.pricingType === 'free' ? 'Free' : `$${app.priceAmount}`}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Credentials Screen */}
                  {consoleSection === 'credentials' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900">API Credentials</h3>
                          <p className="text-xs text-neutral-500">Master access tokens for developers.omni.com integrations.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                              <Key className="w-4 h-4 text-rose-600" />
                              Sandbox Publisher API Key
                            </span>
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              readOnly 
                              value={myProfile.apiKey}
                              className="bg-white border border-neutral-200 text-neutral-900 font-mono text-[11px] p-2 rounded-lg flex-1 focus:outline-none"
                            />
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(myProfile.apiKey);
                                triggerToast('Copied', 'API key copied to clipboard.', 'success');
                              }}
                              className="bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg font-semibold hover:bg-neutral-800 transition-all"
                            >
                              Copy Key
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
                          <div>
                            <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 mb-1">
                              <Globe className="w-4 h-4 text-blue-500" />
                              OAuth 2.0 Web Client Credentials
                            </span>
                            <p className="text-[11px] text-neutral-500">Used by external apps to acquire transient user scopes.</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] uppercase text-neutral-400 font-bold block mb-1">OAuth Client ID</label>
                              <input 
                                type="text" 
                                readOnly 
                                value={myProfile.oauthClientId}
                                className="w-full bg-white border border-neutral-200 text-neutral-900 font-mono text-[11px] p-2 rounded-lg focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-neutral-400 font-bold block mb-1">Client Secret Token</label>
                              <input 
                                type="text" 
                                readOnly 
                                value={myProfile.oauthClientSecret}
                                className="w-full bg-white border border-neutral-200 text-neutral-900 font-mono text-[11px] p-2 rounded-lg focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex gap-3">
                          <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          <div className="text-xs text-rose-800 leading-relaxed font-normal">
                            <strong>Security Protocol Enforcement:</strong> Master developer credentials must always be transmitted inside Authorization Bearer headers. Raw SQL database connections are globally isolated. Scope token authorizations are audited by the system continuously.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sandbox API Console */}
                  {consoleSection === 'sandbox' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900">Sandbox API Explorer &amp; Logs</h3>
                          <p className="text-xs text-neutral-500">Test platform endpoints &amp; verify compliance parameters.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Parameter Setup */}
                        <div className="space-y-4">
                          <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Execute Endpoint Request</h4>
                          
                          <div>
                            <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">API Key context</label>
                            <input 
                              type="text" 
                              value={sandboxApiKey}
                              onChange={(e) => setSandboxApiKey(e.target.value)}
                              placeholder="Enter API Key"
                              className="w-full bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                            />
                          </div>

                          <div className="flex gap-2">
                            <div className="w-1/3">
                              <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Method</label>
                              <select 
                                value={sandboxMethod}
                                onChange={(e: any) => setSandboxMethod(e.target.value)}
                                className="w-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                              >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                              </select>
                            </div>
                            <div className="w-2/3">
                              <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Endpoint Path</label>
                              <select 
                                value={sandboxEndpoint}
                                onChange={(e) => {
                                  setSandboxEndpoint(e.target.value);
                                  if (e.target.value.includes('balances')) {
                                    setSandboxPayload('{}');
                                  } else {
                                    setSandboxPayload('{\n  "from": "wallet_dynasty",\n  "to": "wallet_sandbox",\n  "amount": 500.00,\n  "description": "Developer API transfer trial"\n}');
                                  }
                                }}
                                className="w-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                              >
                                <option value="/api/v1/ledger/balances?walletId=wallet_dynasty">GET /api/v1/ledger/balances?walletId=wallet_dynasty (Legit)</option>
                                <option value="/api/v1/ledger/transfers">POST /api/v1/ledger/transfers (Transfer Demo)</option>
                                <option value="/api/v1/ledger/balances?walletId=wallet_restricted_competitor_node">GET /api/v1/ledger/balances?walletId=wallet_restricted_competitor (Access Leak Test)</option>
                              </select>
                            </div>
                          </div>

                          {sandboxMethod !== 'GET' && (
                            <div>
                              <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Request Payload JSON</label>
                              <textarea 
                                rows={4}
                                value={sandboxPayload}
                                onChange={(e) => setSandboxPayload(e.target.value)}
                                className="w-full bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                              />
                            </div>
                          )}

                          <button 
                            onClick={executeSandbox}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            Dispatch Request Call
                          </button>
                        </div>

                        {/* Real-time response and boundary audit */}
                        <div className="space-y-4">
                          <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Dynamic Response Pipeline</h4>
                          
                          {!state.sandboxApiRequests || state.sandboxApiRequests.length === 0 ? (
                            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center text-xs text-neutral-400 min-h-[220px] flex items-center justify-center">
                              Send a sandbox query to view real-time compilation and isolation status logs.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 font-mono text-[10px] space-y-2 max-h-52 overflow-y-auto">
                                <div className="text-rose-400 font-bold">
                                  {state.sandboxApiRequests[0]?.method || 'GET'} {state.sandboxApiRequests[0]?.endpoint || '/api/v1/apps'}
                                </div>
                                <div className="text-neutral-500">
                                  Status: <span className={state.sandboxApiRequests[0]?.statusCode === 200 ? "text-emerald-400" : "text-rose-400 font-bold"}>
                                    {state.sandboxApiRequests[0]?.statusCode ?? 200}
                                  </span>
                                </div>
                                <div className="text-neutral-400 text-[9px] border-t border-neutral-800 pt-1.5 mt-1.5 whitespace-pre-wrap">
                                  {state.sandboxApiRequests[0]?.responsePayload || ''}
                                </div>
                              </div>

                              <div className={`p-4 rounded-xl border flex gap-3 ${
                                state.sandboxApiRequests[0]?.tenantIsolationCheck === 'PASS_ENFORCED'
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-rose-50 border-rose-200 text-rose-800'
                              }`}>
                                {state.sandboxApiRequests[0]?.tenantIsolationCheck === 'PASS_ENFORCED' ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                                )
                                }
                                <div className="text-xs">
                                  <strong>Security Sandbox Audit:</strong> {state.sandboxApiRequests[0]?.tenantIsolationCheck === 'PASS_ENFORCED' 
                                    ? 'Request evaluated inside validated tenant parameters. Cross-tenant leaks bypassed.' 
                                    : 'Raw database query failed. Access blocked because key lacks permissions on restricted competitor wallet.'
                                  }
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Historic Logs Table */}
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Historical Request logs</h4>
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-neutral-50 text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-neutral-200">
                              <tr>
                                <th className="p-3">Time</th>
                                <th className="p-3">Method</th>
                                <th className="p-3">Endpoint</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Isolation Check</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                              {state.sandboxApiRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-neutral-50">
                                  <td className="p-3 text-[11px] text-neutral-500 font-normal">
                                    {new Date(req.timestamp).toLocaleTimeString()}
                                  </td>
                                  <td className="p-3 font-bold">{req.method}</td>
                                  <td className="p-3 font-mono text-[10px] text-neutral-600">{req.endpoint}</td>
                                  <td className="p-3">
                                    <span className={`font-semibold ${req.statusCode === 200 ? 'text-emerald-600' : 'text-rose-600 font-bold'}`}>
                                      {req.statusCode}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <span className={`font-bold text-[10px] px-2 py-0.5 rounded ${
                                      req.tenantIsolationCheck === 'PASS_ENFORCED' 
                                        ? 'bg-emerald-50 text-emerald-700' 
                                        : 'bg-rose-50 text-rose-700'
                                    }`}>
                                      {req.tenantIsolationCheck}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Submission Form tab */}
                  {consoleSection === 'submissions' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900">Publish to OMNI App Store</h3>
                          <p className="text-xs text-neutral-500">Configure catalog metadata, licensing pricing, and manifest parameters.</p>
                        </div>
                      </div>

                      <form onSubmit={handleAppSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Application Name</label>
                            <input 
                              type="text" 
                              required
                              value={appName}
                              onChange={(e) => setAppName(e.target.value)}
                              placeholder="e.g., Ledger Reconciliation Audit"
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Catalog Category</label>
                            <select 
                              value={appCategory}
                              onChange={(e: any) => setAppCategory(e.target.value)}
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            >
                              <option value="integration">Integration</option>
                              <option value="extension">Extension</option>
                              <option value="app">App</option>
                              <option value="theme">Theme</option>
                              <option value="ai_agent">AI Agent</option>
                              <option value="automation_template">Automation Template</option>
                              <option value="connector">Connector</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Short Elevator Description</label>
                          <input 
                            type="text" 
                            required
                            value={appShortDesc}
                            onChange={(e) => setAppShortDesc(e.target.value)}
                            placeholder="A brief 1-sentence descriptor that fits into listings"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Long Description &amp; Technical Capabilities</label>
                          <textarea 
                            rows={4}
                            required
                            value={appLongDesc}
                            onChange={(e) => setAppLongDesc(e.target.value)}
                            placeholder="Detailed description of functionalities, requirements, and compliance metrics"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Pricing Model</label>
                            <select 
                              value={appPricing}
                              onChange={(e: any) => setAppPricing(e.target.value)}
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            >
                              <option value="free">Free App</option>
                              <option value="subscription">Monthly Subscription</option>
                              <option value="one_time">One-time License</option>
                              <option value="usage">Usage-based Ledger billing</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Price Amount (USD)</label>
                            <input 
                              type="number" 
                              min="0"
                              disabled={appPricing === 'free'}
                              value={appPrice}
                              onChange={(e) => setAppPrice(e.target.value)}
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none disabled:opacity-50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Target Countries</label>
                            <input 
                              type="text" 
                              value={appCountries}
                              onChange={(e) => setAppCountries(e.target.value)}
                              placeholder="US, GB, CA, NG"
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Support Email Address</label>
                            <input 
                              type="email" 
                              required
                              value={appSupport}
                              onChange={(e) => setAppSupport(e.target.value)}
                              placeholder="support@yourcompany.com"
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Privacy Policy URL</label>
                            <input 
                              type="url" 
                              value={appPrivacy}
                              onChange={(e) => setAppPrivacy(e.target.value)}
                              placeholder="https://yourcompany.com/privacy"
                              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-neutral-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Scopes manifest permissions */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase text-neutral-500">Manifest Authorization Scopes Required</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[
                              { key: 'identity.read', label: 'Identity Profile Read (User email, full name)' },
                              { key: 'wallet.ledger.read', label: 'Ledger Query (Double-entry transaction lists)' },
                              { key: 'wallet.ledger.write', label: 'Ledger Posting (Submitting transactional entries)' },
                              { key: 'notifs.send', label: 'Push Notifications (Sending in-app push messages)' },
                              { key: 'analytics.push', label: 'Telemetry SDK access (Sinking platform events)' }
                            ].map((scope) => (
                              <label key={scope.key} className="flex items-start gap-2.5 p-2 bg-neutral-50 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-100 transition-all">
                                <input 
                                  type="checkbox"
                                  checked={selectedScopes.includes(scope.key)}
                                  onChange={() => toggleScope(scope.key)}
                                  className="mt-0.5"
                                />
                                <div className="text-[11px] text-neutral-700">
                                  <strong>{scope.key}</strong>
                                  <span className="block text-[10px] text-neutral-400 leading-normal">{scope.label}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-lg transition-all"
                        >
                          Submit App for Security &amp; Policy Audits
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Earnings Screen */}
                  {consoleSection === 'earnings' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900">Developer Earnings Ledger</h3>
                          <p className="text-xs text-neutral-500">Priced installations payouts audited on OMNI ledger rails.</p>
                        </div>
                      </div>

                      <div className="p-5 bg-neutral-900 text-white rounded-3xl flex justify-between items-center shadow-inner">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">Withdrawable Balance</span>
                          <span className="text-3xl font-extrabold text-white mt-1 block">
                            ${myProfile.earningsBalanceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <button 
                          onClick={() => {
                            if (myProfile.earningsBalanceUsd <= 0) {
                              triggerToast('Cashout Failed', 'Withdrawable balance must exceed $0.00.', 'error');
                              return;
                            }
                            triggerToast('Payout Initiated', 'Transferring funds to master payment ledger account.', 'success');
                          }}
                          className="bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                        >
                          Withdraw Payout
                        </button>
                      </div>

                      {/* Earnings Logs */}
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Payout Audit History</h4>
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-neutral-50 text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-neutral-200">
                              <tr>
                                <th className="p-3">Reference ID</th>
                                <th className="p-3">Source Tenant</th>
                                <th className="p-3">Gross</th>
                                <th className="p-3">Platform Fee</th>
                                <th className="p-3">Net Earnings</th>
                                <th className="p-3">Settle Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                              {state.developerEarningLogs.filter(e => e.developerId === myProfile.id).length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="p-8 text-center text-xs text-neutral-400">No licensed purchases logged yet.</td>
                                </tr>
                              ) : (
                                state.developerEarningLogs.filter(e => e.developerId === myProfile.id).map((earn) => (
                                  <tr key={earn.id} className="hover:bg-neutral-50">
                                    <td className="p-3 font-mono font-semibold">{earn.referenceInvoiceId}</td>
                                    <td className="p-3 font-mono text-neutral-500">{earn.tenantId}</td>
                                    <td className="p-3">${earn.amountGross.toFixed(2)}</td>
                                    <td className="p-3 text-rose-600">-${earn.amountFee.toFixed(2)}</td>
                                    <td className="p-3 font-bold text-emerald-600">${earn.amountNet.toFixed(2)}</td>
                                    <td className="p-3 text-neutral-400 text-[11px]">
                                      {new Date(earn.createdAt).toLocaleDateString()}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* App Review Queue (Admin screen) */}
                  {consoleSection === 'review_queue' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                        <div>
                          <h3 className="text-lg font-bold text-rose-600">App Store Review Queue</h3>
                          <p className="text-xs text-neutral-500">Global Admin Backdoor: Complete compliance checks and policy reviews.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {state.marketplaceApps.filter(a => a.status !== 'published' && a.status !== 'rejected').length === 0 ? (
                          <div className="border border-dashed border-neutral-200 rounded-2xl p-8 text-center text-xs text-neutral-400">
                            No applications currently pending administrator verification. Perfect queue clearance.
                          </div>
                        ) : (
                          state.marketplaceApps.filter(a => a.status !== 'published' && a.status !== 'rejected').map((app) => (
                            <div key={app.id} className="border border-neutral-200 rounded-2xl p-5 space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider mb-2 inline-block">
                                    Current Stage: {app.status.replace('_', ' ')}
                                  </span>
                                  <h4 className="text-md font-bold text-neutral-900">{app.name}</h4>
                                  <span className="text-[11px] text-neutral-400">Publisher: {app.developerName}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-bold text-neutral-900 block">Pricing: {app.pricingType}</span>
                                  <span className="text-[11px] text-neutral-400 block">${app.priceAmount}</span>
                                </div>
                              </div>

                              <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs font-mono text-neutral-600 leading-normal space-y-1">
                                <div><strong>Requested Scopes:</strong> [{app.manifest.requestedScopes.join(', ')}]</div>
                                <div><strong>Entrypoint:</strong> {app.manifest.entryPoint}</div>
                              </div>

                              {/* Review Action Controls */}
                              <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase text-neutral-400 font-bold block">Compliance Audit Notes</label>
                                <input 
                                  type="text" 
                                  placeholder="Review details, notes, or rejection explanation"
                                  value={reviewNotes}
                                  onChange={(e) => setReviewNotes(e.target.value)}
                                  className="bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-xs focus:outline-none"
                                />
                                
                                <div className="flex flex-wrap gap-2 pt-2">
                                  <button 
                                    onClick={() => {
                                      reviewMarketplaceApp(app.id, 'automated_check_passed', reviewNotes || 'Automated checks passed.');
                                      setReviewNotes('');
                                    }}
                                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    1. Auto checks pass
                                  </button>
                                  <button 
                                    onClick={() => {
                                      reviewMarketplaceApp(app.id, 'security_review', reviewNotes || 'Security compliance audited.');
                                      setReviewNotes('');
                                    }}
                                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    2. Mark Security Pass
                                  </button>
                                  <button 
                                    onClick={() => {
                                      reviewMarketplaceApp(app.id, 'policy_review', reviewNotes || 'Privacy policies verified.');
                                      setReviewNotes('');
                                    }}
                                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    3. Mark Policy Pass
                                  </button>
                                  <button 
                                    onClick={() => {
                                      reviewMarketplaceApp(app.id, 'published', reviewNotes || 'App published.');
                                      setReviewNotes('');
                                      triggerToast('App Approved', `Successfully published "${app.name}" to global marketplace.`, 'success');
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    Approve &amp; Publish
                                  </button>
                                  <button 
                                    onClick={() => {
                                      reviewMarketplaceApp(app.id, 'rejected', reviewNotes || 'Policy violation.');
                                      setReviewNotes('');
                                      triggerToast('App Rejected', `Marketplace submission was rejected.`, 'error');
                                    }}
                                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    Reject Submission
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 3: API DOCUMENTATION */}
        {/* ====================================================================== */}
        {activeTab === 'api_docs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Spec Documentation Column */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-1.5">
                  <Database className="w-5 h-5 text-neutral-700" />
                  Machine-Readable OpenAPI Specification
                </h3>
                <p className="text-xs text-neutral-500 font-normal leading-relaxed">
                  The OMNI platform automatically exposes live, machine-readable Swagger JSON and OpenAPI schemas. External systems fetch this structure dynamically to register routing channels.
                </p>

                <div className="bg-neutral-900 rounded-2xl p-4 overflow-x-auto max-h-96">
                  <pre className="text-neutral-300 font-mono text-[10px] leading-relaxed">
{JSON.stringify({
  "openapi": "3.0.0",
  "info": {
    "title": "OMNI Sovereign Core API",
    "description": "Double-entry financial accounting, multi-channel user notifications, and multi-tenant isolation gateway.",
    "version": "2.2.0"
  },
  "servers": [
    {
      "url": "https://api.omni.io/v1",
      "description": "Production API cluster"
    }
  ],
  "paths": {
    "/ledger/balances": {
      "get": {
        "summary": "Retrieve tenant wallet balance",
        "security": [{"BearerAuth": []}],
        "parameters": [
          {
            "name": "walletId",
            "in": "query",
            "required": true,
            "schema": {"type": "string"}
          }
        ],
        "responses": {
          "200": {
            "description": "Audit passed, returns isolated balance."
          },
          "403": {
            "description": "Cross-tenant isolation protection trigger."
          }
        }
      }
    },
    "/ledger/transfers": {
      "post": {
        "summary": "Dispatch insulated ledger wire transfer",
        "security": [{"BearerAuth": []}],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "from": {"type": "string"},
                  "to": {"type": "string"},
                  "amount": {"type": "number"},
                  "description": {"type": "string"}
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Ledger wire settled successfully."
          }
        }
      }
    }
  }
}, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Scope Hierarchy reference */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Access Scope Permissions Reference</h4>
                <div className="divide-y divide-neutral-100 text-xs">
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="font-mono text-neutral-900 font-bold bg-neutral-100 px-2 py-0.5 rounded">identity.read</span>
                    <span className="text-neutral-500 font-normal flex-1">Read user login metadata, email, and verification profiles. Perfect for SSO login extensions.</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="font-mono text-neutral-900 font-bold bg-neutral-100 px-2 py-0.5 rounded">wallet.ledger.read</span>
                    <span className="text-neutral-500 font-normal flex-1">Query double-entry transaction histories, active reseller margins, and pending client invoices.</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-start gap-4">
                    <span className="font-mono text-neutral-900 font-bold bg-neutral-100 px-2 py-0.5 rounded">wallet.ledger.write</span>
                    <span className="text-neutral-500 font-normal flex-1">Submit payment settlements, post double-entry balances, and trigger payouts to developer wallets.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quickstart Reference Column */}
            <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm h-fit space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                Security Integration Guidelines
              </h3>
              
              <div className="text-xs text-neutral-600 font-normal leading-relaxed space-y-3">
                <p>
                  <strong>1. No Direct SQL Database Access:</strong> External applications must strictly request parameters over OAuth client bearer tokens. Direct database tables are isolated automatically.
                </p>
                <p>
                  <strong>2. Revocability:</strong> Tenants retain full system access controls. An authorized integration can be revoked instantly within their application manager screen, invalidating keys.
                </p>
                <p>
                  <strong>3. Rate Limiting:</strong> All sandbox connections are capped to 120 calls per minute to prevent load surges across reseller nodes.
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-4 mt-4">
                <button 
                  onClick={() => {
                    setActiveTab('console');
                    setConsoleSection('sandbox');
                  }}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Launch Sandbox Explorer
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ====================================================================== */}
      {/* MODAL 1: APP INSTALLATION CONSENT DIALOG */}
      {/* ====================================================================== */}
      {showInstallConsent && selectedApp && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 max-w-md w-full shadow-lg space-y-5">
            
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-rose-500 font-bold uppercase shrink-0">
                {selectedApp.name.substring(0, 2)}
              </div>
              <div>
                <h3 className="text-md font-bold text-neutral-950">Install {selectedApp.name}?</h3>
                <span className="text-[10px] uppercase text-neutral-400 font-bold block">Published by {selectedApp.developerName}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-400 block">Requested Workspace Permissions (Scopes)</span>
              
              <div className="space-y-1.5">
                {selectedApp.manifest.requestedScopes.map((scope) => (
                  <div key={scope} className="bg-rose-50/50 border border-rose-100 p-2 rounded-xl text-[11px] text-rose-950 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-mono">{scope}</strong>
                      <p className="text-[10px] text-neutral-500 font-normal leading-normal">Allows access to isolated tenant double-entry parameters.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-xl text-xs text-neutral-600 font-normal leading-relaxed">
              {selectedApp.pricingType === 'free' ? (
                <span>This application is completely free to license within this workspace.</span>
              ) : (
                <span>
                  Licensing this integration instantly debits <strong>${selectedApp.priceAmount}</strong> from your master wallet, allocating the payout directly inside the developer earning register.
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setShowInstallConsent(false);
                  setSelectedApp(null);
                }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold py-2 px-4 rounded-xl transition-all flex-1"
              >
                Cancel
              </button>
              
              <button 
                onClick={() => {
                  const currentTenant = state.user?.currentTenantId || 'tenant_dynasty_99';
                  installMarketplaceApp(currentTenant, selectedApp.id, installationScopes);
                  setShowInstallConsent(false);
                  setSelectedApp(null);
                }}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all flex-1"
              >
                Approve &amp; License
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
