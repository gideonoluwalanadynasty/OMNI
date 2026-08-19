import React, { useState, useEffect } from 'react';
import { 
  Layers, Settings, Globe, Palette, Coins, Users, Shield, Activity, 
  ChevronRight, ChevronLeft, Plus, Check, CheckCircle, XCircle, 
  RefreshCw, Sliders, Sparkles, Lock, TrendingUp, DollarSign, 
  Award, FileText, Mail, ArrowRight, Trash2, HelpCircle, AlertTriangle, Monitor, Copy
} from 'lucide-react';
import { OMNIState, TenantPlatform, ResellerNode, ResellerEconomics, WhiteLabelLevel, ColorSystem, TypographyConfig, TerminologyConfig, LegalPage } from '../types';
import { BRAND_PRESETS } from '../white_label_store_data';

interface OMNIWhiteLabelPageProps {
  state: OMNIState;
  addAuditLog: (action: string, module: string, details: string) => void;
  triggerToast: (title: string, description: string, type: 'success' | 'info' | 'error') => void;
  setView: (view: string, appId: string | null) => void;
  // White Label & Reseller Hook Handlers
  launchWhiteLabelPlatform: (platform: TenantPlatform) => void;
  updateWhiteLabelBranding: (platformId: string, branding: TenantPlatform['branding']) => void;
  updateWhiteLabelDomain: (platformId: string, domain: TenantPlatform['domain']) => void;
  updateResellerNodes: (nodes: ResellerNode[]) => void;
  updateResellerEconomics: (economics: ResellerEconomics[]) => void;
  updateSuperAdminControls: (controls: OMNIState['superAdminControls']) => void;
  verifyDnsRecord: (platformId: string) => void;
  provisionSslCertificate: (platformId: string) => void;
  recordDoubleEntryTransaction: (
    debitAccount: string,
    creditAccount: string,
    debitType: any,
    creditType: any,
    amount: number,
    currency: string,
    description: string,
    referenceId: string
  ) => void;
}

