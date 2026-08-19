import React, { useState, useMemo } from 'react';
import { 
  Bell, Mail, MessageSquare, Search, Sparkles, BarChart3, Shield, Info, 
  RefreshCw, Plus, Send, Settings, CheckCircle2, AlertTriangle, Archive, 
  Trash2, Filter, Save, History, Lock, FileText, Briefcase, GraduationCap, 
  UserCheck, ShieldCheck, Eye, EyeOff, Globe, HelpCircle, ArrowUpRight, 
  ThumbsUp, UserX, UserMinus, ShieldAlert
} from 'lucide-react';
import { OMNIState, NotificationTemplate, NotificationPreference, NotificationDeliveryLog, OmniInboxMessage, AnalyticsEvent, PrivacyConsentConfig, EntityTrustScore, RiskEvent, SavedSearch, SearchHistoryEntry } from '../types';

interface OMNISharedServicesPageProps {
  useOmniHook: any; // the hook object containing state and all methods
}

export default function OMNISharedServicesPage({ useOmniHook }: OMNISharedServicesPageProps) {
  const {
    state,
    triggerToast,
    addAuditLog,
    // Horizontal Services Callbacks
    sendNotification,
    retryNotification,
    registerNotificationTemplate,
    updateNotificationPreference,
    sendOmniInboxMessage,
    markInboxMessageRead,
    archiveInboxMessage,
    submitAnalyticsEvent,
    updatePrivacyConsent,
    submitTrustAppeal,
    reviewTrustAppeal,
    submitRiskEvent,
    addSearchHistory,
    saveSearch,
    deleteSavedSearch
  } = useOmniHook;

  const [activeTab, setActiveTab] = useState<'notifications' | 'inbox' | 'search' | 'analytics' | 'trust'>('notifications');

  // --- 1. Notification Center State ---
  const [selectedTemplate, setSelectedTemplate] = useState<string>('tmpl_welcome');
  const [recipient, setRecipient] = useState<string>('gideon@dynastyholdings.com');
  const [channel, setChannel] = useState<'in_app' | 'email' | 'sms' | 'push' | 'webhook'>('email');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [customParams, setCustomParams] = useState<string>('{"name": "Gideon", "platformName": "Dynasty Learn", "date": "2026-08-15"}');

  // New Template state
  const [newTmplCategory, setNewTmplCategory] = useState<'system' | 'billing' | 'security' | 'marketing' | 'support' | 'custom'>('custom');
  const [newTmplLanguage, setNewTmplLanguage] = useState<string>('en_US');
  const [newTmplTitle, setNewTmplTitle] = useState<string>('Alert: {{subject}}');
  const [newTmplBody, setNewTmplBody] = useState<string>('Hello {{name}},\n\nYour alert message details: {{details}}.\n\nBest, Dynasty Team.');
  const [newTmplHeaderHex, setNewTmplHeaderHex] = useState<string>('#3B82F6');

  // --- 2. OMNI Inbox State ---
  const [inboxFilter, setInboxFilter] = useState<'all' | 'unread' | 'announcement' | 'alert' | 'direct_message' | 'ticket_update'>('all');
  const [selectedInboxMsg, setSelectedInboxMsg] = useState<OmniInboxMessage | null>(state.omniInboxMessages?.[0] || null);

  // Manual Register Message state
  const [manualMsgApp, setManualMsgApp] = useState<string>('app_pay');
  const [manualMsgType, setManualMsgType] = useState<'announcement' | 'direct_message' | 'alert' | 'ticket_update'>('alert');
  const [manualMsgSubject, setManualMsgSubject] = useState<string>('Ledger Clearing Finalized');
  const [manualMsgBody, setManualMsgBody] = useState<string>('The double-entry reconciliation cleared $4,500.00 USD with zero discrepancies across reseller nodes.');

  // --- 3. Universal Search State ---
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFilter, setSearchFilter] = useState<string>('all');
  const [isAiAssisted, setIsAiAssisted] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    semanticIntent: string;
    reasoning: string;
    permittedCount: number;
    securityCheck: string;
  } | null>(null);

  // --- 4. Analytics Telemetry State ---
  const [sdkAppId, setSdkAppId] = useState<string>('app_market');
  const [sdkEventType, setSdkEventType] = useState<string>('purchase_completed');
  const [sdkMetadata, setSdkMetadata] = useState<string>('{"amount": 1200.00, "currency": "USD", "itemsCount": 3}');

  // --- 5. Trust, Privacy & Reputation State ---
  const [selectedRepEntityId, setSelectedRepEntityId] = useState<string>('plat_learn_dynasty');
  const [appealText, setAppealText] = useState<string>('');
  const [riskTenantId, setRiskTenantId] = useState<string>('plat_soko_oluwalana');
  const [riskType, setRiskType] = useState<'rapid_payout_velocity' | 'mismatched_bin_country' | 'duplicate_session_ip' | 'unusual_ledger_amount' | 'repeated_mfa_failures' | 'referral_circle'>('rapid_payout_velocity');
  const [riskSeverity, setRiskSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [riskDesc, setRiskDesc] = useState<string>('Multiple double-entry transfers detected originating from duplicated browser canvas signatures.');

  // Active user / tenant contexts
  const currentUserId = state.user?.id || 'usr_gideon';
  const currentTenantId = state.user?.currentTenantId || 'plat_learn_dynasty';

  // --- COMPONENT LOGIC & ACTIONS ---

  // Dispatch Manual Notification
  const handleSendNotification = () => {
    let parsedParams: Record<string, string> = {};
    try {
      parsedParams = JSON.parse(customParams);
    } catch (e) {
      triggerToast('Invalid JSON Params', 'Make sure custom parameters is a valid JSON object.', 'error');
      return;
    }

    const templateObj = state.notificationTemplates.find((t) => t.id === selectedTemplate);
    if (!templateObj) return;

    // Interpolate template placeholders
    let interpolatedTitle = templateObj.titleTemplate;
    let interpolatedBody = templateObj.bodyTemplate;
    Object.entries(parsedParams).forEach(([key, val]) => {
      interpolatedTitle = interpolatedTitle.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), val);
      interpolatedBody = interpolatedBody.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), val);
    });

    sendNotification({
      tenantId: currentTenantId,
      userId: currentUserId,
      recipient,
      channel,
      category: templateObj.category,
      priority,
      title: interpolatedTitle,
      content: interpolatedBody,
      maxRetries: 3,
      scheduledAt: undefined
    });
  };

  // Create custom notification template
  const handleCreateTemplate = () => {
    if (!newTmplTitle.trim() || !newTmplBody.trim()) {
      triggerToast('Missing Fields', 'Title and body templates cannot be empty.', 'error');
      return;
    }
    registerNotificationTemplate({
      tenantId: currentTenantId,
      category: newTmplCategory,
      titleTemplate: newTmplTitle,
      bodyTemplate: newTmplBody,
      language: newTmplLanguage,
      branding: {
        headerColor: newTmplHeaderHex,
        footerText: `${state.organizations.find(o => o.id === state.currentOrgId)?.name || 'OMNI Platform'} Automated Messaging`
      }
    });
    setNewTmplTitle('');
    setNewTmplBody('');
  };

  // Dispatch Manual communication Message (App mock registering message)
  const handleRegisterInboxMessage = () => {
    sendOmniInboxMessage({
      tenantId: currentTenantId,
      userId: currentUserId,
      appId: manualMsgApp,
      messageType: manualMsgType,
      subject: manualMsgSubject,
      body: manualMsgBody,
      metadata: { source: 'manual_sdk_simulator' }
    });
    setManualMsgSubject('');
    setManualMsgBody('');
    triggerToast('Message Registered', `App "${manualMsgApp}" successfully broadcasted messaging payload to user's inbox.`, 'success');
  };

  // Submit SDK telemetry event
  const handleSendSdkEvent = () => {
    let parsedMeta: Record<string, any> = {};
    try {
      parsedMeta = JSON.parse(sdkMetadata);
    } catch (e) {
      triggerToast('Invalid JSON Metadata', 'Make sure event metadata is a valid JSON object.', 'error');
      return;
    }

    submitAnalyticsEvent({
      tenantId: currentTenantId,
      userId: currentUserId,
      appId: sdkAppId,
      eventType: sdkEventType,
      metadata: parsedMeta,
      country: state.user?.country || 'US',
      userAgent: 'OMNI SDK Client v2.1.0'
    });
    triggerToast('Event Logged', `SDK captured "${sdkEventType}" event stream successfully.`, 'success');
  };

  // Submit reputation score appeal
  const handleSendAppeal = (entityId: string) => {
    if (!appealText.trim()) return;
    submitTrustAppeal(entityId, {
      reason: appealText
    });
    setAppealText('');
  };

  // Fire shared fraud alert risk event
  const handleSendRiskEvent = () => {
    submitRiskEvent({
      tenantId: riskTenantId,
      appId: 'app_security_audit',
      userId: currentUserId,
      riskType,
      severity: riskSeverity,
      description: riskDesc,
      triggerPayload: { sourceDevice: 'Simulator Core', triggerValue: 12.5 }
    });
    triggerToast('Fraud Signal Captured', `Risk event propagated across all platform applications. Scoring updated.`, 'warning');
  };

  // Update Privacy preferences for current user
  const handleToggleConsent = (field: 'analytics' | 'marketing' | 'minimization', value: boolean) => {
    const defaultConsent: PrivacyConsentConfig = state.privacyConsentConfigs.find(c => c.userId === currentUserId) || {
      userId: currentUserId,
      tenantId: currentTenantId,
      consentGrantedAt: new Date().toISOString(),
      analyticsEnabled: true,
      marketingEnabled: true,
      dataMinimizationEnabled: false,
      regionalSchema: 'GDPR'
    };

    updatePrivacyConsent({
      ...defaultConsent,
      analyticsEnabled: field === 'analytics' ? value : defaultConsent.analyticsEnabled,
      marketingEnabled: field === 'marketing' ? value : defaultConsent.marketingEnabled,
      dataMinimizationEnabled: field === 'minimization' ? value : defaultConsent.dataMinimizationEnabled,
    });
  };

  // --- UNIVERSAL PERMISSIONS-AWARE SEARCH CORE ---
  // We search across: 
  // 1) Apps 2) Products 3) Courses 4) Creators 5) Businesses (Orgs) 6) Files 7) Users 8) Services
  // Respecting permissions and isolating tenant platforms.
  const permissionsSearchPool = useMemo(() => {
    const isSuperAdmin = state.user?.role === 'superadmin' || state.user?.role === 'administrator';
    const activeTenantId = state.user?.currentTenantId || '';

    // Sector 1: Applications
    const sectorApps = state.apps.map(a => ({
      id: a.id,
      name: a.name,
      description: a.description,
      type: 'Application',
      owner: a.author,
      perm: 'Public',
      link: `/app/${a.slug}`,
      isPrivate: false
    }));

    // Sector 2: Products
    const sectorProducts = state.billableProducts.map(p => ({
      id: p.id,
      name: p.name,
      description: `${p.description} - Price: $${p.amount} ${p.currency.toUpperCase()}`,
      type: 'Product',
      owner: p.ownerOrgId,
      perm: 'Tenant Only',
      link: '/financial',
      isPrivate: p.tenantId !== activeTenantId && !isSuperAdmin
    }));

    // Sector 3: Courses (Academy data)
    const coursesPool = [
      { id: 'crs_1', name: 'Double-entry Accounting 101', description: 'Mastering debit and credit ledger balances for high fidelity logs.', type: 'Course', owner: 'OMNI Finance Team', perm: 'Public', link: '/learn', isPrivate: false },
      { id: 'crs_2', name: 'Sovereign White-label Architecture', description: 'How to build multi-tenant platform configurations under dynamic Let\'s Encrypt certificates.', type: 'Course', owner: 'OMNI Ecosystem', perm: 'Public', link: '/learn', isPrivate: false },
      { id: 'crs_3', name: 'Contextual Bidding Campaign Metrics', description: 'Fine-tuning ad server CTR analytics under GDPR constraints.', type: 'Course', owner: 'OMNI Ads Division', perm: 'Public', link: '/learn', isPrivate: false }
    ];

    // Sector 4: Creators
    const creatorsPool = [
      { id: 'cre_1', name: 'Dr. Gideon Oluwalana', description: 'Enterprise platform systems architect and master reseller coordinator.', type: 'Creator', owner: 'usr_gideon', perm: 'Public', link: '/passport', isPrivate: false },
      { id: 'cre_2', name: 'Adebayo Garments Guild', description: 'West African textile cooperative trading on decentralized wholesale inventory.', type: 'Creator', owner: 'org_sandbox', perm: 'Public', link: '/passport', isPrivate: false },
      { id: 'cre_3', name: 'Zandile Zulu Beadworks', description: 'Artisanal organic craft director producing customized bead telemetry necklaces.', type: 'Creator', owner: 'org_dynasty', perm: 'Public', link: '/passport', isPrivate: false }
    ];

    // Sector 5: Businesses (Organizations)
    const sectorBusinesses = state.organizations.map(o => ({
      id: o.id,
      name: o.name,
      description: `${o.orgType.toUpperCase()} - API endpoint registered: ${o.webhookUrl}. Plan: ${o.billingPlan}.`,
      type: 'Business',
      owner: o.tenantId,
      perm: 'Enterprise Strict',
      link: '/settings',
      isPrivate: o.tenantId !== activeTenantId && !isSuperAdmin
    }));

    // Sector 6: Files (Mock files)
    const filesPool = [
      { id: 'fil_1', name: 'audit_ledger_reconciliation_q3.csv', description: 'Cryptographically signed double-entry ledger verification hashes.', type: 'File', owner: 'org_dynasty', perm: 'Tenant Only', link: '/financial', isPrivate: false },
      { id: 'fil_2', name: 'proof_of_retail_customer_sales.pdf', description: 'Artisan retail showroom invoices validated for bank transfers.', type: 'File', owner: 'org_sandbox', perm: 'Tenant Only', link: '/developer', isPrivate: true }, // Restricted to sandbox tenant
      { id: 'fil_3', name: 'white_label_blueprint_v2.json', description: 'AI website designer custom theme configuration for level-3 platforms.', type: 'File', owner: 'org_dynasty', perm: 'Tenant Only', link: '/white_label', isPrivate: false }
    ];

    // Sector 7: Users
    const sectorUsers = [
      { id: 'usr_gideon', name: 'Gideon Oluwalana', description: `Sovereign owner profile. Email: ${state.user?.email || 'gideon@dynasty.com'}. MFA: ${state.user?.isMfaEnabled ? 'Enabled' : 'Disabled'}.`, type: 'User', owner: 'System', perm: 'Owner Only', link: '/passport', isPrivate: false },
      { id: 'usr_student_1', name: 'Adeline Vance', description: 'Enterprise student profile registered via Academy OAuth.', type: 'User', owner: 'System', perm: 'Admin Only', link: '/passport', isPrivate: !isSuperAdmin },
      { id: 'usr_artisan_2', name: 'Kamau Kinyanjui', description: 'Merchant seller registered via mobile money node.', type: 'User', owner: 'System', perm: 'Admin Only', link: '/passport', isPrivate: !isSuperAdmin }
    ];

    // Sector 8: Services (AI models + payment integrations)
    const sectorServices = [
      ...state.aiModels.map(m => ({
        id: m.id,
        name: `AI Model: ${m.name}`,
        description: `Provider: ${m.providerId.toUpperCase()}. Cost per 1M tokens: $${m.costPerMillionTokensUsd}. Status: ${m.status}.`,
        type: 'Service',
        owner: 'System',
        perm: 'Public',
        link: '/ai_os',
        isPrivate: false
      })),
      ...state.paymentIntegrations.map(p => ({
        id: p.id,
        name: `Ledger Gateway: ${p.provider.toUpperCase()}`,
        description: `Secure transaction clearing adapter. Status: ${p.isEnabled ? 'Active' : 'Suspended'}.`,
        type: 'Service',
        owner: p.tenantId,
        perm: 'Tenant Only',
        link: '/financial',
        isPrivate: p.tenantId !== activeTenantId && !isSuperAdmin
      }))
    ];

    return [
      ...sectorApps,
      ...sectorProducts,
      ...coursesPool,
      ...creatorsPool,
      ...sectorBusinesses,
      ...filesPool,
      ...sectorUsers,
      ...sectorServices
    ];
  }, [state, currentTenantId]);

  // Handle Search Submission
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return permissionsSearchPool.filter(item => {
      // Filter by sector type if applicable
      if (searchFilter !== 'all' && item.type.toLowerCase() !== searchFilter) {
        return false;
      }

      // Perform isolation checks: do not leak private tenant data!
      if (item.isPrivate) {
        return false;
      }

      // Check text matches
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      );
    });
  }, [permissionsSearchPool, searchQuery, searchFilter]);

  // Trigger Search Action with History logging
  const triggerSearch = (queryStr: string) => {
    setSearchQuery(queryStr);
    if (queryStr.trim()) {
      addSearchHistory(currentUserId, queryStr);
      
      // If AI Assist search is checked, calculate mock Gemini reasoning
      if (isAiAssisted) {
        setAiAnalysisResult({
          semanticIntent: `Identify entity matching pattern: "${queryStr}" under tenant isolation parameters.`,
          reasoning: `Matched Query string with ${queryStr.length} chars. Filter applied: "${searchFilter}". Performing zero-leak secure tenant filter to ensure restricted files are excluded for non-owners.`,
          permittedCount: permissionsSearchPool.filter(i => !i.isPrivate && (i.name.toLowerCase().includes(queryStr.toLowerCase()) || i.description.toLowerCase().includes(queryStr.toLowerCase()))).length,
          securityCheck: 'PASS - Encrypted tenant boundaries intact. Data minimization rules applied.'
        });
      } else {
        setAiAnalysisResult(null);
      }
    }
  };

  // Save current search query
  const handleSaveSearch = () => {
    if (!searchQuery.trim()) return;
    saveSearch({
      userId: currentUserId,
      query: searchQuery,
      filters: { category: searchFilter },
      name: `Search shortcut: "${searchQuery}"`
    });
  };

  // --- 4. Analytics Metric Aggregations ---
  const analyticsMetrics = useMemo(() => {
    const events = state.analyticsEvents || [];
    
    // Revenue share from subscriptions or purchases
    const totalRev = events
      .filter(e => e.eventType === 'purchase_completed' || e.eventType === 'subscription_started')
      .reduce((sum, e) => sum + (e.metadata.amount || e.metadata.fee || 0), 0);

    const signupCount = events.filter(e => e.eventType === 'signup').length;
    const viewsCount = events.filter(e => e.eventType === 'page_view').length;
    const courseCompCount = events.filter(e => e.eventType === 'course_completed').length;
    const conversionsCount = events.filter(e => e.eventType === 'referral_conversion').length;

    // Engagement count
    const activeOpens = events.filter(e => e.eventType === 'app_open').length;

    return {
      totalRev,
      signupCount,
      viewsCount,
      courseCompCount,
      conversionsCount,
      activeOpens
    };
  }, [state.analyticsEvents]);

  // Privacy regional presets details helper
  const privacyConfig: PrivacyConsentConfig = state.privacyConsentConfigs.find(c => c.userId === currentUserId) || {
    userId: currentUserId,
    tenantId: currentTenantId,
    consentGrantedAt: new Date().toISOString(),
    analyticsEnabled: true,
    marketingEnabled: true,
    dataMinimizationEnabled: false,
    regionalSchema: 'GDPR'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 min-h-screen" id="omni-shared-services-page">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">OMNI Shared Services</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Centrally governed communications, secure universal indexing, regional privacy compliance, and tenant trust reputation telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-100">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            Active Sovereign Services
          </span>
        </div>
      </div>

      {/* Tabs Navigation bar */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-1">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notification Center
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'inbox'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          OMNI Inbox
          <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {state.omniInboxMessages.filter(m => !m.isRead).length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'search'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Search className="w-4 h-4" />
          Universal Search
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Telemetry Analytics
        </button>
        <button
          onClick={() => setActiveTab('trust')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'trust'
              ? 'border-neutral-900 text-neutral-900'
              : 'border-transparent text-neutral-400 hover:text-neutral-600'
          }`}
        >
          <Shield className="w-4 h-4" />
          Privacy & Trust Matrix
        </button>
      </div>

      {/* --- TAB CONTENT 1: NOTIFICATION CENTER --- */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Dispatch Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-base font-bold text-neutral-900">Notification Dispatcher Engine</h2>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Multi-Channel Abstraction</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Template Schema</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white focus:outline-none"
                  >
                    {state.notificationTemplates.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.category.toUpperCase()}] {t.titleTemplate} ({t.language})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Recipient Destination</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="email, phone, or webhook endpoint"
                    className="px-3 py-2 border border-neutral-200 rounded-xl text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Delivery Channel Carrier</label>
                  <div className="grid grid-cols-5 gap-2">
                    {(['in_app', 'email', 'sms', 'push', 'webhook'] as const).map((ch) => (
                      <button
                        key={ch}
                        onClick={() => {
                          setChannel(ch);
                          if (ch === 'sms') setRecipient('+2348031234567');
                          else if (ch === 'webhook') setRecipient('https://clearing.dynasty.com/api/v1/notifs');
                          else setRecipient('gideon@dynastyholdings.com');
                        }}
                        className={`py-2 px-1 text-[10px] font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                          channel === ch
                            ? 'bg-neutral-950 border-neutral-950 text-white'
                            : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {ch.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-neutral-500 uppercase">Priority Classification</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="px-3 py-2 border border-neutral-200 rounded-xl text-xs bg-white focus:outline-none"
                  >
                    <option value="low">Low (Transactional digests)</option>
                    <option value="medium">Medium (User activity updates)</option>
                    <option value="high">High (Billing & Verification)</option>
                    <option value="critical">Critical (MFA & Ledger Security Alerts)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-500 uppercase">JSON Template Parameters</label>
                  <span className="text-[10px] font-mono text-neutral-400">Values matched with braces</span>
                </div>
                <textarea
                  value={customParams}
                  onChange={(e) => setCustomParams(e.target.value)}
                  rows={2}
                  className="font-mono text-[10.5px] p-3 border border-neutral-200 rounded-xl outline-none"
                />
              </div>

              <button
                onClick={handleSendNotification}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-3 rounded-xl cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                Dispatch Multi-Channel Payload
              </button>
            </div>

            {/* Delivery Logs & Carrier Queue */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-base font-bold text-neutral-900">Delivery Status & Carrier Logs</h2>
                <span className="text-xs font-semibold text-neutral-500">
                  {state.notificationDeliveryLogs.length} Records Tracked
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {state.notificationDeliveryLogs.map((log: NotificationDeliveryLog) => (
                  <div key={log.id} className="border border-neutral-100 rounded-xl p-4 flex flex-col gap-2.5 hover:border-neutral-200 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          log.status === 'sent' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          log.status === 'failed' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          log.status === 'retrying' ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse' :
                          'bg-neutral-50 text-neutral-500'
                        }`}>
                          {log.status}
                        </span>
                        <span className="text-xs font-bold text-neutral-800">{log.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase bg-neutral-100 px-2 py-0.5 rounded text-neutral-500">
                          {log.channel}
                        </span>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          log.priority === 'critical' ? 'bg-rose-500 text-white' :
                          log.priority === 'high' ? 'bg-orange-500 text-white' :
                          'bg-neutral-400 text-white'
                        }`}>
                          {log.priority}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500 font-medium whitespace-pre-line">{log.content}</p>

                    <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-50 gap-2">
                      <div className="flex items-center gap-3">
                        <span>Recipient: <strong className="text-neutral-600">{log.recipient}</strong></span>
                        <span>Retries: <strong className="text-neutral-600">{log.retryCount}/{log.maxRetries}</strong></span>
                        {log.sentAt && <span>Sent: {new Date(log.sentAt).toLocaleTimeString()}</span>}
                      </div>
                      {log.status === 'failed' && (
                        <button
                          onClick={() => retryNotification(log.id)}
                          className="inline-flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3 animate-spin-reverse" />
                          Trigger Retry Pipeline
                        </button>
                      )}
                    </div>

                    {log.errorLog && (
                      <div className="bg-rose-50/50 text-[10px] text-rose-600 font-mono p-2 rounded-lg border border-rose-100/50 mt-1">
                        Carrier Warning: {log.errorLog}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Template Schema Builder & Preferences */}
          <div className="flex flex-col gap-6">
            
            {/* Create Template Schema */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-900">Register Message Template</h3>
                <p className="text-[11px] text-neutral-500">Register brand templates dynamically</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Category</label>
                  <select
                    value={newTmplCategory}
                    onChange={(e) => setNewTmplCategory(e.target.value as any)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="system">System (Onboarding/KYC)</option>
                    <option value="billing">Billing (Ledgers/Invoices)</option>
                    <option value="security">Security (MFA alerts)</option>
                    <option value="marketing">Marketing (Ad announcements)</option>
                    <option value="support">Support tickets</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Locale / Language</label>
                  <input
                    type="text"
                    value={newTmplLanguage}
                    onChange={(e) => setNewTmplLanguage(e.target.value)}
                    placeholder="e.g. en_US, sw_KE, es_ES"
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Theme Header Accent</label>
                  <input
                    type="color"
                    value={newTmplHeaderHex}
                    onChange={(e) => setNewTmplHeaderHex(e.target.value)}
                    className="w-full h-8 rounded-lg outline-none cursor-pointer border border-neutral-200"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Title Template</label>
                  <input
                    type="text"
                    value={newTmplTitle}
                    onChange={(e) => setNewTmplTitle(e.target.value)}
                    placeholder="Subject with {{placeholders}}"
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Body Template Schema</label>
                  <textarea
                    value={newTmplBody}
                    onChange={(e) => setNewTmplBody(e.target.value)}
                    rows={4}
                    placeholder="Body text with {{placeholders}} markup"
                    className="p-2.5 border border-neutral-200 rounded-lg text-xs font-medium outline-none"
                  />
                </div>

                <button
                  onClick={handleCreateTemplate}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Create Sovereign Template
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-900">User Channel Opt-In Preferences</h3>
                <p className="text-[11px] text-neutral-500">Configure global delivery barriers</p>
              </div>

              <div className="flex flex-col gap-3.5">
                {state.notificationPreferences.map((pref: NotificationPreference) => (
                  <div key={pref.tenantId} className="flex flex-col gap-2.5 p-3.5 border border-neutral-100 rounded-xl">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">
                      Tenant: {pref.tenantId}
                    </span>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>Email Gateway</span>
                        <input
                          type="checkbox"
                          checked={pref.emailEnabled}
                          onChange={(e) => updateNotificationPreference({ ...pref, emailEnabled: e.target.checked })}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>SMS Abstraction (Twilio)</span>
                        <input
                          type="checkbox"
                          checked={pref.smsEnabled}
                          onChange={(e) => updateNotificationPreference({ ...pref, smsEnabled: e.target.checked })}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>Direct Push Token</span>
                        <input
                          type="checkbox"
                          checked={pref.pushEnabled}
                          onChange={(e) => updateNotificationPreference({ ...pref, pushEnabled: e.target.checked })}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                        <span>Webhooks Push</span>
                        <input
                          type="checkbox"
                          checked={pref.webhookEnabled}
                          onChange={(e) => updateNotificationPreference({ ...pref, webhookEnabled: e.target.checked })}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TAB CONTENT 2: OMNI INBOX --- */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inbox messages list panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            {/* Inbox filter bar */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['all', 'unread', 'announcement', 'alert', 'direct_message', 'ticket_update'] as const).map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setInboxFilter(filt)}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      inboxFilter === filt
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                    }`}
                  >
                    {filt.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono font-bold text-neutral-400">Unified App Inbox</span>
            </div>

            {/* Inbox stream list */}
            <div className="flex flex-col gap-3">
              {state.omniInboxMessages
                .filter((m: OmniInboxMessage) => {
                  if (m.isArchived) return false;
                  if (inboxFilter === 'unread') return !m.isRead;
                  if (inboxFilter !== 'all' && m.messageType !== inboxFilter) return false;
                  return true;
                })
                .map((m: OmniInboxMessage) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedInboxMsg(m);
                      if (!m.isRead) markInboxMessageRead(m.id, true);
                    }}
                    className={`p-4 border rounded-2xl flex flex-col gap-2 cursor-pointer transition-all ${
                      selectedInboxMsg?.id === m.id
                        ? 'bg-neutral-50 border-neutral-900'
                        : 'bg-white border-neutral-200 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!m.isRead && <span className="w-2 h-2 rounded-full bg-rose-600"></span>}
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          m.messageType === 'alert' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          m.messageType === 'announcement' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                          m.messageType === 'ticket_update' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-neutral-50 text-neutral-600 border border-neutral-100'
                        }`}>
                          {m.messageType.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-400">App: {m.appId}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-neutral-900">{m.subject}</h4>
                    <p className="text-xs text-neutral-500 font-medium line-clamp-2">{m.body}</p>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          archiveInboxMessage(m.id, true);
                          if (selectedInboxMsg?.id === m.id) setSelectedInboxMsg(null);
                        }}
                        className="text-[10px] font-bold text-neutral-400 hover:text-neutral-600 flex items-center gap-1 cursor-pointer"
                      >
                        <Archive className="w-3 h-3" />
                        Archive
                      </button>
                    </div>
                  </div>
                ))}
            </div>

          </div>

          {/* Inbox Detail / SDK Messaging Registry Simulator */}
          <div className="flex flex-col gap-6">
            
            {/* Selected message detail view */}
            {selectedInboxMsg ? (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
                <div className="border-b border-neutral-100 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400">Message Details</span>
                    <h3 className="text-sm font-bold text-neutral-900 mt-1">{selectedInboxMsg.subject}</h3>
                  </div>
                  <button
                    onClick={() => markInboxMessageRead(selectedInboxMsg.id, !selectedInboxMsg.isRead)}
                    className="text-[10px] font-bold uppercase text-neutral-500 hover:text-neutral-900 bg-neutral-100 px-2 py-1 rounded"
                  >
                    Mark {selectedInboxMsg.isRead ? 'Unread' : 'Read'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                  <span>From App:</span>
                  <span className="font-mono bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded text-neutral-800">
                    {selectedInboxMsg.appId}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 font-medium whitespace-pre-line leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  {selectedInboxMsg.body}
                </p>

                <div className="text-[10px] font-mono text-neutral-400">
                  Received: {new Date(selectedInboxMsg.createdAt).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-center text-neutral-400 text-xs">
                Select a communication item from the list to view full body logs.
              </div>
            )}

            {/* Application Registration Broadcast Simulator */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="border-b border-neutral-100 pb-2">
                <h3 className="text-sm font-bold text-neutral-900">App SDK Inbox Broadcaster</h3>
                <p className="text-[11px] text-neutral-500">Simulate third-party apps firing messages</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Originating App ID</label>
                  <select
                    value={manualMsgApp}
                    onChange={(e) => setManualMsgApp(e.target.value)}
                    className="px-2 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    {state.apps.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Message Category Type</label>
                  <select
                    value={manualMsgType}
                    onChange={(e) => setManualMsgType(e.target.value as any)}
                    className="px-2 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="direct_message">Direct Message (DM)</option>
                    <option value="alert">Alert (System action item)</option>
                    <option value="ticket_update">Ticket Update</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Subject</label>
                  <input
                    type="text"
                    value={manualMsgSubject}
                    onChange={(e) => setManualMsgSubject(e.target.value)}
                    placeholder="Enter short messaging topic"
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Message Body</label>
                  <textarea
                    value={manualMsgBody}
                    onChange={(e) => setManualMsgBody(e.target.value)}
                    rows={3}
                    placeholder="Enter complete message body schema"
                    className="p-2.5 border border-neutral-200 rounded-lg text-xs outline-none"
                  />
                </div>

                <button
                  onClick={handleRegisterInboxMessage}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Broadcast App Message
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TAB CONTENT 3: UNIVERSAL SEARCH --- */}
      {activeTab === 'search' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Search Filter Panel */}
          <div className="flex flex-col gap-6">
            
            {/* Search Shortcuts */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="border-b border-neutral-100 pb-2">
                <h3 className="text-sm font-bold text-neutral-900">Saved Searches</h3>
                <p className="text-[11px] text-neutral-500 font-medium">Quick search shortcuts</p>
              </div>

              <div className="flex flex-col gap-2">
                {state.savedSearches.length > 0 ? (
                  state.savedSearches.map((s: SavedSearch) => (
                    <div key={s.id} className="flex items-center justify-between p-2.5 border border-neutral-100 hover:bg-neutral-50 rounded-xl">
                      <button
                        onClick={() => {
                          setSearchQuery(s.query);
                          setSearchFilter(s.filters.category || 'all');
                        }}
                        className="text-xs font-bold text-neutral-800 text-left truncate flex-1 cursor-pointer"
                      >
                        {s.name}
                      </button>
                      <button
                        onClick={() => deleteSavedSearch(s.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-[11px] text-neutral-400">No saved queries.</span>
                )}
              </div>
            </div>

            {/* Search History */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="border-b border-neutral-100 pb-2">
                <h3 className="text-sm font-bold text-neutral-900">Search History</h3>
                <p className="text-[11px] text-neutral-500 font-medium">Recently searched keys</p>
              </div>

              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
                {state.searchHistory.length > 0 ? (
                  state.searchHistory.map((h: SearchHistoryEntry) => (
                    <button
                      key={h.id}
                      onClick={() => setSearchQuery(h.query)}
                      className="w-full text-left p-2 hover:bg-neutral-50 text-xs font-semibold text-neutral-600 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <History className="w-3 h-3 text-neutral-400" />
                      <span className="truncate">{h.query}</span>
                    </button>
                  ))
                ) : (
                  <span className="text-[11px] text-neutral-400">History is empty.</span>
                )}
              </div>
            </div>

          </div>

          {/* Search Main Dashboard */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Unified Bar */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3.5 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across apps, products, courses, creators, files, users..."
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl text-xs font-bold outline-none shadow-inner"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') triggerSearch(searchQuery);
                    }}
                  />
                </div>
                
                <button
                  onClick={() => triggerSearch(searchQuery)}
                  className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Query Index
                </button>
              </div>

              {/* Autocomplete Suggestions (Simulated live matching) */}
              {searchQuery && filteredSearchResults.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-bold text-neutral-400 border-t border-neutral-50 pt-2">
                  <span>Match suggestions:</span>
                  {filteredSearchResults.slice(0, 5).map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSearchQuery(item.name)}
                      className="bg-neutral-50 hover:bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-200"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Filters Sector Tab list */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {['all', 'application', 'product', 'course', 'creator', 'business', 'file', 'user', 'service'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSearchFilter(category)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        searchFilter === category
                          ? 'bg-neutral-900 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      {category}s
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={isAiAssisted}
                      onChange={(e) => setIsAiAssisted(e.target.checked)}
                      className="cursor-pointer"
                    />
                    AI-Assisted Search
                  </label>
                  <button
                    onClick={handleSaveSearch}
                    disabled={!searchQuery.trim()}
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-neutral-500 hover:text-neutral-900 border border-neutral-200 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer disabled:opacity-40"
                  >
                    <Save className="w-3 h-3" />
                    Save Shortcut
                  </button>
                </div>
              </div>
            </div>

            {/* AI assisted analysis box */}
            {aiAnalysisResult && (
              <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                  <h4 className="text-sm font-bold text-indigo-900">Gemini-Assisted Search Semantic Intelligence</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Semantic Intent Mapping</span>
                    <span className="text-indigo-900">{aiAnalysisResult.semanticIntent}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Index Reasoning</span>
                    <span className="text-indigo-700">{aiAnalysisResult.reasoning}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-indigo-100/60 pt-3 text-[10px] font-mono text-indigo-400 mt-1">
                  <span>Permitted Nodes: <strong className="text-indigo-600">{aiAnalysisResult.permittedCount}</strong></span>
                  <span>Isolation Verification: <strong className="text-indigo-600">{aiAnalysisResult.securityCheck}</strong></span>
                </div>
              </div>
            )}

            {/* Search Results Display List */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-base font-bold text-neutral-900">Indexing Results</h3>
                <span className="text-xs text-neutral-400 font-medium">
                  {searchQuery ? `${filteredSearchResults.length} items found` : 'Enter a query string above to scan system database'}
                </span>
              </div>

              {filteredSearchResults.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredSearchResults.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/20 rounded-xl transition-all gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-500 mt-0.5">
                          {item.type === 'Application' && <Briefcase className="w-4 h-4 text-blue-500" />}
                          {item.type === 'Product' && <Globe className="w-4 h-4 text-emerald-500" />}
                          {item.type === 'Course' && <GraduationCap className="w-4 h-4 text-orange-500" />}
                          {item.type === 'Creator' && <UserCheck className="w-4 h-4 text-amber-500" />}
                          {item.type === 'Business' && <Settings className="w-4 h-4 text-indigo-500" />}
                          {item.type === 'File' && <FileText className="w-4 h-4 text-rose-500" />}
                          {item.type === 'User' && <ShieldCheck className="w-4 h-4 text-teal-500" />}
                          {item.type === 'Service' && <Sparkles className="w-4 h-4 text-violet-500" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-800">{item.name}</span>
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 font-medium mt-0.5 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center text-xs">
                        <span className="text-[10px] font-mono text-neutral-400">Perms: <strong className="text-neutral-600">{item.perm}</strong></span>
                        <span className="text-[10px] font-mono text-neutral-400">Node: <strong className="text-neutral-600 truncate max-w-[80px] block">{item.id}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="w-8 h-8 text-neutral-300 animate-pulse mb-3" />
                  {searchQuery ? (
                    <>
                      <p className="text-xs font-bold text-neutral-700">No permitted matches found</p>
                      <p className="text-[11px] text-neutral-400 mt-1">Make sure you have correct permissions and search filters set.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-neutral-400">Platform search index is ready to scan.</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">Enter key terms like "Ankara", "Ledger", "Gideon", "MFA" to search.</p>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* --- TAB CONTENT 4: ANALYTICS --- */}
      {activeTab === 'analytics' && (
        <div className="flex flex-col gap-8">
          
          {/* Key Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Overall Platform Revenue</span>
              <span className="text-xl font-bold text-neutral-900">${analyticsMetrics.totalRev.toLocaleString()} USD</span>
              <span className="text-[10px] text-emerald-600 font-bold">100% Reconciled Ledgers</span>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Total Signup Signals</span>
              <span className="text-xl font-bold text-neutral-900">{analyticsMetrics.signupCount} Signups</span>
              <span className="text-[10px] text-neutral-400 font-medium">Referred conversions: {analyticsMetrics.conversionsCount}</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Active Device Opens</span>
              <span className="text-xl font-bold text-neutral-900">{analyticsMetrics.activeOpens} sessions</span>
              <span className="text-[10px] text-neutral-400 font-medium">Total Page Hits: {analyticsMetrics.viewsCount}</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Course Certifications</span>
              <span className="text-xl font-bold text-neutral-900">{analyticsMetrics.courseCompCount} Comps</span>
              <span className="text-[10px] text-neutral-400 font-medium">Academy certification drops</span>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Affiliate Conversions</span>
              <span className="text-xl font-bold text-neutral-900">{analyticsMetrics.conversionsCount} leads</span>
              <span className="text-[10px] text-neutral-400 font-medium">Earnings allocated instantly</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visual Charts section */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Event volume bar block */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="text-base font-bold text-neutral-900">Telemetry Event Standard Distribution</h3>
                  <span className="text-xs font-semibold text-neutral-500">Live Telemetry</span>
                </div>

                {/* SVG Visual Bars */}
                <div className="flex flex-col gap-4 py-2">
                  {[
                    { label: 'page_view (Page Views)', count: analyticsMetrics.viewsCount, color: 'bg-blue-500' },
                    { label: 'signup (New Registration)', count: analyticsMetrics.signupCount, color: 'bg-emerald-500' },
                    { label: 'app_open (Session Trigger)', count: analyticsMetrics.activeOpens, color: 'bg-indigo-500' },
                    { label: 'purchase_completed (Clearing Ledger)', count: state.analyticsEvents.filter(e => e.eventType === 'purchase_completed').length, color: 'bg-rose-500' },
                    { label: 'subscription_started (Recurring Billing)', count: state.analyticsEvents.filter(e => e.eventType === 'subscription_started').length, color: 'bg-violet-500' },
                    { label: 'course_completed (Certifications)', count: analyticsMetrics.courseCompCount, color: 'bg-orange-500' }
                  ].map((stat, idx) => {
                    const maxVal = Math.max(...[analyticsMetrics.viewsCount, analyticsMetrics.signupCount, analyticsMetrics.activeOpens, 2, 2, 1]);
                    const percent = Math.max(12, maxVal > 0 ? (stat.count / maxVal) * 100 : 0);
                    return (
                      <div key={idx} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                          <span>{stat.label}</span>
                          <span>{stat.count} signals</span>
                        </div>
                        <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                          <div className={`${stat.color} h-full rounded-full`} style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submitted SDK Event streams */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="text-base font-bold text-neutral-900">Real-Time Event Stream Log</h3>
                  <span className="text-[10px] font-mono font-bold text-neutral-400">Standard Schema Ledger</span>
                </div>

                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                  {state.analyticsEvents.map((ev: AnalyticsEvent) => (
                    <div key={ev.id} className="p-3 border border-neutral-50 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-start gap-2.5">
                        <span className="bg-neutral-100 font-mono text-[10px] px-2 py-0.5 rounded text-neutral-500">
                          {ev.eventType}
                        </span>
                        <div>
                          <span className="block font-bold text-neutral-800">App: {ev.appId}</span>
                          <span className="block text-[10px] text-neutral-400 truncate max-w-[340px]">
                            Payload: {JSON.stringify(ev.metadata)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-[10px] font-mono text-neutral-400">
                        {ev.country && <span className="mr-2 uppercase">Region: {ev.country}</span>}
                        {new Date(ev.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* SDK Simulator Panel */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="border-b border-neutral-100 pb-2">
                <h3 className="text-sm font-bold text-neutral-900">OMNI SDK Event Dispatcher</h3>
                <p className="text-[11px] text-neutral-500">Simulate developer apps logging standard metrics</p>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">App Client</label>
                  <select
                    value={sdkAppId}
                    onChange={(e) => setSdkAppId(e.target.value)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    {state.apps.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Standard Event Type</label>
                  <select
                    value={sdkEventType}
                    onChange={(e) => setSdkEventType(e.target.value)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="page_view">page_view (Visits / Traffic routing)</option>
                    <option value="signup">signup (Account onboarding signal)</option>
                    <option value="app_open">app_open (Session initiation event)</option>
                    <option value="subscription_started">subscription_started (Billing milestone)</option>
                    <option value="purchase_completed">purchase_completed (Clearing transaction)</option>
                    <option value="referral_conversion">referral_conversion (Affiliate payout triggers)</option>
                    <option value="ad_click">ad_click (CPC Ads click logs)</option>
                    <option value="course_completed">course_completed (Professional certification completion)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Payload Metadata (JSON)</label>
                  <textarea
                    value={sdkMetadata}
                    onChange={(e) => setSdkMetadata(e.target.value)}
                    rows={4}
                    className="font-mono text-[10.5px] p-2.5 border border-neutral-200 rounded-lg outline-none"
                  />
                </div>

                <button
                  onClick={handleSendSdkEvent}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Fire Telemetry Signal
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* --- TAB CONTENT 5: TRUST & PRIVACY MATRIX --- */}
      {activeTab === 'trust' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reputation Profiles List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Reputation metrics block */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-base font-bold text-neutral-900">Modular Trust scoring Profiles</h3>
                <span className="text-xs font-semibold text-neutral-500">Reputation Framework</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.entityTrustScores.map((score: EntityTrustScore) => (
                  <div
                    key={score.id}
                    onClick={() => setSelectedRepEntityId(score.id)}
                    className={`p-4 border rounded-2xl flex flex-col gap-3 cursor-pointer transition-all ${
                      selectedRepEntityId === score.id
                        ? 'bg-neutral-50 border-neutral-900'
                        : 'bg-white border-neutral-100 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                        {score.entityType} Score
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        score.level === 'excellent' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        score.level === 'good' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {score.level}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{score.entityName}</h4>
                      <span className="text-[10px] font-mono text-neutral-400">Entity: {score.id}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
                      <span className="text-xs text-neutral-500 font-medium">Reputation Rating:</span>
                      <span className="text-lg font-bold text-neutral-900">{score.score} / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Profile Detailed Signals & appeals */}
            {selectedRepEntityId && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
                {(() => {
                  const scoreObj = state.entityTrustScores.find((s: EntityTrustScore) => s.id === selectedRepEntityId);
                  if (!scoreObj) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-neutral-400">Signals Audit</span>
                          <h4 className="text-sm font-bold text-neutral-900 mt-0.5">{scoreObj.entityName}</h4>
                        </div>
                        <span className="text-2xl font-black text-neutral-900">{scoreObj.score} pts</span>
                      </div>

                      {/* Contributing signals */}
                      <div className="flex flex-col gap-3">
                        <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Contributing Signal Feeds</h5>
                        {scoreObj.signals.map((sig) => (
                          <div key={sig.id} className="p-3 border border-neutral-100 rounded-xl flex items-start gap-2.5">
                            {sig.type === 'positive' ? (
                              <ThumbsUp className="w-4 h-4 text-emerald-600 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="font-bold text-neutral-800">{sig.reasonCode}</span>
                                <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                                  sig.type === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                  {sig.scoreImpact > 0 ? `+${sig.scoreImpact}` : sig.scoreImpact} pts
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 font-medium mt-0.5 leading-relaxed">{sig.description}</p>
                              <div className="text-[9px] font-mono text-neutral-400 mt-1">Source app: {sig.source} | Recorded at {new Date(sig.timestamp).toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Active Appeals / Appeals forms */}
                      <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
                        <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Reputation Reviews & Disputes</h5>
                        
                        {scoreObj.appeals.map((apl) => (
                          <div key={apl.id} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col gap-2 text-xs">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                              <span className="font-mono text-[10px] text-neutral-400">Appeal ID: {apl.id}</span>
                              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                apl.status === 'approved' ? 'bg-emerald-500 text-white' :
                                apl.status === 'rejected' ? 'bg-rose-500 text-white' :
                                'bg-amber-500 text-white animate-pulse'
                              }`}>
                                {apl.status}
                              </span>
                            </div>
                            
                            <p className="text-neutral-600 font-semibold leading-relaxed">Dispute text: "{apl.reason}"</p>
                            
                            {apl.evidenceUrl && (
                              <a href={apl.evidenceUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-bold text-[10px] flex items-center gap-1 mt-0.5">
                                <FileText className="w-3 h-3" />
                                View dispute evidence attachment
                              </a>
                            )}

                            {/* Admin review commands (simulation) */}
                            {apl.status === 'pending' && (
                              <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 mt-1">
                                <button
                                  onClick={() => reviewTrustAppeal(scoreObj.id, apl.id, 'approved', 'Disputed chargeback has been successfully verified as normal sales.')}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded cursor-pointer"
                                >
                                  Approve Dispute (+15pts)
                                </button>
                                <button
                                  onClick={() => reviewTrustAppeal(scoreObj.id, apl.id, 'rejected', 'Appeal evidence was insufficient.')}
                                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] px-2.5 py-1 rounded cursor-pointer"
                                >
                                  Reject Dispute
                                </button>
                              </div>
                            )}

                            {apl.adminNotes && (
                              <div className="bg-white p-2 rounded border border-neutral-150 font-mono text-[10px] text-neutral-500 mt-1">
                                Admin Audit Notes: {apl.adminNotes}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Submit New appeal form */}
                        {scoreObj.score < 95 && (
                          <div className="flex flex-col gap-2 pt-2">
                            <textarea
                              value={appealText}
                              onChange={(e) => setAppealText(e.target.value)}
                              placeholder="Describe dispute reason details..."
                              className="p-2 border border-neutral-200 rounded-lg text-xs outline-none"
                              rows={2}
                            />
                            <button
                              onClick={() => handleSendAppeal(scoreObj.id)}
                              className="bg-neutral-900 hover:bg-neutral-800 text-white text-[10px] font-bold py-2 rounded-lg cursor-pointer"
                            >
                              Submit Score appeal / Dispute
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Risk / Fraud Alerts shared by all apps */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-900">Shared Fraud & Risk Signals Engine</h3>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest animate-pulse">
                  Systemic Risk Feed
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {state.riskEvents.map((risk: RiskEvent) => (
                  <div key={risk.id} className="border border-rose-100 rounded-xl p-4 bg-rose-50/20 flex flex-col gap-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          risk.severity === 'critical' ? 'bg-rose-500 text-white' :
                          risk.severity === 'high' ? 'bg-orange-500 text-white' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {risk.severity} risk
                        </span>
                        <span className="text-xs font-bold text-neutral-800">{risk.riskType.replace(/_/g, ' ').toUpperCase()}</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">App: {risk.appId}</span>
                    </div>

                    <p className="text-xs text-neutral-600 font-medium">{risk.description}</p>
                    
                    <div className="bg-white p-2 border border-neutral-100 rounded text-[10px] font-mono text-neutral-500">
                      Trigger payload: {JSON.stringify(risk.triggerPayload)}
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-neutral-400 pt-1">
                      <span>Affected platform: <strong>{risk.tenantId}</strong></span>
                      <span>Recorded: {new Date(risk.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Privacy & Consent panel */}
          <div className="flex flex-col gap-6">
            
            {/* Privacy settings */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="border-b border-neutral-100 pb-2 flex items-center gap-2">
                <Lock className="w-4.5 h-4.5 text-neutral-600" />
                <h3 className="text-sm font-bold text-neutral-900">Regional Consent & Privacy Controls</h3>
              </div>

              <div className="flex flex-col gap-4 text-xs font-medium">
                <div className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200/50 rounded-xl">
                  <div>
                    <span className="block font-bold text-neutral-800">Regional Compliance Schema</span>
                    <span className="text-[10px] text-neutral-400">Mapped based on user country code</span>
                  </div>
                  <span className="font-mono bg-neutral-950 text-white px-2.5 py-1 rounded text-[10px] font-bold">
                    {privacyConfig.regionalSchema}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-neutral-800">Telemetry Tracking Consent</span>
                    <span className="text-[10px] text-neutral-400">Share visitor hit counts and signups</span>
                  </div>
                  <button
                    onClick={() => handleToggleConsent('analytics', !privacyConfig.analyticsEnabled)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg border cursor-pointer ${
                      privacyConfig.analyticsEnabled
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                    }`}
                  >
                    {privacyConfig.analyticsEnabled ? 'GRANTED' : 'OPTED OUT'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-neutral-800">Targeted Marketing Consent</span>
                    <span className="text-[10px] text-neutral-400">Allow promo announcements in templates</span>
                  </div>
                  <button
                    onClick={() => handleToggleConsent('marketing', !privacyConfig.marketingEnabled)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg border cursor-pointer ${
                      privacyConfig.marketingEnabled
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                    }`}
                  >
                    {privacyConfig.marketingEnabled ? 'GRANTED' : 'OPTED OUT'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-neutral-800">Data Minimization Engine</span>
                    <span className="text-[10px] text-neutral-400">Automatically sanitize device identifiers</span>
                  </div>
                  <button
                    onClick={() => handleToggleConsent('minimization', !privacyConfig.dataMinimizationEnabled)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg border cursor-pointer ${
                      privacyConfig.dataMinimizationEnabled
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-400'
                    }`}
                  >
                    {privacyConfig.dataMinimizationEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>

            {/* Risk event injector simulator */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="border-b border-neutral-100 pb-2 flex items-center gap-2">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-600" />
                <h3 className="text-sm font-bold text-neutral-900">Fraud Engine Signal Injector</h3>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Target Tenant Node</label>
                  <select
                    value={riskTenantId}
                    onChange={(e) => setRiskTenantId(e.target.value)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    {state.tenantPlatforms.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Risk Classification Type</label>
                  <select
                    value={riskType}
                    onChange={(e) => setRiskType(e.target.value as any)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="rapid_payout_velocity">rapid_payout_velocity (Velocity barrier check)</option>
                    <option value="mismatched_bin_country">mismatched_bin_country (Card BIN mismatched)</option>
                    <option value="duplicate_session_ip">duplicate_session_ip (Duplicated browser signatures)</option>
                    <option value="unusual_ledger_amount">unusual_ledger_amount (Ledger deviation limits)</option>
                    <option value="repeated_mfa_failures">repeated_mfa_failures (Brute force passport attempts)</option>
                    <option value="referral_circle">referral_circle (Self-referral fraud alert)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Risk Severity</label>
                  <select
                    value={riskSeverity}
                    onChange={(e) => setRiskSeverity(e.target.value as any)}
                    className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white outline-none"
                  >
                    <option value="low">Low (-5pts)</option>
                    <option value="medium">Medium (-10pts)</option>
                    <option value="high">High (-20pts)</option>
                    <option value="critical">Critical (-35pts)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase">Description Explanation</label>
                  <textarea
                    value={riskDesc}
                    onChange={(e) => setRiskDesc(e.target.value)}
                    rows={3}
                    className="p-2 border border-neutral-200 rounded-lg text-xs outline-none"
                  />
                </div>

                <button
                  onClick={handleSendRiskEvent}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Propagate Risk Event Alert
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