export default function OMNIWhiteLabelPage({
  state,
  addAuditLog,
  triggerToast,
  setView,
  launchWhiteLabelPlatform,
  updateWhiteLabelBranding,
  updateWhiteLabelDomain,
  updateResellerNodes,
  updateResellerEconomics,
  updateSuperAdminControls,
  verifyDnsRecord,
  provisionSslCertificate,
  recordDoubleEntryTransaction
}: OMNIWhiteLabelPageProps) {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'platforms' | 'wizard' | 'resellers' | 'superadmin'>('platforms');

  // Selected Tenant Platform for the detail panel
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>(
    state.tenantPlatforms?.[0]?.id || ''
  );
  const selectedPlatform = state.tenantPlatforms?.find(p => p.id === selectedPlatformId) || state.tenantPlatforms?.[0];

  // --- WIZARD STATE ---
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardConfig, setWizardConfig] = useState({
    name: 'My Branded Platform',
    level: 'level_1_app' as WhiteLabelLevel,
    businessType: 'E-commerce',
    selectedApps: ['app_market'] as string[],
    templateId: 'tpl_marketplace',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
    faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=32&auto=format&fit=crop&q=60',
    colors: {
      primary: '#1E293B',
      secondary: '#475569',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      accent: '#3B82F6',
      text: '#0F172A'
    } as ColorSystem,
    typography: {
      displayFont: 'Plus Jakarta Sans',
      bodyFont: 'Inter',
      baseSize: '16px',
      lineHeight: 1.6
    } as TypographyConfig,
    terminology: {
      platformName: 'OmniBrand',
      appsLabel: 'Modules',
      merchantLabel: 'Sellers',
      customerLabel: 'Buyers',
      walletLabel: 'Balance',
      affiliateLabel: 'Partners'
    } as TerminologyConfig,
    subdomain: 'mybrand',
    customDomain: 'mybrand.com',
    appDomain: 'app.mybrand.com',
    countries: ['US', 'ZA', 'NG'] as string[],
    currencies: ['USD', 'ZAR', 'NGN'] as string[],
    languages: ['en_US'] as string[],
    baseMonthlyFee: 299,
    revenueSharePercent: 5.0,
    referralRatePercent: 10.0,
    minimumCommitment: 500,
    homepageHeadline: 'A Sovereign Platform Tailored For Your Growth',
    homepageSubheadline: 'Secure checkout, real-time double-entry clearing, and automated delivery networks.',
    footerText: 'Powered by OMNI Sovereign Infrastructure.',
    emailHeaderHex: '#3B82F6',
    aiPrompt: 'Create an elegant pan-African fashion marketplace targeting young professionals'
  });

  const [aiDesignerLoading, setAiDesignerLoading] = useState(false);

  // Apply template preset to wizard
  const applyPresetToWizard = (presetId: string) => {
    const preset = BRAND_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setWizardConfig(prev => ({
      ...prev,
      templateId: preset.id,
      colors: { ...preset.colorSystem },
      typography: { ...preset.typography },
      terminology: { ...preset.terminology },
      selectedApps: [...preset.appIds],
      homepageHeadline: preset.homepageHeadline,
      homepageSubheadline: preset.homepageSubheadline,
      footerText: preset.footerText,
      emailHeaderHex: preset.emailHeaderHex
    }));
    triggerToast('Preset Applied', `Loaded cohesive styles and configurations for "${preset.name}".`, 'info');
  };

  // Run Gemini AI Website Designer
  const runAiWebsiteDesigner = async () => {
    if (!wizardConfig.aiPrompt.trim()) {
      triggerToast('Prompt Required', 'Please enter a description for your digital platform.', 'error');
      return;
    }

    setAiDesignerLoading(true);
    try {
      const response = await fetch('/api/ai/website-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: wizardConfig.aiPrompt })
      });

      const data = await response.json();
      if (data.success && data.designConfig) {
        const config = data.designConfig;
        setWizardConfig(prev => ({
          ...prev,
          name: config.name,
          colors: config.colors,
          typography: config.typography,
          terminology: config.terminology,
          selectedApps: config.apps,
          homepageHeadline: config.homepageHeadline,
          homepageSubheadline: config.homepageSubheadline,
          footerText: `${config.name} is powered by Dynasty OMNI.`,
          emailHeaderHex: config.colors.accent,
          level: config.apps.length > 2 ? 'level_3_super_platform' : config.apps.length > 1 ? 'level_2_suite' : 'level_1_app'
        }));
        triggerToast('AI Design Formulated', `Gemini generated elegant layout configurations for "${config.name}".`, 'success');
        // Jump to preview step
        setWizardStep(9);
      } else {
        throw new Error('Inference returned empty configuration.');
      }
    } catch (err) {
      console.error(err);
      triggerToast('AI Designer Failed', 'Unable to execute Gemini model. Loaded local premium templates instead.', 'error');
    } finally {
      setAiDesignerLoading(false);
    }
  };

  // Launch wizard platform
  const handleLaunchPlatform = () => {
    // Check against Super Admin policy limits
    if (wizardConfig.baseMonthlyFee < state.superAdminControls.minimumMonthlyPriceUsd) {
      triggerToast('Price Restraint Alert', `Platform pricing must equal or exceed OMNI Minimum price limit: $${state.superAdminControls.minimumMonthlyPriceUsd}.`, 'error');
      return;
    }

    // Verify KYB requirement
    if (state.superAdminControls.policyRequirements.kybRequiredBeforeLaunch) {
      const isVerified = state.user?.verificationStatus?.organizationVerified || state.user?.verificationStatus?.businessVerified || state.organizations.find(o => o.id === state.currentOrgId)?.kybVerified;
      if (!isVerified) {
        triggerToast('KYB Required', 'Sovereign administrative policy requires verified KYB audit credentials before launching tenant networks.', 'error');
        return;
      }
    }

    const newPlatform: TenantPlatform = {
      id: `plat_${Math.random().toString(36).substring(2, 9)}`,
      name: wizardConfig.name,
      ownerOrgId: state.currentOrgId || 'org_sandbox',
      ownerUserId: state.user?.id || 'usr_anonymous',
      level: wizardConfig.level,
      slug: wizardConfig.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logoUrl: wizardConfig.logoUrl,
      faviconUrl: wizardConfig.faviconUrl,
      templateId: wizardConfig.templateId,
      apps: wizardConfig.selectedApps,
      domain: {
        subdomain: `${wizardConfig.subdomain}.omni.com`,
        customDomain: wizardConfig.customDomain || undefined,
        appDomain: wizardConfig.appDomain || undefined,
        dnsStatus: 'unverified',
        txtRecordName: `_omni-challenge.${wizardConfig.customDomain}`,
        txtRecordValue: `omni-txt-challenge-k8s-${Math.random().toString(36).substring(2, 10)}`,
        cnameTarget: 'tenant.omni.com',
        sslStatus: 'inactive',
        canonicalSelection: 'subdomain'
      },
      branding: {
        colorSystem: wizardConfig.colors,
        typography: wizardConfig.typography,
        terminology: wizardConfig.terminology,
        homepageHeadline: wizardConfig.homepageHeadline,
        homepageSubheadline: wizardConfig.homepageSubheadline,
        footerText: wizardConfig.footerText,
        emailHeaderHex: wizardConfig.emailHeaderHex,
        navigationItems: [
          { label: 'Explore Catalog', href: '#catalog' },
          { label: `${wizardConfig.terminology.customerLabel} Hub`, href: '#patrons' },
          { label: `Join as ${wizardConfig.terminology.affiliateLabel}`, href: '#partners' }
        ]
      },
      countries: wizardConfig.countries,
      currencies: wizardConfig.currencies,
      languages: wizardConfig.languages,
      pricing: {
        baseMonthlyFee: wizardConfig.baseMonthlyFee,
        revenueSharePercent: state.superAdminControls.defaultRevenueSharePercent,
        payoutMethod: 'OMNI Pay Ledger Direct'
      },
      commissions: {
        referralRatePercent: wizardConfig.referralRatePercent,
        minimumCommitment: wizardConfig.minimumCommitment
      },
      analytics: {
        visitors24h: 0,
        registrations30d: 0,
        volume30d: 0.0
      },
      status: 'active',
      createdAt: new Date().toISOString()
    };

    // Charge the launching fee
    const feeAmount = 149.00; // Launch fee
    recordDoubleEntryTransaction(
      `merchant_org_${newPlatform.ownerOrgId}`,
      'platform_treasury',
      'merchants',
      'platform',
      feeAmount,
      'USD',
      `White-Label launching license fee for platform: ${newPlatform.name}`,
      `wl_setup_${newPlatform.id.slice(5)}`
    );

    // Call the launcher hook
    launchWhiteLabelPlatform(newPlatform);
    setSelectedPlatformId(newPlatform.id);
    setActiveTab('platforms');
    setWizardStep(1); // reset step
  };


  // --- RESELLER MANAGEMENT STATE ---
  const [hierarchyNodes, setHierarchyNodes] = useState<ResellerNode[]>(state.resellerNodes);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    state.resellerNodes.find(n => n.type === 'master_reseller')?.id || ''
  );
  const selectedNode = state.resellerNodes.find(n => n.id === selectedNodeId);
  const selectedEconomics = state.resellerEconomics.find(e => e.resellerNodeId === selectedNodeId);

  // New Node form state
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<'master_reseller' | 'reseller' | 'tenant'>('reseller');
  const [newNodeParent, setNewNodeParent] = useState(
    state.resellerNodes.find(n => n.type === 'master_reseller')?.id || ''
  );

  const handleAddResellerNode = () => {
    if (!newNodeName.trim()) {
      triggerToast('Name required', 'Please input a name for the reseller node.', 'error');
      return;
    }

    const parent = state.resellerNodes.find(n => n.id === newNodeParent);
    const parentLevel = parent ? parent.level : 0;

    // Nesting depth constraints check (Do not assume unlimited nesting)
    if (parentLevel >= 3) {
      triggerToast('Nesting Cap Exceeded', 'Nesting structural limit exceeded. Administrative configuration caps reseller pathways to a depth of 4 tiers.', 'error');
      return;
    }

    const newNode: ResellerNode = {
      id: `res_node_${Math.random().toString(36).substring(2, 9)}`,
      name: newNodeName,
      type: newNodeType,
      parentId: newNodeParent,
      status: 'active',
      level: parentLevel + 1
    };

    const newEco: ResellerEconomics = {
      id: `eco_node_${Math.random().toString(36).substring(2, 9)}`,
      resellerNodeId: newNode.id,
      wholesalePriceUsd: 150,
      resellerMarkupPercent: 20,
      recurringRevenueSharePercent: 10,
      commissionPercent: 1.0,
      minimumCommitmentUsd: 500,
      tierPricing: [
        { maxTenants: 5, costPerTenantUsd: 150 },
        { maxTenants: 20, costPerTenantUsd: 120 },
        { maxTenants: 9999, costPerTenantUsd: 100 }
      ]
    };

    const updatedNodes = [...state.resellerNodes, newNode];
    const updatedEco = [...state.resellerEconomics, newEco];

    updateResellerNodes(updatedNodes);
    updateResellerEconomics(updatedEco);

    setNewNodeName('');
    setSelectedNodeId(newNode.id);
    triggerToast('Reseller Added', `Node "${newNode.name}" registered in global organizational tree.`, 'success');
  };

  const handleUpdateEconomics = (wholesale: number, markup: number, revShare: number, minimum: number) => {
    if (!selectedNodeId) return;

    const updatedEconomics = state.resellerEconomics.map(e => {
      if (e.resellerNodeId === selectedNodeId) {
        return {
          ...e,
          wholesalePriceUsd: wholesale,
          resellerMarkupPercent: markup,
          recurringRevenueSharePercent: revShare,
          minimumCommitmentUsd: minimum
        };
      }
      return e;
    });

    updateResellerEconomics(updatedEconomics);
    triggerToast('Wholesale Saved', 'Reseller economics margin, rev share, and contract minimums updated.', 'success');
  };


  // --- SUPER ADMIN POLICY CONTROL ---
  const [adminApps, setAdminApps] = useState<string[]>(state.superAdminControls.permittedApps);
  const [adminPrice, setAdminPrice] = useState<number>(state.superAdminControls.minimumMonthlyPriceUsd);
  const [adminRevShare, setAdminRevShare] = useState<number>(state.superAdminControls.defaultRevenueSharePercent);
  const [adminMfa, setAdminMfa] = useState<boolean>(state.superAdminControls.policyRequirements.mfaRequiredForOperators);
  const [adminKyb, setAdminKyb] = useState<boolean>(state.superAdminControls.policyRequirements.kybRequiredBeforeLaunch);

  const handleSaveSuperAdminControls = () => {
    const updated: OMNIState['superAdminControls'] = {
      ...state.superAdminControls,
      permittedApps: adminApps,
      minimumMonthlyPriceUsd: adminPrice,
      defaultRevenueSharePercent: adminRevShare,
      policyRequirements: {
        mfaRequiredForOperators: adminMfa,
        kybRequiredBeforeLaunch: adminKyb
      }
    };
    updateSuperAdminControls(updated);
    triggerToast('Policies Enforced', 'Super Admin policies, pricing constraints, and verification mandates saved.', 'success');
  };


  // Copy utility
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast('Copied', 'Record committed to clipboard buffer.', 'info');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6" id="omni-white-label-hub">
      {/* Header Panel */}
      <header className="mb-6 bg-slate-900 text-white rounded-xl p-6 shadow-md relative overflow-hidden" id="wl-header">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Layers className="w-48 h-48" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Flagship Capability
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">White-Label & Reseller Portal</h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Launch self-branded digital networks powered entirely by Dynasty OMNI core accounting ledgers, sovereign domains, and real-time payment adapters.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('wizard')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-all shadow flex items-center gap-2"
              id="btn-launch-wizard"
            >
              <Plus className="w-4 h-4" /> Onboarding Wizard
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <nav className="flex gap-2 mt-6 border-t border-slate-800 pt-4" aria-label="White label navigation tabs">
          <button
            onClick={() => setActiveTab('platforms')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'platforms' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-platforms"
          >
            <Layers className="w-4 h-4" /> My Platforms ({state.tenantPlatforms.length})
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'wizard' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-wizard"
          >
            <Sparkles className="w-4 h-4" /> Platform Builder
          </button>
          <button
            onClick={() => setActiveTab('resellers')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'resellers' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-resellers"
          >
            <Users className="w-4 h-4" /> Resellers Network
          </button>
          <button
            onClick={() => setActiveTab('superadmin')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'superadmin' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-superadmin"
          >
            <Shield className="w-4 h-4" /> Super Admin Controls
          </button>
        </nav>
      </header>

      {/* ========================================== */}
      {/* VIEW: PLATFORMS DIRECTORY & CONTROL CENTER */}
      {/* ========================================== */}
      {activeTab === 'platforms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-platforms">
          {/* Platform List */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Launched Platforms
            </h2>
            <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {state.tenantPlatforms.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Layers className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-medium">No white-label platforms launched yet.</p>
                  <button 
                    onClick={() => setActiveTab('wizard')}
                    className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
                  >
                    Launch First Platform
                  </button>
                </div>
              ) : (
                state.tenantPlatforms.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatformId(plat.id)}
                    className={`w-full p-4 text-left transition-all hover:bg-slate-50 flex items-center justify-between ${
                      selectedPlatformId === plat.id ? 'bg-slate-50 border-l-4 border-blue-600 pl-3' : 'border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100 flex items-center justify-center">
                        {plat.logoUrl ? (
                          <img src={plat.logoUrl} alt={plat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <Layers className="w-5 h-5 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{plat.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">{plat.domain.subdomain}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-2 h-2 rounded-full ${plat.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                            {plat.level === 'level_1_app' ? 'L1 App' : plat.level === 'level_2_suite' ? 'L2 Suite' : 'L3 Super'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Platform Detail & Control Center */}
          <div className="lg:col-span-8">
            {selectedPlatform ? (
              <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden" id="tenant-control-center">
                {/* Header detail */}
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      {selectedPlatform.logoUrl ? (
                        <img src={selectedPlatform.logoUrl} alt={selectedPlatform.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <Layers className="w-7 h-7 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-800 leading-tight">{selectedPlatform.name}</h2>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {selectedPlatform.level.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 font-mono mt-0.5">{selectedPlatform.domain.customDomain || selectedPlatform.domain.subdomain}</p>
                    </div>
                  </div>

                  {/* Active Platform Controls */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
                    </span>
                  </div>
                </div>

                {/* Main panel stats */}
                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="bg-white rounded-lg p-4 border border-slate-200/60 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Visitors (24h)</span>
                      <p className="text-lg font-bold text-slate-800">{(selectedPlatform.analytics.visitors24h || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200/60 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium">{selectedPlatform.branding.terminology.customerLabel}s (30d)</span>
                      <p className="text-lg font-bold text-slate-800">{(selectedPlatform.analytics.registrations30d || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-slate-200/60 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Volume (30d)</span>
                      <p className="text-lg font-bold text-slate-800">${(selectedPlatform.analytics.volume30d || 0.0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Subsections: Domains, Customizations, Apps */}
                <div className="p-6 space-y-8">
                  {/* Enabled OMNI Apps */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-500" /> Linked OMNI Application Modules
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPlatform.apps.map(appId => {
                        const app = state.apps.find(a => a.id === appId);
                        return (
                          <div key={appId} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100/50 transition-all">
                            <div className="flex items-center gap-2.5">
                              <span className="p-1.5 bg-white shadow-sm rounded border border-slate-100 text-slate-600 font-bold text-xs">
                                {app?.name.slice(0, 2)}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{app?.name || appId}</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{app?.description}</p>
                              </div>
                            </div>
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded">Active</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sovereign Domain Manager */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" /> Sovereign Domain & DNS Settings
                    </h3>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div>
                          <span className="text-xs text-slate-400 font-medium">Canonical Active Address</span>
                          <p className="text-sm font-bold text-slate-800 font-mono mt-0.5">
                            {selectedPlatform.domain.customDomain || selectedPlatform.domain.subdomain}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => verifyDnsRecord(selectedPlatform.id)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Scan DNS
                          </button>
                          <button
                            onClick={() => provisionSslCertificate(selectedPlatform.id)}
                            disabled={selectedPlatform.domain.dnsStatus !== 'verified'}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all ${
                              selectedPlatform.domain.dnsStatus === 'verified'
                                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <Shield className="w-3.5 h-3.5" /> Provision SSL
                          </button>
                        </div>
                      </div>

                      <div className="p-4 divide-y divide-slate-100">
                        {/* Domain info row */}
                        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Subdomain</span>
                          <span className="text-xs text-slate-700 font-mono sm:col-span-2">{selectedPlatform.domain.subdomain}</span>
                        </div>

                        {/* Custom domain configuration */}
                        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Domain</span>
                          <div className="sm:col-span-2 flex items-center gap-2">
                            <span className="text-xs text-slate-700 font-mono">{selectedPlatform.domain.customDomain || 'Not configured'}</span>
                            <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full uppercase ${
                              selectedPlatform.domain.dnsStatus === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {selectedPlatform.domain.dnsStatus}
                            </span>
                          </div>
                        </div>

                        {/* TXT Challenge Record */}
                        <div className="py-4 space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Domain Verification Record</span>
                          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="space-y-1 font-mono text-xs text-slate-600">
                              <div><span className="text-slate-400">TYPE:</span> TXT</div>
                              <div><span className="text-slate-400">NAME:</span> {selectedPlatform.domain.txtRecordName}</div>
                              <div className="truncate max-w-full"><span className="text-slate-400">VALUE:</span> {selectedPlatform.domain.txtRecordValue}</div>
                            </div>
                            <button
                              onClick={() => copyTextToClipboard(selectedPlatform.domain.txtRecordValue)}
                              className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-100 flex items-center gap-1 flex-shrink-0"
                            >
                              <Copy className="w-3.5 h-3.5" /> Copy Challenge
                            </button>
                          </div>
                        </div>

                        {/* SSL Status */}
                        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SSL Security Shield</span>
                          <div className="sm:col-span-2 flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
                              selectedPlatform.domain.sslStatus === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {selectedPlatform.domain.sslStatus === 'active' ? (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                              )}
                              SSL {selectedPlatform.domain.sslStatus.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand Visual Customizations */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <Palette className="w-4 h-4 text-slate-500" /> Custom Visual Branding configuration
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Typography & Copy */}
                      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Display Settings</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400">Display Font:</span>
                            <div className="font-semibold text-slate-800 mt-0.5">{selectedPlatform.branding.typography.displayFont}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Body Font:</span>
                            <div className="font-semibold text-slate-800 mt-0.5">{selectedPlatform.branding.typography.bodyFont}</div>
                          </div>
                        </div>
                        <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                          <div>
                            <span className="text-slate-400">Homepage Headline:</span>
                            <div className="font-medium text-slate-800 mt-0.5 italic">"{selectedPlatform.branding.homepageHeadline}"</div>
                          </div>
                        </div>
                      </div>

                      {/* Terminology Override */}
                      <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Custom Terminology</h4>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-xs">
                          <div>
                            <span className="text-slate-400">Apps Label:</span>
                            <div className="font-bold text-slate-800 mt-0.5">{selectedPlatform.branding.terminology.appsLabel}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Customer Label:</span>
                            <div className="font-bold text-slate-800 mt-0.5">{selectedPlatform.branding.terminology.customerLabel}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Merchant Label:</span>
                            <div className="font-bold text-slate-800 mt-0.5">{selectedPlatform.branding.terminology.merchantLabel}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Wallet Label:</span>
                            <div className="font-bold text-slate-800 mt-0.5">{selectedPlatform.branding.terminology.walletLabel}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Simulation Preview Trigger */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <Monitor className="w-5 h-5 text-blue-600" /> Interactive Platform Preview
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Simulate how your customized white-label website looks to live internet visitors!
                        </p>
                      </div>
                    </div>

                    {/* RENDER DYNAMIC THEME DEMO SCREEN */}
                    <div 
                      className="border rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                      style={{ 
                        backgroundColor: selectedPlatform.branding.colorSystem.background,
                        fontFamily: selectedPlatform.branding.typography.bodyFont,
                        borderColor: selectedPlatform.branding.colorSystem.primary + '20'
                      }}
                    >
                      {/* Browser Navbar mockup */}
                      <div className="bg-slate-900 px-4 py-2.5 flex items-center gap-2 border-b border-slate-800 text-slate-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <div className="ml-4 bg-slate-800 px-3 py-1 rounded-md text-[10px] font-mono w-72 truncate">
                          https://{selectedPlatform.domain.customDomain || selectedPlatform.domain.subdomain}
                        </div>
                      </div>

                      {/* Header bar styled matching customization colors */}
                      <header 
                        className="px-6 py-4 flex justify-between items-center border-b"
                        style={{ 
                          backgroundColor: selectedPlatform.branding.colorSystem.surface,
                          borderColor: selectedPlatform.branding.colorSystem.primary + '15'
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm"
                            style={{ backgroundColor: selectedPlatform.branding.colorSystem.primary }}
                          >
                            {selectedPlatform.branding.terminology.platformName.slice(0, 2)}
                          </div>
                          <span 
                            className="font-bold tracking-tight"
                            style={{ 
                              color: selectedPlatform.branding.colorSystem.text,
                              fontFamily: selectedPlatform.branding.typography.displayFont
                            }}
                          >
                            {selectedPlatform.branding.terminology.platformName}
                          </span>
                        </div>
                        <nav className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                          {selectedPlatform.branding.navigationItems.map((n, i) => (
                            <span key={i} className="hover:opacity-80 cursor-pointer">{n.label}</span>
                          ))}
                        </nav>
                        <button 
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow"
                          style={{ backgroundColor: selectedPlatform.branding.colorSystem.accent }}
                        >
                          Sign In
                        </button>
                      </header>

                      {/* Main Hero block */}
                      <div className="p-8 text-center max-w-3xl mx-auto space-y-4 my-6">
                        <h1 
                          className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
                          style={{ 
                            color: selectedPlatform.branding.colorSystem.text,
                            fontFamily: selectedPlatform.branding.typography.displayFont
                          }}
                        >
                          {selectedPlatform.branding.homepageHeadline}
                        </h1>
                        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                          {selectedPlatform.branding.homepageSubheadline}
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                          <button 
                            className="px-5 py-2 rounded-lg text-xs font-bold text-white shadow-md hover:opacity-90 transition-all"
                            style={{ backgroundColor: selectedPlatform.branding.colorSystem.accent }}
                          >
                            Browse {selectedPlatform.branding.terminology.appsLabel}
                          </button>
                          <button 
                            className="px-5 py-2 bg-white rounded-lg text-xs font-bold shadow-sm border hover:bg-slate-50 transition-all"
                            style={{ color: selectedPlatform.branding.colorSystem.text, borderColor: selectedPlatform.branding.colorSystem.primary + '20' }}
                          >
                            Meet {selectedPlatform.branding.terminology.merchantLabel}s
                          </button>
                        </div>
                      </div>

                      {/* Feature Grid with Layout Logic */}
                      <div className="px-8 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div 
                          className="p-5 rounded-xl border bg-white shadow-sm"
                          style={{ borderColor: selectedPlatform.branding.colorSystem.primary + '10' }}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 mb-3">
                            <Shield className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">Double-Entry Cleared</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            Every acquisition tracks transactional double-entry ledger audits instantly.
                          </p>
                        </div>
                        <div 
                          className="p-5 rounded-xl border bg-white shadow-sm"
                          style={{ borderColor: selectedPlatform.branding.colorSystem.primary + '10' }}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-50 text-purple-600 mb-3">
                            <Globe className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">Sovereign Gateway</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            Run native cross-border clearings on local subdomains or custom domains.
                          </p>
                        </div>
                        <div 
                          className="p-5 rounded-xl border bg-white shadow-sm"
                          style={{ borderColor: selectedPlatform.branding.colorSystem.primary + '10' }}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600 mb-3">
                            <Coins className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-xs text-slate-800">{selectedPlatform.branding.terminology.walletLabel} Wallet</h4>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            A secure wallet showing available ledger margins, affiliate rewards, and refunds.
                          </p>
                        </div>
                      </div>

                      {/* Footer mockup */}
                      <footer 
                        className="p-6 text-center text-xs border-t border-slate-100"
                        style={{ 
                          backgroundColor: selectedPlatform.branding.colorSystem.surface,
                          borderColor: selectedPlatform.branding.colorSystem.primary + '10',
                          color: selectedPlatform.branding.colorSystem.text + '90'
                        }}
                      >
                        <p>{selectedPlatform.branding.footerText}</p>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow border border-slate-200 p-8 text-center text-slate-500">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="font-medium text-slate-600">No platforms selected</p>
                <p className="text-xs text-slate-400 mt-1">Please select an launched platform from directory sidebar, or launch a new one using Platform Builder.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW: PLATFORM BUILDER (ONBOARDING WIZARD) */}
      {/* ========================================== */}
      {activeTab === 'wizard' && (
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden" id="view-platform-builder">
          {/* Header Progress Tracker */}
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" /> Platform Onboarding Wizard
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Configure and preview your branded sovereign tenant network before launching on core OMNI pipelines.
            </p>

            {/* Steps indicator bar */}
            <div className="flex items-center gap-1.5 mt-6 overflow-x-auto pb-2">
              {[
                { s: 1, label: 'Business Type' },
                { s: 2, label: 'Applications' },
                { s: 3, label: 'AI Designer' },
                { s: 4, label: 'Visual Brand' },
                { s: 5, label: 'Custom Domain' },
                { s: 6, label: 'Geo & Currencies' },
                { s: 7, label: 'Payments & Pricing' },
                { s: 8, label: 'Commissions' },
                { s: 9, label: 'Launch Preview' }
              ].map((step) => (
                <div key={step.s} className="flex items-center gap-1 flex-shrink-0">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep === step.s 
                      ? 'bg-blue-600 text-white shadow' 
                      : wizardStep > step.s 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {wizardStep > step.s ? <Check className="w-3.5 h-3.5" /> : step.s}
                  </span>
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${
                    wizardStep === step.s ? 'text-blue-600' : 'text-slate-400'
                  }`}>
                    {step.label}
                  </span>
                  {step.s < 9 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                </div>
              ))}
            </div>
          </div>

          {/* Wizard Content Panels */}
          <div className="p-8">
            {/* STEP 1: CHOOSE BUSINESS TYPE */}
            {wizardStep === 1 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-1">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">1. Select your target digital business archetype</h3>
                  <p className="text-xs text-slate-400 mt-1">This configures initial presets and terminologies matched to your vertical.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { type: 'E-commerce', desc: 'Sellers publish physical items, shipping via OMNI logistics, settled via mobile money or stripe.' },
                    { type: 'Media & Creator', desc: 'Creators sell music tracks, videos, and subscription channels with automated splits.' },
                    { type: 'Education & Academics', desc: 'Instructors sell syllabi, courses, and publish verifiable certificates on the ledger.' },
                    { type: 'B2B Wholesale', desc: 'Manufacturers publish industrial catalogs, taking RFQ quotes and bulk tier price bids.' }
                  ].map((archetype) => (
                    <button
                      key={archetype.type}
                      onClick={() => setWizardConfig(prev => ({ ...prev, businessType: archetype.type }))}
                      className={`p-5 rounded-xl border text-left transition-all ${
                        wizardConfig.businessType === archetype.type
                          ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <h4 className="font-bold text-sm text-slate-800">{archetype.type}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{archetype.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE APPLICATIONS */}
            {wizardStep === 2 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">2. Select Linked OMNI Application Modules</h3>
                  <p className="text-xs text-slate-400 mt-1">These micro-apps are bound securely into your white-labeled single core layout.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {state.apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        const exists = wizardConfig.selectedApps.includes(app.id);
                        const updated = exists
                          ? wizardConfig.selectedApps.filter(id => id !== app.id)
                          : [...wizardConfig.selectedApps, app.id];
                        setWizardConfig(prev => ({ ...prev, selectedApps: updated }));
                      }}
                      className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        wizardConfig.selectedApps.includes(app.id)
                          ? 'border-blue-600 bg-blue-50/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={wizardConfig.selectedApps.includes(app.id)}
                        onChange={() => {}} // handled by parent button click
                        className="mt-1"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                          {app.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{app.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                  <Layers className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <strong>White-Label Setup Level Constraints:</strong> Single app selector triggers Level 1 licensing. Selecting 2 to 3 micro-apps upgrades setup to Level 2. Selecting 4+ modules configures Level 3 Super Platform.
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: AI WEBSITE DESIGNER */}
            {wizardStep === 3 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">3. Execute Gemini AI Website Designer</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Let AI generate cohesive styles, terminologies, typography, and copy layout matching your idea.</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Describe your dream digital network</label>
                  <textarea
                    rows={4}
                    value={wizardConfig.aiPrompt}
                    onChange={(e) => setWizardConfig(prev => ({ ...prev, aiPrompt: e.target.value }))}
                    placeholder="e.g. Create an elegant luxury watch atelier platform with a deep dark-mode gold theme..."
                    className="w-full rounded-lg border border-slate-200 p-3 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium text-slate-800"
                  />
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <HelpCircle className="w-3.5 h-3.5" /> Generates color grids, displaying fonts, terminologies, and marketing headlines.
                    </div>
                    <button
                      onClick={runAiWebsiteDesigner}
                      disabled={aiDesignerLoading}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
                    >
                      {aiDesignerLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Gemini is thinking...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" /> Ask AI Designer
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-xs text-slate-400 font-medium">Or manually skip and design yourself by clicking next below.</span>
                </div>
              </div>
            )}

            {/* STEP 4: BRAND CUSTOMIZATION */}
            {wizardStep === 4 && (
              <div className="space-y-6 max-w-4xl mx-auto" id="step-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">4. Configure Visual Brand & Terminologies</h3>
                  <p className="text-xs text-slate-400 mt-1">Audit and adjust your visual colors, displaying typography, and labels.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Visual assets */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Visual Assets</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Platform Title</label>
                        <input
                          type="text"
                          value={wizardConfig.name}
                          onChange={(e) => setWizardConfig(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50 font-medium text-slate-800"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Logo Image Link</label>
                        <input
                          type="text"
                          value={wizardConfig.logoUrl}
                          onChange={(e) => setWizardConfig(prev => ({ ...prev, logoUrl: e.target.value }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50 font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider pt-3">Visual Palette</h4>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['primary', 'secondary', 'background', 'surface', 'accent', 'text'].map((colorName) => (
                        <div key={colorName} className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">{colorName}</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="color"
                              value={(wizardConfig.colors as any)[colorName]}
                              onChange={(e) => setWizardConfig(prev => ({
                                ...prev,
                                colors: { ...prev.colors, [colorName]: e.target.value }
                              }))}
                              className="w-6 h-6 rounded overflow-hidden cursor-pointer"
                            />
                            <input
                              type="text"
                              value={(wizardConfig.colors as any)[colorName]}
                              onChange={(e) => setWizardConfig(prev => ({
                                ...prev,
                                colors: { ...prev.colors, [colorName]: e.target.value }
                              }))}
                              className="w-16 border rounded text-[10px] font-mono p-1 text-slate-700 bg-slate-50"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terminologies & Typography */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Custom Nomenclature</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Apps/Modules Label</label>
                        <input
                          type="text"
                          value={wizardConfig.terminology.appsLabel}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            terminology: { ...prev.terminology, appsLabel: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Customer/Buyer Label</label>
                        <input
                          type="text"
                          value={wizardConfig.terminology.customerLabel}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            terminology: { ...prev.terminology, customerLabel: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Merchant/Seller Label</label>
                        <input
                          type="text"
                          value={wizardConfig.terminology.merchantLabel}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            terminology: { ...prev.terminology, merchantLabel: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Wallet/Balance Label</label>
                        <input
                          type="text"
                          value={wizardConfig.terminology.walletLabel}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            terminology: { ...prev.terminology, walletLabel: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50"
                        />
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider pt-3">Typography Pairing</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Display Font</label>
                        <select
                          value={wizardConfig.typography.displayFont}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            typography: { ...prev.typography, displayFont: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2 text-xs bg-slate-50"
                        >
                          <option value="Playfair Display">Playfair Display (Premium/Classic)</option>
                          <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern/Sleek)</option>
                          <option value="Sora">Sora (Tech/Bold)</option>
                          <option value="DM Sans">DM Sans (Minimalist/Geom)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500">Body Font</label>
                        <select
                          value={wizardConfig.typography.bodyFont}
                          onChange={(e) => setWizardConfig(prev => ({
                            ...prev,
                            typography: { ...prev.typography, bodyFont: e.target.value }
                          }))}
                          className="w-full rounded-md border border-slate-200 p-2 text-xs bg-slate-50"
                        >
                          <option value="Inter">Inter (Readability/Neutral)</option>
                          <option value="Sora">Sora (Clean/Round)</option>
                          <option value="DM Sans">DM Sans (Aesthetic)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CUSTOM DOMAIN */}
            {wizardStep === 5 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">5. Configure Sovereign Custom Domain</h3>
                  <p className="text-xs text-slate-400 mt-1">Bind your custom domains with integrated DNS verification.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">OMNI Free Subdomain address</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={wizardConfig.subdomain}
                        onChange={(e) => setWizardConfig(prev => ({ ...prev, subdomain: e.target.value }))}
                        className="rounded-l-md border-y border-l border-slate-200 p-2.5 text-xs bg-slate-50 font-medium text-slate-800 focus:outline-none"
                      />
                      <span className="bg-slate-100 border border-slate-200 rounded-r-md px-3 py-2.5 text-xs font-semibold text-slate-500">.omni.com</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Custom Domain Name (Your domain)</label>
                    <input
                      type="text"
                      value={wizardConfig.customDomain}
                      onChange={(e) => setWizardConfig(prev => ({ ...prev, customDomain: e.target.value }))}
                      placeholder="e.g. customdomain.com"
                      className="w-full rounded-md border border-slate-200 p-2.5 text-xs bg-slate-50 font-medium text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong>DNS Resolution Notice:</strong> Binding a custom domain requires inserting a TXT challenge ownership record and configuring a CNAME mapping to <code>tenant.omni.com</code> at your DNS registrar registry dashboard.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: GEO, CURRENCY & LANGUAGE */}
            {wizardStep === 6 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">6. Geolocation, Currency & Languages</h3>
                  <p className="text-xs text-slate-400 mt-1">Toggle enabled country operations and corresponding currency settlements.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Supported Countries</label>
                    <div className="flex gap-2 flex-wrap">
                      {['US', 'CA', 'GB', 'DE', 'ZA', 'NG', 'KE'].map((c) => {
                        const exists = wizardConfig.countries.includes(c);
                        return (
                          <button
                            key={c}
                            onClick={() => {
                              const updated = exists
                                ? wizardConfig.countries.filter(x => x !== c)
                                : [...wizardConfig.countries, c];
                              setWizardConfig(prev => ({ ...prev, countries: updated }));
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                              exists ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active Currencies</label>
                    <div className="flex gap-2 flex-wrap">
                      {['USD', 'EUR', 'GBP', 'ZAR', 'NGN', 'KES'].map((curr) => {
                        const exists = wizardConfig.currencies.includes(curr);
                        return (
                          <button
                            key={curr}
                            onClick={() => {
                              const updated = exists
                                ? wizardConfig.currencies.filter(x => x !== curr)
                                : [...wizardConfig.currencies, curr];
                              setWizardConfig(prev => ({ ...prev, currencies: updated }));
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                              exists ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {curr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: PAYMENTS & PRICING */}
            {wizardStep === 7 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-7">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">7. Configure Base Pricing & Payments</h3>
                  <p className="text-xs text-slate-400 mt-1">Configure customer fees. Revenue share settings are enforced by parent operators.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Platform Base Monthly License Fee (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={wizardConfig.baseMonthlyFee}
                        onChange={(e) => setWizardConfig(prev => ({ ...prev, baseMonthlyFee: parseInt(e.target.value) || 0 }))}
                        className="w-full rounded-md border border-slate-200 pl-7 pr-3 py-2.5 text-xs bg-slate-50 font-bold text-slate-800"
                      />
                    </div>
                    <span className="text-[10px] text-amber-600 font-medium">
                      Note: OMNI global super admin policies restrict minimum monthly license fee to equal or exceed $149.
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-3">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">OMNI Revenue Share Settlement Percentage</label>
                    <div className="relative">
                      <input
                        type="number"
                        disabled
                        value={wizardConfig.revenueSharePercent}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs bg-slate-100 font-bold text-slate-400 cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Enforced by Dynasty OMNI HQ. Sells are routed and cleared directly via core split ledgers.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: COMMISSIONS & AFFILIATES */}
            {wizardStep === 8 && (
              <div className="space-y-6 max-w-2xl mx-auto" id="step-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">8. Set Affiliate and Commission rules</h3>
                  <p className="text-xs text-slate-400 mt-1">Configure default promotional commission rates for your partner advocates.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Default Promoter Referral Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={wizardConfig.referralRatePercent}
                        onChange={(e) => setWizardConfig(prev => ({ ...prev, referralRatePercent: parseFloat(e.target.value) || 0.0 }))}
                        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs bg-slate-50 font-bold text-slate-800"
                      />
                      <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Minimum Monthly Commitment Threshold (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={wizardConfig.minimumCommitment}
                        onChange={(e) => setWizardConfig(prev => ({ ...prev, minimumCommitment: parseInt(e.target.value) || 0 }))}
                        className="w-full rounded-md border border-slate-200 pl-7 pr-3 py-2.5 text-xs bg-slate-50 font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: WIZARD LAUNCH PREVIEW */}
            {wizardStep === 9 && (
              <div className="space-y-6" id="step-9">
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="text-lg font-bold text-slate-800">9. Preview and Launch "{wizardConfig.name}"</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your platform will launch on core ledgers. Setting up incurs a one-time Double-entry licensing charge of <strong>$149.00</strong>.
                  </p>
                </div>

                {/* THEME PREVIEW */}
                <div 
                  className="border rounded-xl shadow-lg overflow-hidden transition-all duration-300 max-w-4xl mx-auto"
                  style={{ 
                    backgroundColor: wizardConfig.colors.background,
                    fontFamily: wizardConfig.typography.bodyFont,
                    borderColor: wizardConfig.colors.primary + '20'
                  }}
                >
                  <header 
                    className="px-6 py-4 flex justify-between items-center border-b"
                    style={{ 
                      backgroundColor: wizardConfig.colors.surface,
                      borderColor: wizardConfig.colors.primary + '15'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm"
                        style={{ backgroundColor: wizardConfig.colors.primary }}
                      >
                        {wizardConfig.terminology.platformName.slice(0, 2)}
                      </div>
                      <span className="font-bold tracking-tight" style={{ color: wizardConfig.colors.text, fontFamily: wizardConfig.typography.displayFont }}>
                        {wizardConfig.terminology.platformName}
                      </span>
                    </div>
                    <nav className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <span>Explore {wizardConfig.terminology.appsLabel}</span>
                      <span>Become {wizardConfig.terminology.affiliateLabel}</span>
                    </nav>
                  </header>

                  <div className="p-10 text-center max-w-2xl mx-auto space-y-4 my-6">
                    <h1 className="text-3xl font-extrabold tracking-tight leading-tight" style={{ color: wizardConfig.colors.text, fontFamily: wizardConfig.typography.displayFont }}>
                      {wizardConfig.homepageHeadline}
                    </h1>
                    <p className="text-slate-500 text-xs max-w-lg mx-auto">
                      {wizardConfig.homepageSubheadline}
                    </p>
                    <div className="pt-2">
                      <button 
                        className="px-5 py-2 rounded-lg text-xs font-bold text-white shadow-md"
                        style={{ backgroundColor: wizardConfig.colors.accent }}
                      >
                        Launch sovereign platform
                      </button>
                    </div>
                  </div>

                  <footer 
                    className="p-6 text-center text-xs border-t border-slate-100"
                    style={{ 
                      backgroundColor: wizardConfig.colors.surface,
                      borderColor: wizardConfig.colors.primary + '10',
                      color: wizardConfig.colors.text + '90'
                    }}
                  >
                    <p>{wizardConfig.footerText}</p>
                  </footer>
                </div>
              </div>
            )}
          </div>

          {/* Wizard Footer Controls */}
          <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
            <button
              onClick={() => wizardStep > 1 && setWizardStep(wizardStep - 1)}
              disabled={wizardStep === 1}
              className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1 border transition-all ${
                wizardStep === 1 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {wizardStep < 9 ? (
              <button
                onClick={() => setWizardStep(wizardStep + 1)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1 transition-all"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleLaunchPlatform}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2 transition-all"
                id="btn-confirm-launch"
              >
                <CheckCircle className="w-4.5 h-4.5" /> Launch Platform Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW: RESELLERS HIERARCHY & ECONOMICS      */}
      {/* ========================================== */}
      {activeTab === 'resellers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="view-resellers">
          {/* Visual Hierarchy Explorer */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Sovereign Reseller Hierarchies
            </h2>
            <div className="bg-white rounded-xl shadow border border-slate-200 p-6 space-y-6">
              <p className="text-xs text-slate-500 leading-relaxed">
                Nesting pathways enforce strict structural checks to isolate organizational balances.
              </p>

              {/* Rendering node tree visually */}
              <div className="space-y-3 font-mono">
                {state.resellerNodes.map((node) => {
                  return (
                    <div 
                      key={node.id} 
                      style={{ paddingLeft: `${node.level * 24}px` }}
                      className="flex items-center gap-2"
                    >
                      {node.level > 0 && <span className="text-slate-400">↳</span>}
                      <button
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`px-3 py-2 border rounded-lg text-xs font-semibold text-left transition-all flex-grow max-w-xl flex items-center justify-between ${
                          selectedNodeId === node.id
                            ? 'border-blue-600 bg-blue-50/20 text-blue-800 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${node.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className="font-bold">{node.name}</span>
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                          {node.type.replace(/_/g, ' ')}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Node Registration Form */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Register New Reseller Node</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Node Name</label>
                    <input
                      type="text"
                      value={newNodeName}
                      onChange={(e) => setNewNodeName(e.target.value)}
                      placeholder="e.g. Oluwalana West Africa"
                      className="w-full rounded-md border border-slate-200 p-2 text-xs bg-slate-50 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Parent node</label>
                    <select
                      value={newNodeParent}
                      onChange={(e) => setNewNodeParent(e.target.value)}
                      className="w-full rounded-md border border-slate-200 p-2 text-xs bg-slate-50 font-medium"
                    >
                      {state.resellerNodes.map(n => (
                        <option key={n.id} value={n.id}>{n.name} ({n.type})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Node Type</label>
                    <div className="flex gap-2">
                      {['master_reseller', 'reseller'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setNewNodeType(t as any)}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            newNodeType === t ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAddResellerNode}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Node
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reseller Economics Configurator */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Economics Configuration</h2>
            {selectedNode && selectedEconomics ? (
              <div className="bg-white rounded-xl shadow border border-slate-200 p-6 space-y-6" id="reseller-economics-editor">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{selectedNode.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{selectedNode.id}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-full">
                    Economics Configured
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Economics parameters */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Wholesale Price (USD/mo)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        id="eco-wholesale"
                        defaultValue={selectedEconomics.wholesalePriceUsd}
                        className="w-full rounded-md border border-slate-200 pl-7 pr-3 py-2 text-xs bg-slate-50 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Reseller Markup Percentage</label>
                    <div className="relative">
                      <input
                        type="number"
                        id="eco-markup"
                        defaultValue={selectedEconomics.resellerMarkupPercent}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs bg-slate-50 font-bold"
                      />
                      <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">License Rev Share Percentage</label>
                    <div className="relative">
                      <input
                        type="number"
                        id="eco-revshare"
                        defaultValue={selectedEconomics.recurringRevenueSharePercent}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs bg-slate-50 font-bold"
                      />
                      <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Minimum Commitment (USD/mo)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
                      <input
                        type="number"
                        id="eco-minimum"
                        defaultValue={selectedEconomics.minimumCommitmentUsd}
                        className="w-full rounded-md border border-slate-200 pl-7 pr-3 py-2 text-xs bg-slate-50 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const wholesale = parseFloat((document.getElementById('eco-wholesale') as HTMLInputElement)?.value) || 0;
                    const markup = parseFloat((document.getElementById('eco-markup') as HTMLInputElement)?.value) || 0;
                    const revShare = parseFloat((document.getElementById('eco-revshare') as HTMLInputElement)?.value) || 0;
                    const minimum = parseFloat((document.getElementById('eco-minimum') as HTMLInputElement)?.value) || 0;
                    handleUpdateEconomics(wholesale, markup, revShare, minimum);
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Save Economics Parameters
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow border border-slate-200 p-8 text-center text-slate-400">
                <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-medium">Please select a valid reseller node from tree sidebar to edit wholesale parameters.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* VIEW: PLATFORM OWNER CONTROLS (SUPER ADMIN) */}
      {/* ========================================== */}
      {activeTab === 'superadmin' && (
        <div className="max-w-3xl mx-auto space-y-6" id="view-superadmin">
          <div className="bg-white rounded-xl shadow border border-slate-200 p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Shield className="w-5 h-5 text-blue-600" /> Platform Owner Policy Constraints
            </h2>

            <div className="space-y-5">
              {/* Permitted apps */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Allowed Apps for White-Labeling</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {state.apps.map(app => {
                    const isSelected = adminApps.includes(app.id);
                    return (
                      <button
                        key={app.id}
                        onClick={() => {
                          const updated = isSelected
                            ? adminApps.filter(id => id !== app.id)
                            : [...adminApps, app.id];
                          setAdminApps(updated);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold text-left flex items-center gap-2 ${
                          isSelected ? 'bg-blue-50 border-blue-600 text-blue-800' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-300'}`} />
                        {app.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimum monthly fee */}
              <div className="space-y-2 pt-3">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Global Minimum Monthly Price Constraint (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={adminPrice}
                    onChange={(e) => setAdminPrice(parseInt(e.target.value) || 0)}
                    className="w-full rounded-md border border-slate-200 pl-7 pr-3 py-2.5 text-xs bg-slate-50 font-bold"
                  />
                </div>
              </div>

              {/* Default rev share */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Default Platform Revenue Share Percentage</label>
                <div className="relative">
                  <input
                    type="number"
                    value={adminRevShare}
                    onChange={(e) => setAdminRevShare(parseFloat(e.target.value) || 0.0)}
                    className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-xs bg-slate-50 font-bold"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
                </div>
              </div>

              {/* MFA enforce & KYB enforce */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Regulatory Compliance Mandates</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={adminMfa}
                      onChange={(e) => setAdminMfa(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Enforce Operator MFA</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        White-label operators must configure Multi-factor auth before accessing sovereign settings panels.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={adminKyb}
                      onChange={(e) => setAdminKyb(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Mandate Verified KYB</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                        Tenants require verified legal corporate entity audits before connecting custom payment gateways.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveSuperAdminControls}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow"
            >
              Save Super Admin Policy Configurations
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
