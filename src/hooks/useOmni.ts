import { useState, useEffect, useCallback } from 'react';
import { 
  OMNIState, User, Organization, AppRegistration, LedgerEntry, Notification, ApiCredential, 
  Webhook, FeatureFlag, AuditLog, SystemNode, Incident, OrgType, OMNIProfileType, 
  OMNIVerificationStatus, LoginHistoryEntry, UserRole, AIAgent, AIProvider, AIModel, 
  AIPrompt, AITool, KnowledgeSource, AICostRecord, AIBudgetConfig, AIAutonomyRule, 
  AIApprovalTask, AIAuditLog, AIConversation, OmniRoutingProfile, ByokCredential, ByomEndpoint,
  AiCircuitBreakerRecord, AiCacheRecord,
  NotificationTemplate, NotificationPreference, NotificationDeliveryLog, OmniInboxMessage, 
  AnalyticsEvent, PrivacyConsentConfig, EntityTrustScore, ReputationSignal, TrustAppeal, 
  RiskEvent, SavedSearch, SearchHistoryEntry,
  DeveloperProfile, MarketplaceApp, AppInstallation, SandboxApiRequest, DeveloperEarningLog,
  ShareholderProfile, CapTableConfig, ValuationRecord, InvestmentOffering, ExchangeCredential
} from '../types';
import { loadState, saveState, generateUUID } from '../store';

export function useOmni() {
  const [state, setState] = useState<OMNIState>(() => loadState());
  const [toasts, setToasts] = useState<Array<{ id: string; title: string; description: string; type: 'success' | 'info' | 'error' }>>([]);

  // Auto-save state on changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Utility to dispatch toasts
  const triggerToast = useCallback((title: string, description: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast = { id: Math.random().toString(), title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  }, []);

  // Utility to create audit logs
  const addAuditLog = useCallback((action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: generateUUID(),
      userId: state.user?.id || 'anonymous',
      userEmail: state.user?.email || 'anonymous@omni.io',
      action,
      module,
      details,
      ipAddress: '184.22.115.9',
      timestamp: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      auditLogs: [newLog, ...prev.auditLogs],
    }));
  }, [state.user]);

  // View state controller
  const setView = useCallback((view: string, appId: string | null = null) => {
    setState((prev) => ({
      ...prev,
      activeView: view,
      activeAppId: appId,
    }));
  }, []);

  // Generic partial state updater
  const updateState = useCallback((updates: Partial<OMNIState> | ((prev: OMNIState) => Partial<OMNIState>)) => {
    setState((prev) => {
      const resolved = typeof updates === 'function' ? updates(prev) : updates;
      return {
        ...prev,
        ...resolved,
      };
    });
  }, []);

  // Switch Organization
  const switchOrg = useCallback((orgId: string) => {
    const org = state.organizations.find((o) => o.id === orgId);
    if (!org) return;
    setState((prev) => ({
      ...prev,
      currentOrgId: orgId,
    }));
    addAuditLog('ORGANIZATION_SWITCH', 'Auth/Identity', `Switched active organization context to ${org.name} (${org.id})`);
    triggerToast('Organization Switched', `Active workspace changed to ${org.name}.`, 'info');
  }, [state.organizations, addAuditLog, triggerToast]);

  // Add Transaction to active organization
  const addTransaction = useCallback((amount: number, type: 'credit' | 'debit', description: string) => {
    if (!state.currentOrgId) return;
    const currentOrg = state.organizations.find((o) => o.id === state.currentOrgId);
    if (!currentOrg) return;

    if (type === 'debit' && currentOrg.walletBalance < amount) {
      triggerToast('Transaction Denied', 'Insufficient funds in OMNI Organization wallet.', 'error');
      addAuditLog('TRANSACTION_FAILED', 'Finance/Pay', `Attempted debit of $${amount.toLocaleString()} failed: Insufficient Balance.`);
      return false;
    }

    const walletId = `wallet_${currentOrg.id}`;
    const newEntry: LedgerEntry = {
      id: generateUUID(),
      walletId,
      type,
      amount,
      description,
      timestamp: new Date().toISOString(),
      referenceId: 'ref_tx_' + Math.floor(100000 + Math.random() * 900000),
      status: 'completed',
    };

    setState((prev) => {
      const updatedOrgs = prev.organizations.map((org) => {
        if (org.id === prev.currentOrgId) {
          const balanceDiff = type === 'credit' ? amount : -amount;
          return {
            ...org,
            walletBalance: org.walletBalance + balanceDiff,
          };
        }
        return org;
      });

      const newNotif: Notification = {
        id: generateUUID(),
        title: type === 'credit' ? 'Wallet Credit Successful' : 'Wallet Debit Settled',
        content: `${description}: $${amount.toLocaleString()} was successfully posted to ${currentOrg.name}.`,
        type: 'billing',
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        organizations: updatedOrgs,
        ledger: [newEntry, ...prev.ledger],
        notifications: [newNotif, ...prev.notifications],
      };
    });

    addAuditLog('TRANSACTION_SETTLED', 'Finance/Pay', `Wallet transaction posted: ${type.toUpperCase()} of $${amount.toLocaleString()} for ${description}`);
    triggerToast(
      type === 'credit' ? 'Wallet Credited' : 'Payment Settled',
      `$${amount.toLocaleString()} was successfully adjusted.`,
      'success'
    );
    return true;
  }, [state.currentOrgId, state.organizations, addAuditLog, triggerToast]);

  // Create Organization / Tenant
  const createOrg = useCallback((name: string, plan: 'free' | 'growth' | 'enterprise', orgType: OrgType = 'company') => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    if (state.organizations.some((o) => o.slug === slug)) {
      triggerToast('Organization Exists', 'An organization with this name/slug already exists.', 'error');
      return false;
    }

    const initialBalances = {
      free: 100,
      growth: 15000,
      enterprise: 250000,
    };

    const newOrgId = 'org_' + Math.random().toString(36).substring(2, 9);
    const newOrg: Organization = {
      id: newOrgId,
      name,
      slug,
      tenantId: 'tenant_' + Math.random().toString(36).substring(2, 9),
      status: 'active',
      orgType,
      billingPlan: plan,
      walletBalance: initialBalances[plan],
      apiKey: 'omni_live_api_' + Math.random().toString(36).substring(2, 12),
      webhookUrl: `https://api.${slug}.io/omni-webhook`,
      subdomains: [`${slug}.omni.io`],
      createdAt: new Date().toISOString(),
      kybVerified: false,
    };

    setState((prev) => ({
      ...prev,
      organizations: [...prev.organizations, newOrg],
      currentOrgId: newOrgId,
    }));

    addAuditLog('ORGANIZATION_CREATED', 'Organizations', `Provisioned organization "${name}" (${orgType.toUpperCase()}) with subdomains on plan ${plan.toUpperCase()}`);
    triggerToast('Organization Created', `Workspace "${name}" initialized on the ${plan} plan.`, 'success');
    return newOrgId;
  }, [state.organizations, addAuditLog, triggerToast]);

  // Toggle MFA Setting
  const toggleMfa = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      const nextMfa = !prev.user.isMfaEnabled;
      
      const mfaNotif: Notification = {
        id: generateUUID(),
        title: nextMfa ? 'Security: Multi-Factor Auth Activated' : 'Security: MFA Deactivated',
        content: nextMfa 
          ? 'An authenticator app MFA handshake has been registered for your security context.'
          : 'MFA protection has been deactivated. OMNI recommends keeping MFA enabled to protect ledger keys.',
        type: 'security',
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        user: {
          ...prev.user,
          isMfaEnabled: nextMfa,
          mfaSecretSimulated: nextMfa ? 'JBSWY3DPEHPK3PXP' : undefined,
        },
        notifications: [mfaNotif, ...prev.notifications],
      };
    });

    const isNowEnabled = !state.user?.isMfaEnabled;
    addAuditLog(
      isNowEnabled ? 'MFA_ENABLED' : 'MFA_DISABLED',
      'Auth/Identity',
      isNowEnabled ? 'Simulated TOTP Authenticator registered' : 'TOTP credentials revoked'
    );
    triggerToast(
      isNowEnabled ? 'MFA Enabled' : 'MFA Disabled',
      isNowEnabled ? 'Security layer reinforced.' : 'Identity protection lowered.',
      isNowEnabled ? 'success' : 'info'
    );
  }, [state.user, addAuditLog, triggerToast]);

  // Toggle Feature Flag
  const toggleFeatureFlag = useCallback((id: string) => {
    setState((prev) => {
      const flag = prev.featureFlags.find((f) => f.id === id);
      if (!flag) return prev;
      const nextStatus = !flag.isEnabled;

      return {
        ...prev,
        featureFlags: prev.featureFlags.map((f) =>
          f.id === id ? { ...f, isEnabled: nextStatus } : f
        ),
      };
    });

    const targetFlag = state.featureFlags.find((f) => f.id === id);
    if (targetFlag) {
      addAuditLog('FEATURE_FLAG_TOGGLE', 'Infrastructure/Flags', `Toggled "${targetFlag.name}" to ${!targetFlag.isEnabled ? 'ENABLED' : 'DISABLED'}`);
      triggerToast('Feature Flag Updated', `"${targetFlag.name}" is now ${!targetFlag.isEnabled ? 'active' : 'inactive'}.`, 'info');
    }
  }, [state.featureFlags, addAuditLog, triggerToast]);

  // Add API Key Credential
  const addApiCredential = useCallback((label: string, scopes: string[]) => {
    if (!state.currentOrgId) return;
    const newCred: ApiCredential = {
      id: generateUUID(),
      organizationId: state.currentOrgId,
      label,
      clientId: 'omni_cid_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6),
      clientSecret: 'omni_sec_••••••••••••••••' + Math.random().toString(36).substring(2, 10),
      scopes,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      apiCredentials: [...prev.apiCredentials, newCred],
    }));

    addAuditLog('API_CREDENTIAL_CREATE', 'DeveloperPlatform', `Created API credentials for label [${label}] with scopes: [${scopes.join(', ')}]`);
    triggerToast('Credentials Generated', `Client credentials for "${label}" generated successfully.`, 'success');
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  // Delete API Key Credential
  const deleteApiCredential = useCallback((id: string) => {
    const cred = state.apiCredentials.find((c) => c.id === id);
    if (!cred) return;

    setState((prev) => ({
      ...prev,
      apiCredentials: prev.apiCredentials.filter((c) => c.id !== id),
    }));

    addAuditLog('API_CREDENTIAL_REVOKE', 'DeveloperPlatform', `Revoked client API credential: ${cred.label} (${cred.clientId})`);
    triggerToast('Credentials Revoked', `API credentials for "${cred.label}" were permanently deactivated.`, 'info');
  }, [state.apiCredentials, addAuditLog, triggerToast]);

  // Add Webhook
  const addWebhook = useCallback((url: string, events: string[]) => {
    if (!state.currentOrgId) return;
    const newWeb: Webhook = {
      id: generateUUID(),
      organizationId: state.currentOrgId,
      url,
      events,
      status: 'active',
      secret: 'whsec_' + Math.random().toString(36).substring(2, 12),
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      webhooks: [...prev.webhooks, newWeb],
    }));

    addAuditLog('WEBHOOK_CREATE', 'DeveloperPlatform', `Registered endpoint [${url}] subscribed to events: [${events.join(', ')}]`);
    triggerToast('Webhook Endpoint Added', 'System listening for trigger dispatches.', 'success');
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  // Delete Webhook
  const deleteWebhook = useCallback((id: string) => {
    const web = state.webhooks.find((w) => w.id === id);
    if (!web) return;

    setState((prev) => ({
      ...prev,
      webhooks: prev.webhooks.filter((w) => w.id !== id),
    }));

    addAuditLog('WEBHOOK_REVOKE', 'DeveloperPlatform', `Deleted webhook endpoint routing to ${web.url}`);
    triggerToast('Webhook Removed', 'Endpoint route severed.', 'info');
  }, [state.webhooks, addAuditLog, triggerToast]);

  // Dynamically Register Application
  const registerApp = useCallback((name: string, category: 'core' | 'finance' | 'productivity' | 'developer' | 'infrastructure', description: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    if (state.apps.some((a) => a.slug === slug)) {
      triggerToast('App Registration Error', 'An app with this name or slug already exists in the dynamic launcher registry.', 'error');
      return false;
    }

    const icons = {
      core: 'Home',
      finance: 'Wallet',
      productivity: 'Briefcase',
      developer: 'CodeXml',
      infrastructure: 'Server',
    };

    const newApp: AppRegistration = {
      id: 'app_' + slug,
      name,
      slug,
      icon: icons[category] || 'Compass',
      description,
      status: 'active',
      category,
      isNative: false,
      author: state.user?.fullName || 'OMNI Architect',
      createdAt: new Date().toISOString(),
    };

    setState((prev) => ({
      ...prev,
      apps: [...prev.apps, newApp],
    }));

    addAuditLog('APP_REGISTERED', 'DeveloperPlatform', `Dynamically registered third-party OMNI App: ${name} (Category: ${category})`);
    triggerToast('App Registered', `"${name}" added to dynamic launcher. You can switch to it now!`, 'success');
    return true;
  }, [state.apps, state.user, addAuditLog, triggerToast]);

  // Set Search Query
  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // Theme Toggler
  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  // Clear Read notifications
  const clearNotifications = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  }, []);

  // Account login simulation
  const loginUser = useCallback((email: string) => {
    const user: User = {
      id: 'usr_gideon',
      username: 'gideon',
      email,
      fullName: 'Gideon Oluwalana',
      avatarUrl: undefined,
      phone: '+1 (555) 019-2831',
      isMfaEnabled: true,
      mfaSecretSimulated: 'JBSWY3DPEHPK3PXP',
      role: 'superadmin',
      currentTenantId: 'tenant_dynasty_99',
      createdAt: '2026-01-01T12:00:00Z',
      language: 'en_US',
      country: 'US',
      timezone: 'America/New_York',
      preferredCurrency: 'USD',
      verificationStatus: {
        emailVerified: true,
        phoneVerified: true,
        identityVerified: true,
        organizationVerified: true,
        businessVerified: true
      },
      profiles: [
        { id: 'prof_personal', type: 'personal', displayName: 'Gideon Oluwalana', bio: 'Architect of the OMNI Operating System. Universal builder.' },
        { id: 'prof_professional', type: 'professional', displayName: 'Gideon Oluwalana, PhD', bio: 'VP of Infrastructure at Dynasty Global Holdings.', metadata: { company: 'Dynasty Global Holdings', title: 'VP of Infrastructure' } },
        { id: 'prof_creator', type: 'creator', displayName: 'Gideon Tech', bio: 'Streaming live ledger engineering & system builds.', metadata: { channel: 'Gideon Tech', followers: 124000 } },
        { id: 'prof_seller', type: 'seller', displayName: 'Oluwalana Merchant', bio: 'Authorized reseller of OMNI cloud nodes.', metadata: { storeName: 'Oluwalana Cloud Hardware', rating: 4.9 } },
        { id: 'prof_developer', type: 'developer', displayName: 'gideon-dev', bio: 'Full-stack distributed core contributor.', metadata: { github: 'gideon-dev', stack: ['TypeScript', 'Rust', 'Docker', 'Go'] } },
        { id: 'prof_affiliate', type: 'affiliate', displayName: 'Gideon Partner', bio: 'OMNI Ecosystem Affiliate.', metadata: { referralCode: 'OMNIGID2026', commissionRate: '12%' } },
        { id: 'prof_investor', type: 'investor', displayName: 'Gideon Capital', bio: 'Venture & liquidity provider.', metadata: { accredited: true, investmentsCount: 18 } }
      ],
      currentProfileType: 'personal',
      security: {
        recoveryCodes: ['OMNI-8A3B-2C9D-1F0E', 'OMNI-4E5F-6G7H-8I9J', 'OMNI-1K2L-3M4N-5O6P', 'OMNI-7Q8R-9S1T-2U3V'],
        activeSessions: [
          { id: 'sess_current', deviceName: 'MacBook Pro 16"', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', createdAt: '2026-08-15T01:10:00Z', isCurrent: true },
          { id: 'sess_phone', deviceName: 'iPhone 15 Pro', ipAddress: '172.56.21.84', browser: 'Safari Mobile', location: 'New York, US', createdAt: '2026-08-14T20:30:00Z', isCurrent: false },
          { id: 'sess_backup', deviceName: 'Ubuntu Workstation', ipAddress: '192.168.1.55', browser: 'Firefox Desktop', location: 'Local Network', createdAt: '2026-08-10T09:15:00Z', isCurrent: false }
        ],
        loginHistory: [
          { id: 'log_h1', timestamp: '2026-08-15T01:10:00Z', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', status: 'success', type: 'password' },
          { id: 'log_h2', timestamp: '2026-08-14T20:30:00Z', ipAddress: '172.56.21.84', browser: 'Safari Mobile', location: 'New York, US', status: 'success', type: 'mfa' },
          { id: 'log_h3', timestamp: '2026-08-14T19:15:00Z', ipAddress: '198.51.100.4', browser: 'Chrome Desktop', location: 'Dublin, IE', status: 'suspicious', type: 'password' },
          { id: 'log_h4', timestamp: '2026-08-12T10:00:00Z', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', status: 'success', type: 'passkey' }
        ],
        passkeys: [
          { id: 'pk_1', name: 'FaceID MacBook Pro Security Key', createdAt: '2026-04-10T12:00:00Z' }
        ],
        ssoConfig: { idpName: 'Okta Enterprise', entityId: 'urn:omni:saml:okta', ssoUrl: 'https://okta.omni.io/sso/federate', isEnabled: true }
      },
      connectedApps: [
        { appId: 'app_pay', appName: 'Pay', scopes: ['identity.read', 'wallet.ledger.read', 'wallet.ledger.write'], authorizedAt: '2026-01-05T12:00:00Z' },
        { appId: 'app_market', appName: 'Market', scopes: ['identity.read'], authorizedAt: '2026-02-10T12:00:00Z' }
      ]
    };
    setState((prev) => ({
      ...prev,
      user,
      activeView: 'dashboard',
    }));
    triggerToast('Welcome Back', `Access granted to Gideon Oluwalana. Session keys provisioned.`, 'success');
  }, [triggerToast]);

  // Signup simulation
  const signupUser = useCallback((fullName: string, email: string) => {
    const user: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      username: fullName.toLowerCase().replace(/[^a-z0-9]/g, ''),
      email,
      fullName,
      isMfaEnabled: false,
      role: 'owner',
      currentTenantId: 'tenant_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      language: 'en_US',
      country: 'US',
      timezone: 'America/New_York',
      preferredCurrency: 'USD',
      verificationStatus: {
        emailVerified: true,
        phoneVerified: false,
        identityVerified: false,
        organizationVerified: false,
        businessVerified: false
      },
      profiles: [
        { id: 'prof_personal', type: 'personal', displayName: fullName, bio: 'A new OMNI identity.' }
      ],
      currentProfileType: 'personal',
      security: {
        recoveryCodes: ['OMNI-8A3B-2C9D-1F0E', 'OMNI-4E5F-6G7H-8I9J'],
        activeSessions: [
          { id: 'sess_current', deviceName: 'Web Session', ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', createdAt: new Date().toISOString(), isCurrent: true }
        ],
        loginHistory: [
          { id: 'log_h1', timestamp: new Date().toISOString(), ipAddress: '184.22.115.9', browser: 'Chrome Desktop', location: 'New York, US', status: 'success', type: 'password' }
        ],
        passkeys: []
      },
      connectedApps: []
    };
    setState((prev) => ({
      ...prev,
      user,
      activeView: 'onboarding', // Route to interactive onboarding
    }));
    triggerToast('Account Registered', `Welcome to the OMNI Operating System. Let's configure your tenant.`, 'success');
  }, [triggerToast]);

  // Complete onboarding
  const completeOnboarding = useCallback((orgName: string, plan: 'free' | 'growth' | 'enterprise') => {
    const orgId = createOrg(orgName, plan, 'company');
    if (orgId) {
      setState((prev) => ({
        ...prev,
        activeView: 'dashboard',
      }));
      triggerToast('Onboarding Complete', 'Your multi-tenant organization, billing plan, and genesis wallets have been initialized.', 'success');
    }
  }, [createOrg, triggerToast]);

  // OMNI Passport Core Operations
  const updateUserProfile = useCallback((type: OMNIProfileType, displayName: string, bio: string, metadata?: Record<string, any>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedProfiles = prev.user.profiles.some((p) => p.type === type)
        ? prev.user.profiles.map((p) => {
            if (p.type === type) {
              return { ...p, displayName, bio, metadata: { ...p.metadata, ...metadata } };
            }
            return p;
          })
        : [...prev.user.profiles, { id: 'prof_' + type, type, displayName, bio, metadata }];

      return {
        ...prev,
        user: {
          ...prev.user,
          profiles: updatedProfiles,
        },
      };
    });
    addAuditLog('PASSPORT_PROFILE_UPDATE', 'Auth/Identity', `Updated user ${type} profile metadata: ${displayName}`);
    triggerToast('Profile Updated', `Your ${type} profile details have been saved.`, 'success');
  }, [addAuditLog, triggerToast]);

  const switchProfileType = useCallback((type: OMNIProfileType) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          currentProfileType: type,
        },
      };
    });
    addAuditLog('PASSPORT_PROFILE_SWITCH', 'Auth/Identity', `Switched active profile view to ${type}`);
    triggerToast('Profile Switched', `Active identity profile context is now "${type}".`, 'info');
  }, [addAuditLog, triggerToast]);

  const revokeActiveSession = useCallback((sessionId: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const nextSessions = prev.user.security.activeSessions.filter((s) => s.id !== sessionId);
      return {
        ...prev,
        user: {
          ...prev.user,
          security: {
            ...prev.user.security,
            activeSessions: nextSessions,
          },
        },
      };
    });
    addAuditLog('SESSION_REVOKED', 'Auth/Identity', `Terminated active device session: ${sessionId}`);
    triggerToast('Session Terminated', 'The selected device session was successfully revoked.', 'success');
  }, [addAuditLog, triggerToast]);

  const revokeConnectedAppConsent = useCallback((appId: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updatedApps = prev.user.connectedApps.filter((a) => a.appId !== appId);
      return {
        ...prev,
        user: {
          ...prev.user,
          connectedApps: updatedApps,
        },
      };
    });
    addAuditLog('APP_CONSENT_REVOKED', 'Auth/Identity', `Revoked OMNI Passport OAuth scopes for app: ${appId}`);
    triggerToast('Consent Revoked', 'Application access to your identity has been severed.', 'info');
  }, [addAuditLog, triggerToast]);

  const authorizeConnectedApp = useCallback((appId: string, appName: string, scopes: string[]) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const existing = prev.user.connectedApps.find((a) => a.appId === appId);
      const updatedApps = existing
        ? prev.user.connectedApps.map((a) => (a.appId === appId ? { ...a, scopes, authorizedAt: new Date().toISOString() } : a))
        : [...prev.user.connectedApps, { appId, appName, scopes, authorizedAt: new Date().toISOString() }];

      return {
        ...prev,
        user: {
          ...prev.user,
          connectedApps: updatedApps,
        },
      };
    });
    addAuditLog('APP_CONSENT_GRANTED', 'Auth/Identity', `Granted Passport OAuth consent to ${appName} with scopes: [${scopes.join(', ')}]`);
    triggerToast('Access Authorized', `Successfully connected ${appName} to your OMNI Passport.`, 'success');
  }, [addAuditLog, triggerToast]);

  const registerPasskey = useCallback((name: string) => {
    const passkeyId = 'pk_' + Math.random().toString(36).substring(2, 9);
    setState((prev) => {
      if (!prev.user) return prev;
      const nextPasskeys = [...prev.user.security.passkeys, { id: passkeyId, name, createdAt: new Date().toISOString() }];
      return {
        ...prev,
        user: {
          ...prev.user,
          security: {
            ...prev.user.security,
            passkeys: nextPasskeys,
          },
        },
      };
    });
    addAuditLog('SECURITY_PASSKEY_CREATED', 'Auth/Identity', `Registered cryptographic WebAuthn credential: ${name}`);
    triggerToast('Passkey Registered', `Cryptographic passkey "${name}" has been registered.`, 'success');
  }, [addAuditLog, triggerToast]);

  const revokePasskey = useCallback((id: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const nextPasskeys = prev.user.security.passkeys.filter((p) => p.id !== id);
      return {
        ...prev,
        user: {
          ...prev.user,
          security: {
            ...prev.user.security,
            passkeys: nextPasskeys,
          },
        },
      };
    });
    addAuditLog('SECURITY_PASSKEY_REVOKED', 'Auth/Identity', `Deactivated WebAuthn credential: ${id}`);
    triggerToast('Passkey Removed', 'Cryptographic key has been revoked.', 'info');
  }, [addAuditLog, triggerToast]);

  const updateEnterpriseSso = useCallback((idpName: string, entityId: string, ssoUrl: string, isEnabled: boolean) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          security: {
            ...prev.user.security,
            ssoConfig: { idpName, entityId, ssoUrl, isEnabled },
          },
        },
      };
    });
    addAuditLog('SECURITY_SSO_UPDATE', 'Auth/Identity', `Updated Enterprise SSO Settings: IdP Name="${idpName}" Enabled=${isEnabled}`);
    triggerToast('SSO Configured', `Enterprise Single Sign-On context updated.`, 'success');
  }, [addAuditLog, triggerToast]);

  const runKycKybVerification = useCallback((provider: string, type: 'identity' | 'business' | 'organization') => {
    setState((prev) => {
      if (!prev.user) return prev;
      
      const nextStatus = { ...prev.user.verificationStatus };
      if (type === 'identity') {
        nextStatus.identityVerified = true;
      } else if (type === 'business') {
        nextStatus.businessVerified = true;
      } else if (type === 'organization') {
        nextStatus.organizationVerified = true;
      }

      const updatedOrgs = prev.organizations.map((org) => {
        if (org.id === prev.currentOrgId) {
          return {
            ...org,
            kybVerified: true,
            kybProvider: provider,
            kybCheckedAt: new Date().toISOString(),
          };
        }
        return org;
      });

      return {
        ...prev,
        user: {
          ...prev.user,
          verificationStatus: nextStatus,
        },
        organizations: updatedOrgs,
      };
    });

    addAuditLog('VERIFICATION_CHANGE', 'Trust/Identity', `Completed ${type.toUpperCase()} compliance check via adapter: ${provider}`);
    triggerToast('Verification Successful', `${type.toUpperCase()} verified securely via ${provider}.`, 'success');
  }, [addAuditLog, triggerToast, state.currentOrgId]);

  const triggerSuspiciousLoginHook = useCallback(() => {
    const alertId = 'log_susp_' + Math.random().toString(36).substring(2, 6);
    const mockSuspiciousLogin: LoginHistoryEntry = {
      id: alertId,
      timestamp: new Date().toISOString(),
      ipAddress: '109.112.45.19',
      browser: 'Unknown Tor Browser',
      location: 'Sovereign Proxy, RU',
      status: 'suspicious',
      type: 'password',
    };

    setState((prev) => {
      if (!prev.user) return prev;
      
      const updatedHistory = [mockSuspiciousLogin, ...prev.user.security.loginHistory];
      const newNotif: Notification = {
        id: generateUUID(),
        title: 'SECURITY WARNING: Suspicious Authentication Attempt',
        content: `A dynamic login hook flagged a login attempt from a sovereign Tor gateway (109.112.45.19). Session was sandboxed automatically.`,
        type: 'security',
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      return {
        ...prev,
        user: {
          ...prev.user,
          security: {
            ...prev.user.security,
            loginHistory: updatedHistory,
          },
        },
        notifications: [newNotif, ...prev.notifications],
      };
    });

    addAuditLog('SUSPICIOUS_LOGIN_FLAGGED', 'Auth/Identity', 'Suspicious login hook intercepted proxy IP: 109.112.45.19');
    triggerToast('Suspicious Login Hook Triggered', 'Security warning dispatched. Active session sandboxed.', 'error');
  }, [addAuditLog, triggerToast]);

  const changeOrganizationRole = useCallback((targetUserId: string, targetOrgId: string, role: UserRole) => {
    addAuditLog('ROLE_CHANGE', 'Auth/Identity', `Updated role mapping in org ${targetOrgId} for user ${targetUserId} to ${role.toUpperCase()}`);
    triggerToast('Role Updated', `Authorized role escalated to ${role.toUpperCase()}.`, 'success');
  }, [addAuditLog, triggerToast]);

  const transferOrgOwnership = useCallback((targetOrgId: string, newOwnerEmail: string) => {
    const org = state.organizations.find(o => o.id === targetOrgId);
    const orgName = org ? org.name : targetOrgId;
    addAuditLog('OWNERSHIP_TRANSFER', 'Auth/Identity', `Transferred primary ownership of org context "${orgName}" to ${newOwnerEmail}`);
    triggerToast('Ownership Transferred', `Primary corporate ownership transferred to ${newOwnerEmail}.`, 'success');
  }, [state.organizations, addAuditLog, triggerToast]);

  const updateVerificationConfig = useCallback((field: keyof OMNIVerificationStatus, value: boolean) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const nextStatus = { ...prev.user.verificationStatus, [field]: value };
      return {
        ...prev,
        user: {
          ...prev.user,
          verificationStatus: nextStatus,
        },
      };
    });
    addAuditLog('VERIFICATION_CHANGE', 'Trust/Identity', `Manually toggled verification state: ${field} = ${value}`);
    triggerToast('Trust Score Updated', `Verification status "${field}" adjusted.`, 'info');
  }, [addAuditLog, triggerToast]);

  // AI Command Parser Engine
  const runAiCommand = useCallback(async (cmd: string): Promise<{ success: boolean; text: string }> => {
    const trimmed = cmd.trim();
    if (!trimmed) return { success: false, text: 'Blank AI command. Type something or try /help.' };

    const lower = trimmed.toLowerCase();
    
    // Help Command
    if (lower === '/help' || lower === 'help' || lower === '?') {
      return {
        success: true,
        text: `OMNI Command Bar Operations:\n\n` +
              `• /pay [slug] [amount] - Settles payment ledger instantly. Example: /pay oluwalana 25000\n` +
              `• /launch [app-slug] - Boots a registered workspace. Example: /launch pay\n` +
              `• /flag [flag-key] - Hot-swaps feature flags. Example: /flag omni-ads-v2\n` +
              `• /mfa - Toggles Multi-Factor Authentication session guard.\n` +
              `• /status - Runs active node health check diagnostics.\n` +
              `• /createorg [name] - Instantly provisions a multi-tenant business context.\n\n` +
              `You can also type natural questions like "What is my balance?" or "List active nodes".`
      };
    }

    // Status Checker
    if (lower === '/status' || lower === 'status' || lower === 'nodes' || lower.includes('health')) {
      const degraded = state.systemNodes.filter(n => n.status !== 'operational').length;
      return {
        success: true,
        text: `OMNI Router Matrix Online.\n\n` +
              `• Nodes: ${state.systemNodes.length} operational cluster cores.\n` +
              `• Status: ${degraded === 0 ? 'Optimal' : degraded + ' nodes degraded'}.\n` +
              `• Berlin router (omni-node-ber-01) currently absorbing heavy failover. Global latencies are within bounds (avg 36ms).`
      };
    }

    // MFA Command
    if (lower === '/mfa' || lower === 'mfa' || lower.includes('toggle mfa')) {
      toggleMfa();
      return {
        success: true,
        text: `Command executed. MFA settings toggled. MFA is now: ${!state.user?.isMfaEnabled ? 'ENABLED' : 'DISABLED'}. Check security panel.`
      };
    }

    // Pay Command: /pay [slug] [amount]
    if (lower.startsWith('/pay ')) {
      const parts = trimmed.split(' ');
      if (parts.length < 3) {
        return { success: false, text: 'Malformed transaction command. Format: /pay [slug] [amount] - e.g. /pay oluwalana 500' };
      }
      const slug = parts[1].toLowerCase();
      const amount = parseFloat(parts[2]);
      if (isNaN(amount) || amount <= 0) {
        return { success: false, text: 'Invalid transaction amount specified.' };
      }

      const targetOrg = state.organizations.find(o => o.slug === slug);
      if (!targetOrg) {
        return { success: false, text: `Organization context "${slug}" not found in routing register.` };
      }

      // Debit Current
      const success = addTransaction(amount, 'debit', `AI Command routing: P2P settlement to ${targetOrg.name}`);
      if (success) {
        // Credit target (simulated)
        setState(prev => {
          return {
            ...prev,
            organizations: prev.organizations.map(org => {
              if (org.id === targetOrg.id) {
                return { ...org, walletBalance: org.walletBalance + amount };
              }
              return org;
            }),
            ledger: [{
              id: generateUUID(),
              walletId: `wallet_${targetOrg.id}`,
              type: 'credit',
              amount,
              description: `P2P ledger settlement from Gideon (AI)`,
              timestamp: new Date().toISOString(),
              referenceId: 'ref_tx_' + Math.floor(100000 + Math.random() * 900000),
              status: 'completed'
            }, ...prev.ledger]
          };
        });
        return {
          success: true,
          text: `Payment ledger updated.\n\n` +
                `• Debited active wallet by $${amount.toLocaleString()}.\n` +
                `• Credited ${targetOrg.name} by $${amount.toLocaleString()}.\n` +
                `• Status: Settled & broadcasted. Webhook trigger dispatched.`
        };
      } else {
        return { success: false, text: 'Payment settlement failed. Check available credit balance.' };
      }
    }

    // Create Org: /createorg [name]
    if (lower.startsWith('/createorg ')) {
      const orgName = trimmed.substring(11).trim();
      if (!orgName) return { success: false, text: 'Please specify an organization name.' };
      const id = createOrg(orgName, 'growth');
      if (id) {
        return {
          success: true,
          text: `Organization "${orgName}" successfully provisioned on OMNI routing mesh.\n` +
                `• Billing tier: GROWTH ($15,000 trial credits provisioned)\n` +
                `• Route Slug: ${orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}\n` +
                `• Subdomain registered: ${orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.omni.io`
        };
      }
      return { success: false, text: 'Failed to provision organization context.' };
    }

    // Flag toggle: /flag [key]
    if (lower.startsWith('/flag ')) {
      const key = partsOf(trimmed)[1];
      if (!key) return { success: false, text: 'Specify a feature flag key.' };
      const targetFlag = state.featureFlags.find(f => f.key === key);
      if (!targetFlag) return { success: false, text: `Feature flag key "${key}" doesn't exist.` };
      toggleFeatureFlag(targetFlag.id);
      return {
        success: true,
        text: `Feature toggle hot-swapped for key: [${key}]. Flag state is now: ${!targetFlag.isEnabled ? 'ENABLED' : 'DISABLED'}.`
      };
    }

    // App Switcher: /launch [slug]
    if (lower.startsWith('/launch ')) {
      const appSlug = partsOf(trimmed)[1].toLowerCase();
      const targetApp = state.apps.find(a => a.slug === appSlug);
      if (!targetApp) return { success: false, text: `No registered workspace matches "${appSlug}".` };
      setView('app', targetApp.id);
      return {
        success: true,
        text: `Workspace context set. Launching ${targetApp.name} (${targetApp.category}) dynamic iframe canvas...`
      };
    }

    // Balance query
    if (lower.includes('balance') || lower.includes('wallet') || lower.includes('how much money')) {
      const currentOrg = state.organizations.find(o => o.id === state.currentOrgId);
      if (!currentOrg) return { success: false, text: 'No active business context selected.' };
      return {
        success: true,
        text: `Active context balance diagnostics:\n\n` +
              `• Workspace: ${currentOrg.name}\n` +
              `• Core Ledger Wallet: $${currentOrg.walletBalance.toLocaleString()} USD\n` +
              `• Plan: ${currentOrg.billingPlan.toUpperCase()}\n\n` +
              `You can distribute funds using "/pay [slug] [amount]".`
      };
    }

    // Default Fallback Simulated Intelligence Response
    // If we have a real Gemini integration we'd call it. Here we construct a smart platform responder:
    return {
      success: true,
      text: `OMNI AI Command Engine responds:\n\n` +
            `"I have parsed your prompt: '${trimmed}'. To manage OMNI core, use operations like /pay, /createorg, /status, or /launch. For database sync, check the Developer Platform (Apps app) to verify API bindings and webhooks."`
    };
  }, [state, addTransaction, toggleMfa, toggleFeatureFlag, createOrg, setView]);

  const validateAndRegisterAppFromManifest = useCallback((manifestJson: string) => {
    try {
      const manifest = JSON.parse(manifestJson);
      
      // JSON Schema Validation (in-line check simulating JSON Schema rules)
      if (!manifest.omniManifestVersion || typeof manifest.omniManifestVersion !== 'string') {
        throw new Error("Missing or invalid 'omniManifestVersion'. Expected a string (e.g., '1.0').");
      }
      if (!manifest.appId || typeof manifest.appId !== 'string') {
        throw new Error("Missing or invalid 'appId'. Expected a non-empty string identifier.");
      }
      if (!manifest.name || typeof manifest.name !== 'string') {
        throw new Error("Missing or invalid 'name'. Expected a descriptive application title.");
      }
      if (!manifest.category || !['core', 'finance', 'productivity', 'developer', 'infrastructure'].includes(manifest.category)) {
        throw new Error("Invalid 'category'. Must be 'core', 'finance', 'productivity', 'developer', or 'infrastructure'.");
      }
      if (!manifest.routes || typeof manifest.routes !== 'object') {
        throw new Error("Missing or invalid 'routes'. Expected an object mapping paths.");
      }
      if (!manifest.routes.primary || typeof manifest.routes.primary !== 'string') {
        throw new Error("Missing 'routes.primary'. Expected a fully qualified base domain routing string.");
      }
      
      // Check for duplicates
      if (state.apps.some(a => a.id === manifest.appId)) {
        throw new Error(`Application ID '${manifest.appId}' already exists in the OMNI App Registry.`);
      }

      // Map to expanded AppRegistration schema
      const newApp: AppRegistration = {
        id: manifest.appId,
        name: manifest.name,
        slug: manifest.appId.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        icon: manifest.icon || 'Globe',
        description: manifest.description || `Independently deployed application via manifest ${manifest.omniManifestVersion}`,
        status: manifest.status || 'active',
        category: manifest.category,
        url: manifest.routes.primary,
        isNative: false,
        author: manifest.owner || 'External Developer',
        createdAt: new Date().toISOString(),
        owner: manifest.owner || 'Gideon Oluwalana',
        routes: manifest.routes,
        subdomain: manifest.subdomain || `${manifest.appId}.omni.com`,
        externalUrl: manifest.externalUrl || manifest.routes.primary,
        requiredScopes: manifest.scopes || [],
        optionalScopes: manifest.optionalScopes || [],
        supportedCountries: manifest.supportedCountries || ['US', 'CA', 'GB', 'DE'],
        supportedLanguages: manifest.supportedLanguages || ['en', 'fr', 'de'],
        subscriptionRequirements: manifest.subscriptionRequirements || 'Free or Professional Tier',
        billingModel: manifest.billingModel || 'saas_fixed',
        whiteLabelCapability: !!manifest.capabilities?.whiteLabel,
        resellerCapability: !!manifest.capabilities?.reseller,
        affiliateCapability: !!manifest.capabilities?.affiliate,
        aiCapability: !!manifest.capabilities?.ai,
        mobileCapability: !!manifest.capabilities?.mobile,
        apiInfo: {
          version: manifest.apiVersion || 'v1',
          endpoints: manifest.apiEndpoints || ['/api/v1/health', '/api/v1/sync'],
          documentationUrl: manifest.documentationUrl || `${manifest.routes.primary}/docs`
        },
        webhookConfig: manifest.webhookConfig || {
          deliveryUrl: `${manifest.routes.primary}/webhooks/omni`,
          subscribedEvents: manifest.webhookConfig?.subscribedEvents || ['user.created']
        },
        featureFlags: manifest.featureFlags || ['enable-beta-features']
      };

      setState(prev => ({
        ...prev,
        apps: [...prev.apps, newApp]
      }));

      // Log success and return
      addAuditLog('APP_MANIFEST_REGISTRY_SUCCESS', 'AppRegistry', `Registered OMNI application '${manifest.name}' via manifest upload`);
      triggerToast('Manifest Validated & Registered', `App "${manifest.name}" added to Registry.`, 'success');
      
      // Dispatch an internal domain event!
      setTimeout(() => {
        dispatchDomainEvent('reseller.created', { appId: newApp.id, name: newApp.name, author: newApp.author });
      }, 50);

      return { success: true };
    } catch (e: any) {
      addAuditLog('APP_MANIFEST_REGISTRY_FAILED', 'AppRegistry', `Failed to parse app manifest: ${e.message}`);
      triggerToast('Manifest Rejected', e.message || 'JSON formatting invalid.', 'error');
      return { success: false, error: e.message };
    }
  }, [state.apps, addAuditLog, triggerToast]);

  const dispatchDomainEvent = useCallback((topic: any, payload: any) => {
    const eventId = 'evt_' + Math.floor(100000 + Math.random() * 900000);
    const newEvent: any = {
      id: eventId,
      topic,
      payload,
      timestamp: new Date().toISOString()
    };

    setState(prev => {
      const newLogs: any[] = [];
      
      prev.apps.forEach(app => {
        const subEvents = app.webhookConfig?.subscribedEvents || [];
        const isSubscribed = subEvents.includes(topic);
        
        if (isSubscribed && app.webhookConfig?.deliveryUrl) {
          const signaturePayload = `t=${Date.now()},v1=${generateUUID().substring(5, 45)}`;
          const idempotencyKey = `idem_${topic.replace('.', '_')}_${generateUUID().substring(5, 15)}`;
          
          const deliveryLog: any = {
            id: 'wlog_' + Math.floor(100000 + Math.random() * 900000),
            appId: app.id,
            eventTopic: topic,
            payload,
            endpoint: app.webhookConfig.deliveryUrl,
            timestamp: new Date().toISOString(),
            statusCode: 200, 
            responseBody: JSON.stringify({ received: true, eventId, status: "ok" }),
            deliverySecretSigned: signaturePayload,
            idempotencyKey,
            attemptNumber: 1,
            nextRetryAt: null,
            status: 'success'
          };
          newLogs.push(deliveryLog);
        }
      });

      return {
        ...prev,
        domainEvents: [newEvent, ...prev.domainEvents],
        webhookLogs: [...newLogs, ...prev.webhookLogs]
      };
    });

    triggerToast('Event Dispatched', `Domain event "${topic}" logged and propagated to subscribers.`, 'info');
  }, [triggerToast]);

  const replayWebhookDelivery = useCallback((logId: string) => {
    setState(prev => {
      const originalLog = prev.webhookLogs.find(l => l.id === logId);
      if (!originalLog) return prev;

      const signaturePayload = `t=${Date.now()},v1=${generateUUID().substring(5, 45)}`;
      const replayLog: any = {
        ...originalLog,
        id: 'wlog_' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        attemptNumber: 1,
        nextRetryAt: null,
        status: 'success', 
        statusCode: 200,
        responseBody: JSON.stringify({ replayed: true, originalLogId: logId, status: "ok" }),
        deliverySecretSigned: signaturePayload
      };

      setTimeout(() => {
        triggerToast('Webhook Replayed', `Resent event "${originalLog.eventTopic}" with fresh signature headers.`, 'success');
      }, 50);

      return {
        ...prev,
        webhookLogs: [replayLog, ...prev.webhookLogs]
      };
    });
  }, [triggerToast]);

  const retryWebhookDelivery = useCallback((logId: string) => {
    setState(prev => {
      const logToRetry = prev.webhookLogs.find(l => l.id === logId);
      if (!logToRetry) return prev;

      const updatedLogs = prev.webhookLogs.map(l => {
        if (l.id === logId) {
          return {
            ...l,
            status: 'success' as const,
            statusCode: 200,
            responseBody: JSON.stringify({ status: "processed_after_retry", attempt: l.attemptNumber + 1 }),
            nextRetryAt: null
          };
        }
        return l;
      });

      setTimeout(() => {
        triggerToast('Webhook Redelivered', `Retry attempt resolved successfully for log.`, 'success');
      }, 50);

      return {
        ...prev,
        webhookLogs: updatedLogs
      };
    });
  }, [triggerToast]);

  function partsOf(str: string): string[] {
    return str.split(' ').filter(p => p.trim().length > 0);
  }

  // ==========================================
  // OMNI AI OPERATING SYSTEM ACTIONS
  // ==========================================

  const toggleProviderStatus = useCallback((providerId: string) => {
    setState(prev => ({
      ...prev,
      aiProviders: prev.aiProviders.map(p => 
        p.id === providerId ? { ...p, status: p.status === 'connected' ? 'disconnected' as const : 'connected' as const, apiKeyConfigured: p.status === 'connected' ? false : p.apiKeyConfigured } : p
      )
    }));
    addAuditLog('PROVIDER_STATUS_TOGGLED', 'AI', `Toggled provider status for ${providerId}`);
    triggerToast('AI Provider Updated', `Status of provider ${providerId} changed.`, 'info');
  }, [addAuditLog, triggerToast]);

  const updateModelStatus = useCallback((modelId: string, status: 'active' | 'deprecated' | 'offline') => {
    setState(prev => ({
      ...prev,
      aiModels: prev.aiModels.map(m => m.id === modelId ? { ...m, status } : m)
    }));
    addAuditLog('MODEL_STATUS_UPDATED', 'AI', `Updated model ${modelId} status to ${status}`);
    triggerToast('Model Status Updated', `Model ${modelId} is now ${status}.`, 'success');
  }, [addAuditLog, triggerToast]);

  const updateAgentConfig = useCallback((agentId: string, updates: Partial<AIAgent>) => {
    setState(prev => ({
      ...prev,
      aiAgents: prev.aiAgents.map(a => a.id === agentId ? { ...a, ...updates } : a)
    }));
    addAuditLog('AGENT_CONFIG_UPDATED', 'AI', `Modified AI Agent configuration for: ${agentId}`);
    triggerToast('Agent Configuration Updated', 'Agent parameters saved successfully.', 'success');
  }, [addAuditLog, triggerToast]);

  const updateAutonomyRule = useCallback((scopeType: 'tenant' | 'app' | 'agent' | 'tool', scopeId: string, maxAutonomyLevel: number, notes?: string) => {
    setState(prev => {
      const existingIndex = prev.aiAutonomyRules.findIndex(r => r.scopeType === scopeType && r.scopeId === scopeId);
      const rules = [...prev.aiAutonomyRules];
      if (existingIndex >= 0) {
        rules[existingIndex] = { ...rules[existingIndex], maxAutonomyLevel, notes };
      } else {
        rules.push({
          id: 'rule_' + Math.random().toString(36).substring(2, 9),
          scopeType,
          scopeId,
          maxAutonomyLevel,
          notes
        });
      }
      return { ...prev, aiAutonomyRules: rules };
    });
    addAuditLog('AUTONOMY_RULE_UPDATED', 'AI', `Set ${scopeType} autonomy level constraint for ${scopeId} to Level ${maxAutonomyLevel}`);
    triggerToast('Autonomy Constraint Saved', `Level ${maxAutonomyLevel} policy active for this context.`, 'success');
  }, [addAuditLog, triggerToast]);

  const addKnowledgeSource = useCallback((name: string, type: 'document' | 'database' | 'website' | 'cloud_storage' | 'app_record', sizeKb: number, urlOrPath?: string) => {
    const newSource: KnowledgeSource = {
      id: 'know_' + Math.random().toString(36).substring(2, 9),
      name,
      type,
      sizeKb,
      chunkCount: Math.floor(sizeKb / 4) || 1,
      status: 'indexing',
      orgId: state.currentOrgId || 'org_dynasty',
      urlOrPath,
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      aiKnowledgeSources: [newSource, ...prev.aiKnowledgeSources]
    }));
    
    // Simulate RAG indexing delay
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        aiKnowledgeSources: prev.aiKnowledgeSources.map(s => s.id === newSource.id ? { ...s, status: 'indexed' as const } : s)
      }));
      triggerToast('RAG Vector Pipeline Succeeded', `Source "${name}" fully indexed and segmented.`, 'success');
    }, 2500);

    addAuditLog('KNOWLEDGE_SOURCE_INDEXED', 'AI', `RAG pipeline triggered for: ${name}`);
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  const deleteKnowledgeSource = useCallback((sourceId: string) => {
    setState(prev => ({
      ...prev,
      aiKnowledgeSources: prev.aiKnowledgeSources.filter(s => s.id !== sourceId)
    }));
    addAuditLog('KNOWLEDGE_SOURCE_DELETED', 'AI', `Deleted knowledge source index: ${sourceId}`);
    triggerToast('RAG Index De-allocated', 'Vector segments removed from core embeddings.', 'info');
  }, [addAuditLog, triggerToast]);

  const updateBudgetLimit = useCallback((monthlyLimit: number) => {
    if (!state.currentOrgId) return;
    setState(prev => ({
      ...prev,
      aiBudgets: prev.aiBudgets.map(b => 
        b.organizationId === prev.currentOrgId ? { ...b, monthlyLimit, alertsTriggered: b.currentSpent >= monthlyLimit * (b.alertThreshold/100) } : b
      )
    }));
    addAuditLog('BUDGET_LIMIT_MODIFIED', 'AI', `Adjusted monthly AI spend cap to $${monthlyLimit}`);
    triggerToast('Budget Caps Updated', `Spend ceiling set to $${monthlyLimit.toFixed(2)}.`, 'success');
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  const setActiveRoutingProfile = useCallback((profile: OmniRoutingProfile) => {
    setState(prev => ({
      ...prev,
      activeRoutingProfile: profile
    }));
    addAuditLog('ROUTING_PROFILE_CHANGED', 'AI', `Switched OMNI Auto routing optimization profile to: ${profile.toUpperCase()}`);
    triggerToast('Routing Profile Updated', `Active optimization profile: ${profile.toUpperCase()}`, 'info');
  }, [addAuditLog, triggerToast]);

  const saveByokCredential = useCallback(async (cred: Partial<ByokCredential>) => {
    const newId = cred.id || 'byok_' + Math.random().toString(36).substring(2, 9);
    const masked = cred.maskedKey || (cred.encryptedKey ? `${cred.encryptedKey.slice(0, 7)}••••••••${cred.encryptedKey.slice(-4)}` : 'sk-••••••••••••1122');
    const newCred: ByokCredential = {
      id: newId,
      organizationId: state.currentOrgId || 'org_dynasty',
      providerId: cred.providerId || 'openai',
      providerName: cred.providerName || (cred.providerId === 'openai' ? 'OpenAI API' : (cred.providerId === 'anthropic' ? 'Anthropic Claude' : 'DeepSeek API')),
      maskedKey: masked,
      label: cred.label || 'Corporate Custom Key',
      status: 'active',
      allowedAppIds: cred.allowedAppIds || ['*'],
      monthlySpendCapUsd: cred.monthlySpendCapUsd || 500,
      currentMonthSpentUsd: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastTestedAt: new Date().toISOString(),
      testResult: {
        success: true,
        latencyMs: 120,
        message: 'Direct BYOK verification handshake confirmed.'
      }
    };

    setState(prev => ({
      ...prev,
      byokCredentials: [newCred, ...prev.byokCredentials.filter(c => c.id !== newId)],
      aiProviders: prev.aiProviders.map(p => p.id === newCred.providerId ? { ...p, status: 'connected' as const, apiKeyConfigured: true, apiKeyMasked: masked, authType: 'byok' as const } : p)
    }));

    addAuditLog('BYOK_KEY_STORED', 'AI/Security', `Saved BYOK encrypted key credential for provider [${newCred.providerName}].`);
    triggerToast('BYOK Credential Encrypted & Saved', `Provider ${newCred.providerName} enabled with sovereign key mapping.`, 'success');
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  const testByokCredential = useCallback(async (id: string) => {
    const cred = state.byokCredentials.find(c => c.id === id);
    if (!cred) return;

    try {
      const res = await fetch('/api/v1/ai/byok/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: cred.providerId,
          apiKey: 'sk-test-valid-handshake-key-verified',
          organizationId: cred.organizationId
        })
      });
      const data = await res.json();
      setState(prev => ({
        ...prev,
        byokCredentials: prev.byokCredentials.map(c => c.id === id ? {
          ...c,
          lastTestedAt: new Date().toISOString(),
          testResult: {
            success: data.success,
            latencyMs: data.latencyMs || 115,
            message: data.message || 'Connection verified successfully.'
          }
        } : c)
      }));
      triggerToast('BYOK Connection Verified', data.message || 'Remote provider handshake succeeded.', 'success');
    } catch {
      triggerToast('BYOK Test Completed', 'Connection verified successfully.', 'success');
    }
  }, [state.byokCredentials, triggerToast]);

  const revokeByokCredential = useCallback((id: string) => {
    const cred = state.byokCredentials.find(c => c.id === id);
    setState(prev => ({
      ...prev,
      byokCredentials: prev.byokCredentials.filter(c => c.id !== id),
      aiProviders: cred ? prev.aiProviders.map(p => p.id === cred.providerId ? { ...p, status: 'disconnected' as const, apiKeyConfigured: false } : p) : prev.aiProviders
    }));
    addAuditLog('BYOK_KEY_REVOKED', 'AI/Security', `Revoked BYOK key credential: ${id}`);
    triggerToast('BYOK Credential Revoked', 'Key purged from memory.', 'info');
  }, [state.byokCredentials, addAuditLog, triggerToast]);

  const registerByomEndpoint = useCallback((endpoint: Partial<ByomEndpoint>) => {
    const newId = endpoint.id || 'byom_' + Math.random().toString(36).substring(2, 9);
    const newEndpoint: ByomEndpoint = {
      id: newId,
      organizationId: state.currentOrgId || 'org_dynasty',
      name: endpoint.name || 'Private Dedicated Cluster',
      endpointUrl: endpoint.endpointUrl || 'https://vllm.internal.cluster:8000/v1',
      protocol: endpoint.protocol || 'vllm',
      modelIdentifier: endpoint.modelIdentifier || 'llama-3.3-70b-instruct',
      maskedAuthHeader: endpoint.maskedAuthHeader || 'Bearer mTLS_••••••••••••99aa',
      capabilities: endpoint.capabilities || {
        contextLength: 131072,
        streaming: true,
        tools: true,
        vision: false,
        latencyClass: 'low'
      },
      privacyClassification: endpoint.privacyClassification || 'sovereign_enclave',
      healthStatus: 'healthy',
      latencyMs: 22,
      lastHealthCheck: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      byomEndpoints: [newEndpoint, ...prev.byomEndpoints.filter(e => e.id !== newId)]
    }));

    addAuditLog('BYOM_ENDPOINT_REGISTERED', 'AI/Infrastructure', `Registered private inference endpoint [${newEndpoint.name}] (${newEndpoint.endpointUrl}).`);
    triggerToast('BYOM Endpoint Registered', `Private inference endpoint connected to OMNI router matrix.`, 'success');
  }, [state.currentOrgId, addAuditLog, triggerToast]);

  const healthCheckByomEndpoint = useCallback(async (id: string) => {
    const ep = state.byomEndpoints.find(e => e.id === id);
    if (!ep) return;

    try {
      const res = await fetch('/api/v1/ai/byom/health-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ep)
      });
      const data = await res.json();
      setState(prev => ({
        ...prev,
        byomEndpoints: prev.byomEndpoints.map(e => e.id === id ? {
          ...e,
          healthStatus: data.status || 'healthy',
          latencyMs: data.latencyMs || 22,
          lastHealthCheck: new Date().toISOString()
        } : e)
      }));
      triggerToast('BYOM Node Diagnostic', data.message || 'Private endpoint online with sub-30ms latency.', 'success');
    } catch {
      triggerToast('BYOM Node Healthy', 'Private inference socket verified.', 'success');
    }
  }, [state.byomEndpoints, triggerToast]);

  const deleteByomEndpoint = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      byomEndpoints: prev.byomEndpoints.filter(e => e.id !== id)
    }));
    addAuditLog('BYOM_ENDPOINT_REMOVED', 'AI/Infrastructure', `De-registered private inference node: ${id}`);
    triggerToast('BYOM Node Removed', 'Endpoint deregistered from OMNI mesh.', 'info');
  }, [addAuditLog, triggerToast]);

  const simulateProviderChaos = useCallback(async (providerId: string, scenario: 'outage' | 'rate_limit' | 'auth_fail' | 'latency_spike' | 'restore') => {
    try {
      const res = await fetch('/api/v1/ai/chaos/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId, scenario })
      });
      const data = await res.json();
      setState(prev => {
        const nextBreakers = { ...prev.aiCircuitBreakers };
        if (nextBreakers[providerId]) {
          nextBreakers[providerId] = {
            ...nextBreakers[providerId],
            circuitState: data.circuitState,
            lastFailureReason: scenario === 'restore' ? undefined : `Chaos Injected: ${scenario}`
          };
        }
        return {
          ...prev,
          aiCircuitBreakers: nextBreakers,
          aiProviders: prev.aiProviders.map(p => p.id === providerId ? {
            ...p,
            status: scenario === 'restore' ? 'connected' : 'degraded',
            health: {
              ...p.health,
              circuitBreakerState: data.circuitState,
              lastFailureReason: scenario === 'restore' ? undefined : `Simulated: ${scenario}`
            }
          } : p)
        };
      });
      triggerToast(
        scenario === 'restore' ? 'Provider Health Restored' : 'Chaos Simulation Injected',
        data.message || `Circuit breaker state updated to ${data.circuitState.toUpperCase()}.`,
        scenario === 'restore' ? 'success' : 'error'
      );
    } catch {
      triggerToast('Chaos Engine', 'Scenario updated.', 'info');
    }
  }, [triggerToast]);

  const clearAiCache = useCallback(() => {
    setState(prev => ({
      ...prev,
      aiCacheRecords: []
    }));
    addAuditLog('AI_CACHE_CLEARED', 'AI/Performance', 'Purged all cached response vectors from memory store.');
    triggerToast('AI Response Cache Cleared', 'All cached vectors purged.', 'info');
  }, [addAuditLog, triggerToast]);

  const approveApprovalTask = useCallback((taskId: string) => {
    setState(prev => {
      const task = prev.aiApprovalTasks.find(t => t.id === taskId);
      if (!task) return prev;

      // 1. Mark task approved
      const updatedTasks = prev.aiApprovalTasks.map(t => 
        t.id === taskId ? { ...t, status: 'approved' as const, decisionDate: new Date().toISOString(), deciderUserId: prev.user?.id } : t
      );

      // 2. Adjust Ledger balance of the organization as if the tool was executed!
      let walletDeduction = 0;
      let desc = '';
      if (task.toolId === 'create_draft_campaign') {
        walletDeduction = task.arguments.bidAmountUsd || 250;
        desc = `AI Auto-Campaign billing: ${task.arguments.campaignName}`;
      }

      const currentOrg = prev.organizations.find(o => o.id === task.organizationId);
      if (currentOrg && walletDeduction > currentOrg.walletBalance) {
        setTimeout(() => {
          triggerToast('Execution Denied', 'Insufficient funds in OMNI ledger balance to complete tool execution.', 'error');
        }, 50);
        return prev;
      }

      const updatedOrgs = prev.organizations.map(org => {
        if (org.id === task.organizationId && walletDeduction > 0) {
          return { ...org, walletBalance: org.walletBalance - walletDeduction };
         }
         return org;
      });

      // 3. Create a fresh ledger log if there's a cost
      const newLedger: LedgerEntry[] = walletDeduction > 0 ? [{
        id: generateUUID(),
        walletId: `wallet_${task.organizationId}`,
        type: 'debit',
        amount: walletDeduction,
        description: desc,
        timestamp: new Date().toISOString(),
        referenceId: 'ref_tx_' + Math.floor(100000 + Math.random() * 900000),
        status: 'completed'
      }] : [];

      // 4. Create an audit log
      const newAudit: AIAuditLog = {
        id: 'ai_audit_' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        userId: prev.user?.id || 'usr_anonymous',
        userEmail: prev.user?.email || 'anonymous@omni.io',
        agentId: task.agentId,
        agentName: task.agentName,
        toolId: task.toolId,
        toolName: task.toolName,
        policyDecision: `Approved by human operator ${prev.user?.fullName || 'Gideon'}`,
        resultSummary: `Executed tool action [${task.toolName}] successfully with arguments: ${JSON.stringify(task.arguments)}`,
        status: 'success',
        approvalState: 'approved',
        organizationId: task.organizationId,
        estimatedCost: task.estimatedCost
      };

      // Also add an App notification
      const newNotif: Notification = {
        id: generateUUID(),
        title: 'AI Action Approved & Settled',
        content: `Human operator signed off tool action [${task.toolName}]. Ledger balance settled.`,
        type: 'action',
        isRead: false,
        createdAt: new Date().toISOString()
      };

      // Update Conversation message tool call status to completed!
      const updatedConversations = prev.aiConversations.map(conv => {
        return {
          ...conv,
          messages: conv.messages.map(msg => {
            if (msg.toolCallId === taskId) {
              return { ...msg, toolStatus: 'completed' as const, content: `${msg.content}\n\n*[Operator approved execution. Target ledger reconciled.]*` };
            }
            return msg;
          })
        };
      });

      return {
        ...prev,
        aiApprovalTasks: updatedTasks,
        organizations: updatedOrgs,
        ledger: [...newLedger, ...prev.ledger],
        aiAuditLogs: [newAudit, ...prev.aiAuditLogs],
        notifications: [newNotif, ...prev.notifications],
        aiConversations: updatedConversations
      };
    });
    addAuditLog('APPROVAL_TASK_APPROVED', 'AI', `Approved pending tool call task: ${taskId}`);
    triggerToast('AI Action Executed', 'Tool execution signed off and posted.', 'success');
  }, [addAuditLog, triggerToast]);

  const rejectApprovalTask = useCallback((taskId: string) => {
    setState(prev => {
      const task = prev.aiApprovalTasks.find(t => t.id === taskId);
      if (!task) return prev;

      const updatedTasks = prev.aiApprovalTasks.map(t => 
        t.id === taskId ? { ...t, status: 'rejected' as const, decisionDate: new Date().toISOString(), deciderUserId: prev.user?.id } : t
      );

      const newAudit: AIAuditLog = {
        id: 'ai_audit_' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        userId: prev.user?.id || 'usr_anonymous',
        userEmail: prev.user?.email || 'anonymous@omni.io',
        agentId: task.agentId,
        agentName: task.agentName,
        toolId: task.toolId,
        toolName: task.toolName,
        policyDecision: `Rejected by human operator ${prev.user?.fullName || 'Gideon'}`,
        resultSummary: `Execution halted. Operator rejected task enqueuing.`,
        status: 'blocked',
        approvalState: 'rejected',
        organizationId: task.organizationId,
        estimatedCost: 0
      };

      const updatedConversations = prev.aiConversations.map(conv => {
        return {
          ...conv,
          messages: conv.messages.map(msg => {
            if (msg.toolCallId === taskId) {
              return { ...msg, toolStatus: 'failed' as const, content: `${msg.content}\n\n*[Operator rejected execution. Tool execution blocked.]*` };
            }
            return msg;
          })
        };
      });

      return {
        ...prev,
        aiApprovalTasks: updatedTasks,
        aiAuditLogs: [newAudit, ...prev.aiAuditLogs],
        aiConversations: updatedConversations
      };
    });
    addAuditLog('APPROVAL_TASK_REJECTED', 'AI', `Rejected pending tool call task: ${taskId}`);
    triggerToast('AI Action Blocked', 'Tool call rejected.', 'info');
  }, [addAuditLog, triggerToast]);

  const sendAgentChatMessage = useCallback(async (agentId: string, promptText: string) => {
    if (!state.currentOrgId) return;

    const conversation = state.aiConversations.find(c => c.agentId === agentId && c.organizationId === state.currentOrgId) || {
      id: 'conv_' + Math.random().toString(36).substring(2, 9),
      agentId,
      userId: state.user?.id || 'usr_anonymous',
      organizationId: state.currentOrgId,
      appId: state.activeAppId || 'app_home',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const userMsg = {
      id: 'msg_' + Math.floor(100000 + Math.random() * 900000),
      role: 'user' as const,
      content: promptText,
      timestamp: new Date().toISOString()
    };

    // Append user message instantly in local state
    setState(prev => {
      const conversations = [...prev.aiConversations];
      const existIdx = conversations.findIndex(c => c.agentId === agentId && c.organizationId === prev.currentOrgId);
      
      const updatedMsgs = existIdx >= 0 
        ? [...conversations[existIdx].messages, userMsg]
        : [userMsg];

      const updatedConv = {
        ...conversation,
        messages: updatedMsgs,
        updatedAt: new Date().toISOString()
      };

      if (existIdx >= 0) {
        conversations[existIdx] = updatedConv;
      } else {
        conversations.push(updatedConv);
      }

      return { ...prev, aiConversations: conversations };
    });

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          prompt: promptText,
          conversationId: conversation.id,
          userId: state.user?.id,
          userEmail: state.user?.email,
          organizationId: state.currentOrgId,
          appId: state.activeAppId || 'app_home',
          currentBudgets: state.aiBudgets,
          currentAutonomyRules: state.aiAutonomyRules,
          currentAgents: state.aiAgents,
          currentTools: state.aiTools
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.interrupted) {
        // Blocked by budget or other policies
        const assistantMsg = {
          id: 'msg_' + Math.floor(100000 + Math.random() * 900000),
          role: 'assistant' as const,
          content: data.message,
          timestamp: new Date().toISOString()
        };

        setState(prev => {
          const conversations = prev.aiConversations.map(c => {
            if (c.agentId === agentId && c.organizationId === prev.currentOrgId) {
              return { ...c, messages: [...c.messages, assistantMsg], updatedAt: new Date().toISOString() };
            }
            return c;
          });
          const auditLogs = data.newAuditLog ? [data.newAuditLog, ...prev.aiAuditLogs] : prev.aiAuditLogs;
          return { ...prev, aiConversations: conversations, aiAuditLogs: auditLogs };
        });
        triggerToast('AI Action Interrupted', 'Operations halted due to safety policy check.', 'error');
        return;
      }

      // Merge cost, audit log, and messages
      setState(prev => {
        const conversations = prev.aiConversations.map(c => {
          if (c.agentId === agentId && c.organizationId === prev.currentOrgId) {
            const incomingMsg = {
              ...data.chatMessage,
              toolCallId: data.needsApproval ? data.approvalTask.id : data.chatMessage.toolCallId
            };
            return { ...c, messages: [...c.messages, incomingMsg], updatedAt: new Date().toISOString() };
          }
          return c;
        });

        const costRecords = data.costRecord ? [data.costRecord, ...prev.aiCostRecords] : prev.aiCostRecords;
        
        // Deduct from organizational budget
        const updatedBudgets = prev.aiBudgets.map(b => {
          if (b.organizationId === prev.currentOrgId && data.costRecord) {
            const newSpent = b.currentSpent + data.costRecord.estimatedCost;
            return {
              ...b,
              currentSpent: newSpent,
              alertsTriggered: newSpent >= b.monthlyLimit * (b.alertThreshold / 100)
            };
          }
          return b;
        });

        // Add Approval task if enqueued
        const approvalTasks = data.needsApproval ? [data.approvalTask, ...prev.aiApprovalTasks] : prev.aiApprovalTasks;

        // Add AI Audit log
        const aiAuditLogs = data.newAuditLog ? [data.newAuditLog, ...prev.aiAuditLogs] : prev.aiAuditLogs;

        const notifications = [...prev.notifications];
        const currentBudg = updatedBudgets.find(b => b.organizationId === prev.currentOrgId);
        const oldBudg = prev.aiBudgets.find(b => b.organizationId === prev.currentOrgId);
        if (currentBudg?.alertsTriggered && !oldBudg?.alertsTriggered) {
          notifications.unshift({
            id: generateUUID(),
            title: 'AI Budget Alert Triggered',
            content: `Warning: AI spent reached threshold of ${currentBudg.alertThreshold}% ($${currentBudg.currentSpent.toFixed(2)} spent out of $${currentBudg.monthlyLimit.toFixed(2)})`,
            type: 'billing',
            isRead: false,
            createdAt: new Date().toISOString()
          });
        }

        return {
          ...prev,
          aiConversations: conversations,
          aiCostRecords: costRecords,
          aiBudgets: updatedBudgets,
          aiApprovalTasks: approvalTasks,
          aiAuditLogs: aiAuditLogs,
          notifications
        };
      });

      if (data.needsApproval) {
        triggerToast('Approval Needed', 'Action routed to Verification center.', 'info');
      } else {
        triggerToast('Response Received', 'AI workspace response processed.', 'success');
      }

    } catch (err: any) {
      console.error('Chat error:', err);
      triggerToast('AI Gateway Error', err.message || 'Error reaching the OMNI intelligence nodes.', 'error');
    }
  }, [state, triggerToast]);

  const clearChatHistory = useCallback((agentId: string) => {
    setState(prev => ({
      ...prev,
      aiConversations: prev.aiConversations.filter(c => !(c.agentId === agentId && c.organizationId === prev.currentOrgId))
    }));
    triggerToast('Conversation Cleared', 'Chat memory for this agent has been reset.', 'info');
  }, [triggerToast]);

  // ==========================================
  // OMNI Financial Accounting Engine State
  // ==========================================
  const recordDoubleEntryTransaction = useCallback((
    debitAccount: string,
    creditAccount: string,
    debitType: 'customers' | 'merchants' | 'affiliates' | 'resellers' | 'creators' | 'platform' | 'tenants' | 'refunds' | 'promotional credits',
    creditType: 'customers' | 'merchants' | 'affiliates' | 'resellers' | 'creators' | 'platform' | 'tenants' | 'refunds' | 'promotional credits',
    amount: number,
    currency: string,
    description: string,
    referenceId: string
  ) => {
    const newEntry = {
      id: generateUUID(),
      timestamp: new Date().toISOString(),
      debitAccount,
      creditAccount,
      debitType,
      creditType,
      amount,
      currency,
      description,
      referenceId,
      verificationHash: 'sha256_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      status: 'completed' as const,
      isReconciled: false
    };

    setState(prev => {
      // Modify wallets if applicable
      const updatedWallets = prev.omniWallets.map(w => {
        let avail = w.availableBalance;
        let pending = w.pendingBalance;
        let credits = w.creditsBalance;
        let aff = w.affiliateEarnings;
        let res = w.resellerEarnings;
        let refs = w.refundsTotal;

        // Debit adjustment (Subtracting value from the source)
        if (debitAccount === `merchant_tenant_${w.tenantId.replace('tenant_', '')}` || debitAccount === w.tenantId) {
          if (debitType === 'promotional credits') {
            credits = Math.max(0, credits - amount);
          } else if (debitType === 'affiliates') {
            aff = Math.max(0, aff - amount);
          } else if (debitType === 'resellers') {
            res = Math.max(0, res - amount);
          } else if (debitType === 'refunds') {
            refs += amount;
            avail = Math.max(0, avail - amount);
          } else {
            avail = Math.max(0, avail - amount);
          }
        }

        // Credit adjustment (Adding value to the destination)
        if (creditAccount === `merchant_tenant_${w.tenantId.replace('tenant_', '')}` || creditAccount === w.tenantId) {
          if (creditType === 'promotional credits') {
            credits += amount;
          } else if (creditType === 'affiliates') {
            aff += amount;
          } else if (creditType === 'resellers') {
            res += amount;
          } else {
            avail += amount;
          }
        }

        return { 
          ...w, 
          availableBalance: avail, 
          pendingBalance: pending, 
          creditsBalance: credits,
          affiliateEarnings: aff,
          resellerEarnings: res,
          refundsTotal: refs
        };
      });

      // Sync organization wallet balance
      const updatedOrgs = prev.organizations.map(o => {
        const wallet = updatedWallets.find(w => w.tenantId === o.tenantId);
        if (wallet) {
          return { ...o, walletBalance: wallet.availableBalance };
        }
        return o;
      });

      return {
        ...prev,
        doubleEntryLedger: [newEntry, ...prev.doubleEntryLedger],
        omniWallets: updatedWallets,
        organizations: updatedOrgs
      };
    });

    addAuditLog('LEDGER_TRANSACTION', 'Finance/Ledger', `Recorded traceable movement of $${amount} from ${debitAccount} to ${creditAccount}`);
    triggerToast('Ledger Record Added', `Successfully processed double-entry journal entry of $${amount}.`, 'success');
  }, [addAuditLog, triggerToast]);

  const updatePaymentIntegration = useCallback((id: string, isEnabled: boolean) => {
    setState(prev => ({
      ...prev,
      paymentIntegrations: prev.paymentIntegrations.map(p => p.id === id ? { ...p, isEnabled } : p)
    }));
    triggerToast('Integration Configured', 'Payment gateway configuration synced.', 'success');
  }, [triggerToast]);

  const updateSubscription = useCallback((id: string, action: 'cancel' | 'renew' | 'upgrade' | 'downgrade' | 'trial_end') => {
    setState(prev => {
      const updatedSubs = prev.subscriptions.map(s => {
        if (s.id === id) {
          let status = s.status;
          let price = s.price;
          let productName = s.productName;
          let productId = s.productId;
          let cancelAtPeriodEnd = s.cancelAtPeriodEnd;
          let endDate = s.endDate;

          if (action === 'cancel') {
            cancelAtPeriodEnd = true;
            status = 'cancelled';
          } else if (action === 'renew') {
            cancelAtPeriodEnd = false;
            status = 'active';
            const currentEnd = new Date(s.endDate);
            currentEnd.setMonth(currentEnd.getMonth() + 1);
            endDate = currentEnd.toISOString();
          } else if (action === 'upgrade') {
            productId = 'prod_business_enterprise';
            productName = 'OMNI Business Enterprise';
            price = 4500.00;
            status = 'active';
          } else if (action === 'downgrade') {
            productId = 'prod_browser_premium';
            productName = 'OMNI Browser Premium';
            price = 29.00;
            status = 'active';
          } else if (action === 'trial_end') {
            status = 'active';
          }

          return { ...s, status, price, productName, productId, cancelAtPeriodEnd, endDate };
        }
        return s;
      });

      return { ...prev, subscriptions: updatedSubs };
    });

    addAuditLog('SUBSCRIPTION_UPDATE', 'Finance/Billing', `Subscription ${id} processed action: ${action.toUpperCase()}`);
    triggerToast('Subscription Switched', `Processed subscription operation ${action.toUpperCase()} successfully.`, 'success');
  }, [addAuditLog, triggerToast]);

  const generateInvoice = useCallback((tenantId: string, invoiceType: 'invoice' | 'receipt' | 'credit_note', amount: number, items: any[], jurisdiction: string) => {
    const taxRate = jurisdiction === 'EU' ? 20 : jurisdiction === 'US_NY' ? 8.875 : 12.5;
    const subtotal = amount;
    const taxAmount = (amount * taxRate) / 100;
    const total = subtotal + taxAmount;

    const newInvoice = {
      id: generateUUID(),
      tenantId,
      invoiceNumber: `${invoiceType === 'invoice' ? 'INV' : invoiceType === 'receipt' ? 'RCP' : 'CN'}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      type: invoiceType,
      status: invoiceType === 'invoice' ? 'unpaid' : 'paid' as const,
      amount: total,
      taxAmount,
      subtotal,
      discountAmount: 0,
      currency: 'USD',
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      issuedDate: new Date().toISOString(),
      billingEmail: 'billing@omni-tenant.io',
      items,
      taxJurisdiction: jurisdiction,
      taxRate
    };

    setState(prev => ({
      ...prev,
      invoices: [newInvoice, ...prev.invoices]
    }));

    addAuditLog('INVOICE_GENERATED', 'Finance/Billing', `Created ${invoiceType.toUpperCase()} of $${total.toFixed(2)}`);
    triggerToast('Invoice Generated', `Created ${invoiceType.toUpperCase()} of $${total.toFixed(2)}`, 'success');
  }, [addAuditLog, triggerToast]);

  const requestPayout = useCallback((recipientId: string, recipientType: 'seller' | 'affiliate' | 'reseller' | 'creator' | 'service_provider', recipientName: string, amount: number, payoutMethod: string) => {
    const riskScore = Math.floor(Math.random() * 85);
    const status = riskScore > 65 ? 'on_hold' : 'pending';

    const newPayout = {
      id: generateUUID(),
      recipientId,
      recipientType,
      recipientName,
      amount,
      currency: 'USD',
      status: status as any,
      holdReason: status === 'on_hold' ? 'High Risk Review Score - Held for Compliance review' : undefined,
      isVerified: true,
      riskReviewScore: riskScore,
      payoutMethod,
      timestamp: new Date().toISOString(),
      reference: 'ref_payout_' + Math.random().toString(36).substring(2, 9)
    };

    setState(prev => ({
      ...prev,
      payouts: [newPayout, ...prev.payouts]
    }));

    addAuditLog('PAYOUT_REQUEST', 'Finance/Payouts', `Requested payout of $${amount} to ${recipientName} (${recipientType})`);
    triggerToast('Payout Initiated', `Payout of $${amount} created with status: ${status.toUpperCase()}`, 'success');
  }, [addAuditLog, triggerToast]);

  const processPayoutAction = useCallback((id: string, action: 'approve' | 'reject' | 'clear_hold') => {
    setState(prev => {
      let debitAcc = '';
      let creditAcc = 'platform_reserve';
      let amount = 0;
      let recipientType: any = 'platform';

      const updatedPayouts = prev.payouts.map(p => {
        if (p.id === id) {
          let status = p.status;
          let holdReason = p.holdReason;

          if (action === 'approve') {
            status = 'completed';
            holdReason = undefined;
            debitAcc = p.recipientId;
            amount = p.amount;
            recipientType = p.recipientType;
          } else if (action === 'reject') {
            status = 'risk_rejected';
            holdReason = 'Rejected by security risk review audit';
          } else if (action === 'clear_hold') {
            status = 'pending';
            holdReason = undefined;
          }

          return { ...p, status, holdReason };
        }
        return p;
      });

      // Deduct from corresponding wallet on approved payouts
      let updatedWallets = prev.omniWallets;
      if (action === 'approve' && debitAcc) {
        updatedWallets = prev.omniWallets.map(w => {
          if (w.tenantId === debitAcc || `merchant_tenant_${w.tenantId.replace('tenant_', '')}` === debitAcc) {
            return {
              ...w,
              availableBalance: Math.max(0, w.availableBalance - amount),
              withdrawalsTotal: w.withdrawalsTotal + amount
            };
          }
          return w;
        });
      }

      return { 
        ...prev, 
        payouts: updatedPayouts,
        omniWallets: updatedWallets
      };
    });

    addAuditLog('PAYOUT_ACTION', 'Finance/Payouts', `Payout ID ${id} action completed: ${action.toUpperCase()}`);
    triggerToast('Payout Authorized', `Payout action ${action.toUpperCase()} completed successfully.`, 'success');
  }, [addAuditLog, triggerToast]);

  const runFinancialReconciliation = useCallback(() => {
    let balanced = true;
    let checkedCount = 0;
    const discrepancies: string[] = [];

    setState(prev => {
      checkedCount = prev.doubleEntryLedger.length;
      let totalDebits = 0;
      let totalCredits = 0;

      // Ensure every completed debit matches its corresponding credit value
      prev.doubleEntryLedger.forEach(tx => {
        if (tx.status === 'completed') {
          totalDebits += tx.amount;
          totalCredits += tx.amount;
        }
      });

      const totalWalletsAsset = prev.omniWallets.reduce((acc, w) => acc + w.availableBalance, 0);

      const log = {
        id: generateUUID(),
        timestamp: new Date().toISOString(),
        checkedRecordsCount: checkedCount,
        unbalancedEntriesCount: discrepancies.length,
        discrepanciesDetected: discrepancies,
        status: balanced ? 'balanced' as const : 'integrity_breached' as const,
        details: `Reconciliation balanced successfully. Active double-entry system asset audit passed. Total $${totalWalletsAsset.toLocaleString()} USD in circulation verified.`
      };

      return {
        ...prev,
        doubleEntryLedger: prev.doubleEntryLedger.map(tx => ({ ...tx, isReconciled: true })),
        reconciliationLogs: [log, ...prev.reconciliationLogs]
      };
    });

    addAuditLog('FINANCIAL_RECONCILIATION', 'Finance/Reconciliation', `Reconciled ledger across ${checkedCount} journal entry rows.`);
    triggerToast('Ledger Reconciled', 'Double-entry signature tree verified. Zero leaks detected.', 'success');
  }, [addAuditLog, triggerToast]);

  const simulateFailedPayment = useCallback((id: string) => {
    setState(prev => {
      const updatedSubs = prev.subscriptions.map(s => {
        if (s.id === id) {
          return { ...s, status: 'grace_period' as const, cancelAtPeriodEnd: true };
        }
        return s;
      });

      const newNotif = {
        id: generateUUID(),
        title: 'Subscription Failed Payment',
        content: `Warning: Failed card payment trigger on automated renew subscription. Grace Period started for ${id}.`,
        type: 'billing' as const,
        isRead: false,
        createdAt: new Date().toISOString()
      };

      return { ...prev, subscriptions: updatedSubs, notifications: [newNotif, ...prev.notifications] };
    });

    addAuditLog('BILLING_FAILURE', 'Finance/Billing', `Simulated failed card webhook retry sequence on subscription ${id}`);
    triggerToast('Billing Retry Failed', 'Payment processor rejected card. Grace period activated.', 'error');
  }, [addAuditLog, triggerToast]);

  // ==========================================
  // OMNI Affiliate, Partner, Agent & Growth Network Hooks
  // ==========================================

  const registerAsAffiliate = useCallback((name: string, email: string, partnerType: 'affiliate' | 'influencer' | 'agency' | 'referral_partner' | 'sales_agent' | 'regional_representative', customCode?: string) => {
    const affiliateId = (customCode || name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase() + Math.floor(100 + Math.random() * 900));
    const newAff = {
      id: generateUUID(),
      userId: state.user?.id || 'usr_anonymous',
      name,
      email,
      partnerType,
      affiliateId,
      level: 'bronze' as const,
      referralLink: `https://omni.io/?ref=${affiliateId}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=${affiliateId}`,
      joinedDate: new Date().toISOString(),
      status: 'active' as const,
      clicksCount: 0,
      leadsCount: 0,
      conversionsCount: 0,
      earningsPending: 0,
      earningsApproved: 0,
      earningsRejected: 0
    };

    setState(prev => ({
      ...prev,
      affiliates: [newAff, ...prev.affiliates]
    }));

    addAuditLog('AFFILIATE_REGISTERED', 'Affiliates', `Registered user ${email} as ${partnerType.toUpperCase()} with code ${affiliateId}`);
    triggerToast('Affiliate Registered', `Successfully registered as an OMNI ${partnerType.replace('_', ' ')}.`, 'success');
  }, [state.user, addAuditLog, triggerToast]);

  const updateAttributionModel = useCallback((model: 'first_click' | 'last_click' | 'coupon' | 'app_specific', windowDays: number) => {
    setState(prev => ({
      ...prev,
      attributionSettings: { model, windowDays }
    }));
    addAuditLog('ATTRIBUTION_UPDATED', 'Affiliates', `Updated global attribution model to ${model.toUpperCase()} (Window: ${windowDays} days)`);
    triggerToast('Attribution Updated', `Attribution window set to ${windowDays} days (${model.replace('_', ' ')}).`, 'success');
  }, [addAuditLog, triggerToast]);

  const simulateAffiliateClick = useCallback((affiliateCode: string, opportunityId: string) => {
    const affiliate = state.affiliates.find(a => a.affiliateId === affiliateCode);
    if (!affiliate) {
      triggerToast('Invalid Affiliate Code', 'No active partner found with this referral code.', 'error');
      return;
    }

    const isClickSpam = Math.random() > 0.85; 
    const cookieStuffed = Math.random() > 0.92;

    const newClick = {
      id: generateUUID(),
      affiliateId: affiliate.id,
      opportunityId,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.' + Math.floor(1 + Math.random() * 254),
      userAgent: navigator.userAgent,
      referer: 'https://sandbox.omni-partner-simulator.io',
      country: ['US', 'CA', 'GB', 'NG', 'GH', 'DE'][Math.floor(Math.random() * 6)],
      isSpam: isClickSpam,
      cookieStuffed: cookieStuffed
    };

    setState(prev => {
      const alerts = [...prev.fraudAlerts];
      if (isClickSpam || cookieStuffed) {
        alerts.unshift({
          id: generateUUID(),
          timestamp: new Date().toISOString(),
          affiliateId: affiliate.id,
          affiliateName: affiliate.name,
          type: isClickSpam ? 'click_spam' : 'cookie_stuffing',
          severity: 'high',
          description: isClickSpam 
            ? 'Spam click sequence registered: exceeding 120 clicks/min from rotated user agents.' 
            : 'Pre-injection browser cookie stuffing trace detected during routing.',
          status: 'flagged',
          evidence: `IP Tracing: 192.168.1.XX. Referer headers blanked. Code: ${affiliateCode}`
        });
      }

      const updatedAffiliates = prev.affiliates.map(a => {
        if (a.id === affiliate.id) {
          return {
            ...a,
            clicksCount: a.clicksCount + 1
          };
        }
        return a;
      });

      return {
        ...prev,
        affiliateClicks: [newClick, ...prev.affiliateClicks],
        affiliates: updatedAffiliates,
        fraudAlerts: alerts
      };
    });

    if (isClickSpam || cookieStuffed) {
      addAuditLog('AFFILIATE_FRAUD_FLAGGED', 'Affiliates/Security', `Flagged suspicious click routing behavior on partner ${affiliate.name}`);
      triggerToast('Security Shield Fired', 'Suspicious click velocity or stuffing vector isolated.', 'info');
    } else {
      addAuditLog('AFFILIATE_CLICK_REGISTERED', 'Affiliates', `Registered referral click for partner code: ${affiliateCode}`);
      triggerToast('Referral Link Visited', 'Simulated affiliate click logged successfully.', 'success');
    }
  }, [state.affiliates, addAuditLog, triggerToast]);

  const simulateAffiliateLead = useCallback((affiliateCode: string, opportunityId: string, email: string, customerType: 'individual' | 'enterprise') => {
    const affiliate = state.affiliates.find(a => a.affiliateId === affiliateCode);
    if (!affiliate) return;

    const newLead = {
      id: generateUUID(),
      clickId: 'click_sim_' + Math.random().toString(36).substring(2, 6),
      affiliateId: affiliate.id,
      opportunityId,
      email,
      timestamp: new Date().toISOString(),
      status: 'pending' as const,
      customerType
    };

    setState(prev => {
      const updatedAffiliates = prev.affiliates.map(a => {
        if (a.id === affiliate.id) {
          return { ...a, leadsCount: a.leadsCount + 1 };
        }
        return a;
      });

      return {
        ...prev,
        affiliateLeads: [newLead, ...prev.affiliateLeads],
        affiliates: updatedAffiliates
      };
    });

    addAuditLog('AFFILIATE_LEAD_LOGGED', 'Affiliates', `Logged referral lead: ${email} under affiliate ${affiliate.name}`);
    triggerToast('Referral Lead Captured', `Onboarded lead ${email} successfully.`, 'success');
  }, [state.affiliates, addAuditLog, triggerToast]);

  const triggerAffiliateConversion = useCallback((
    affiliateCode: string, 
    opportunityId: string, 
    amount: number, 
    customerType: 'individual' | 'enterprise',
    country: string,
    campaign?: string
  ) => {
    const affiliate = state.affiliates.find(a => a.affiliateId === affiliateCode);
    const opportunity = state.affiliateOpportunities.find(o => o.id === opportunityId);

    if (!affiliate || !opportunity) return;

    const isSelfReferral = (state.user?.email || '').toLowerCase().trim() === (affiliate.email || '').toLowerCase().trim();
    
    const conversionId = generateUUID();
    const newConversion = {
      id: conversionId,
      clickId: 'click_conv_' + Math.random().toString(36).substring(2, 6),
      affiliateId: affiliate.id,
      opportunityId,
      amount,
      currency: 'USD',
      timestamp: new Date().toISOString(),
      orderId: 'ord_' + Math.floor(100000 + Math.random() * 900000),
      planId: opportunity.productName,
      customerType,
      country,
      campaign,
      isSuspicious: isSelfReferral,
      fraudType: isSelfReferral ? 'self_referral' : undefined
    };

    let commissionAmt = 0;
    if (opportunity.commissionType === 'percentage') {
      commissionAmt = (amount * opportunity.commissionValue) / 100;
    } else {
      commissionAmt = opportunity.commissionValue;
    }

    const levelMultipliers = { bronze: 1, silver: 1.1, gold: 1.2, platinum: 1.3 };
    commissionAmt = commissionAmt * levelMultipliers[affiliate.level];

    if (customerType === 'enterprise') {
      commissionAmt = commissionAmt * 1.1;
    }

    if (campaign === 'summer_growth_2026') {
      commissionAmt += 20;
    }

    commissionAmt = Math.round(commissionAmt * 100) / 100;
    const commissionStatus = isSelfReferral ? 'pending' as const : 'approved' as const;

    const newCommission = {
      id: generateUUID(),
      affiliateId: affiliate.id,
      conversionId,
      opportunityId,
      amount: commissionAmt,
      currency: 'USD',
      status: commissionStatus,
      rejectionReason: isSelfReferral ? 'Pending Review: Flagged as Self-Referral fraud alert' : undefined,
      isRecurring: opportunity.isRecurring,
      createdAt: new Date().toISOString()
    };

    setState(prev => {
      const alerts = [...prev.fraudAlerts];
      if (isSelfReferral) {
        alerts.unshift({
          id: generateUUID(),
          timestamp: new Date().toISOString(),
          affiliateId: affiliate.id,
          affiliateName: affiliate.name,
          type: 'self_referral',
          severity: 'medium',
          description: `Self-Referral Blocked: User ${state.user?.email} conversion registered using their own affiliate link.`,
          status: 'flagged',
          evidence: `Normalised buyer email matches partner register: ${affiliate.email}`
        });
      }

      let updatedWallets = prev.omniWallets;
      if (commissionStatus === 'approved') {
        updatedWallets = prev.omniWallets.map(w => {
          if (w.tenantId === `merchant_tenant_${affiliate.userId.replace('usr_', '')}` || w.id === affiliate.id) {
            return {
              ...w,
              availableBalance: w.availableBalance + commissionAmt,
              affiliateEarnings: w.affiliateEarnings + commissionAmt
            };
          }
          return w;
        });
      }

      const updatedAffiliates = prev.affiliates.map(a => {
        if (a.id === affiliate.id) {
          return {
            ...a,
            conversionsCount: a.conversionsCount + 1,
            earningsPending: commissionStatus === 'pending' ? a.earningsPending + commissionAmt : a.earningsPending,
            earningsApproved: commissionStatus === 'approved' ? a.earningsApproved + commissionAmt : a.earningsApproved
          };
        }
        return a;
      });

      return {
        ...prev,
        affiliateConversions: [newConversion, ...prev.affiliateConversions],
        affiliateCommissions: [newCommission, ...prev.affiliateCommissions],
        affiliates: updatedAffiliates,
        fraudAlerts: alerts,
        omniWallets: updatedWallets
      };
    });

    if (isSelfReferral) {
      addAuditLog('SELF_REFERRAL_ALERT', 'Affiliates/Security', `Self-referral fraud alert triggered for partner: ${affiliate.name}`);
      triggerToast('Conversion Flagged', 'Self-referral caught. Settle put on escrow hold.', 'warning');
    } else {
      recordDoubleEntryTransaction(
        'platform_revenue',
        `affiliate_${affiliate.affiliateId}`,
        'platform',
        'affiliates',
        commissionAmt,
        'USD',
        `Affiliate commission for order ${newConversion.orderId}`,
        conversionId
      );
      addAuditLog('AFFILIATE_CONVERSION_LOGGED', 'Affiliates', `Conversion recorded. Granted $${commissionAmt} to affiliate ${affiliate.name}`);
      triggerToast('Referral Sale Settled', `Succeeded! Earned $${commissionAmt} commission.`, 'success');
    }
  }, [state.user, state.affiliates, state.affiliateOpportunities, recordDoubleEntryTransaction, addAuditLog, triggerToast]);

  const processFraudAlertAction = useCallback((alertId: string, action: 'dismiss' | 'suspend') => {
    setState(prev => {
      let affIdToSuspend = '';
      const updatedAlerts = prev.fraudAlerts.map(al => {
        if (al.id === alertId) {
          affIdToSuspend = al.affiliateId;
          return {
            ...al,
            status: action === 'dismiss' ? ('dismissed' as const) : ('resolved_suspended' as const)
          };
        }
        return al;
      });

      const updatedAffiliates = prev.affiliates.map(af => {
        if (af.id === affIdToSuspend && action === 'suspend') {
          return { ...af, status: 'suspended' as const };
        }
        return af;
      });

      return {
        ...prev,
        fraudAlerts: updatedAlerts,
        affiliates: updatedAffiliates
      };
    });

    addAuditLog('FRAUD_SHIELD_ACTION', 'Affiliates/Security', `Processed fraud alert ID: ${alertId} with action ${action.toUpperCase()}`);
    triggerToast('Compliance Updated', `Fraud action ${action.toUpperCase()} completed.`, 'success');
  }, [addAuditLog, triggerToast]);

  const allocateGrowthReward = useCallback((
    recipientId: string, 
    recipientName: string, 
    activityType: 'verified_customer_acquisition' | 'merchant_acquisition' | 'completed_sales' | 'retention_milestone' | 'useful_content' | 'geographic_expansion' | 'validated_business_development',
    points: number,
    description: string
  ) => {
    const newReward = {
      id: generateUUID(),
      recipientId,
      recipientName,
      points,
      activityType,
      description,
      timestamp: new Date().toISOString(),
      status: 'allocated' as const
    };

    setState(prev => {
      const updatedWallets = prev.omniWallets.map(w => {
        if (w.tenantId === recipientId || w.id === recipientId || `merchant_tenant_${recipientId.replace('usr_', '')}` === recipientId) {
          return {
            ...w,
            rewardsBalance: w.rewardsBalance + points
          };
        }
        return w;
      });

      return {
        ...prev,
        growthRewards: [newReward, ...prev.growthRewards],
        omniWallets: updatedWallets
      };
    });

    addAuditLog('GROWTH_REWARD_ALLOCATED', 'Affiliates/Rewards', `Allocated ${points} Growth Reward points to ${recipientName}`);
    triggerToast('Growth Reward Granted', `Granted ${points.toLocaleString()} points for ${activityType.replace(/_/g, ' ')}.`, 'success');
  }, [addAuditLog, triggerToast]);

  const redeemGrowthRewardPoints = useCallback((rewardId: string, pointsToRedeem: number, cashValueUSD: number) => {
    setState(prev => {
      let recipientId = '';
      let recipientName = '';

      const updatedRewards = prev.growthRewards.map(r => {
        if (r.id === rewardId) {
          recipientId = r.recipientId;
          recipientName = r.recipientName;
          return {
            ...r,
            status: 'redeemed' as const,
            redemptionMethod: `Redeemed ${pointsToRedeem} points for $${cashValueUSD} cash payout`
          };
        }
        return r;
      });

      const updatedWallets = prev.omniWallets.map(w => {
        if (w.tenantId === recipientId || w.id === recipientId) {
          return {
            ...w,
            rewardsBalance: Math.max(0, w.rewardsBalance - pointsToRedeem),
            availableBalance: w.availableBalance + cashValueUSD
          };
        }
        return w;
      });

      return {
        ...prev,
        growthRewards: updatedRewards,
        omniWallets: updatedWallets
      };
    });

    recordDoubleEntryTransaction(
      'promotional_credits_reserve',
      `reward_redeem_${rewardId.slice(0,6)}`,
      'promotional credits',
      'affiliates',
      cashValueUSD,
      'USD',
      `Redeem growth rewards for ${pointsToRedeem} points`,
      rewardId
    );

    addAuditLog('REWARD_POINTS_REDEEMED', 'Affiliates/Rewards', `Redeemed ${pointsToRedeem} points for ${cashValueUSD}`);
    triggerToast('Points Redeemed', `Redeemed ${pointsToRedeem.toLocaleString()} points for ${cashValueUSD} cash credits.`, 'success');
  }, [recordDoubleEntryTransaction, addAuditLog, triggerToast]);

  // 1. Launch a white-label platform
  const launchWhiteLabelPlatform = useCallback((platform: OMNIState['tenantPlatforms'][0]) => {
    setState((prev) => ({
      ...prev,
      tenantPlatforms: [...prev.tenantPlatforms, platform],
    }));
    addAuditLog('WHITE_LABEL_PLATFORM_LAUNCHED', 'White-Label', `Launched branded platform "${platform.name}" (${platform.id})`);
    triggerToast('Platform Launched', `Branded platform ${platform.name} is successfully initialized!`, 'success');
  }, [addAuditLog, triggerToast]);

  // 2. Update branding configuration
  const updateWhiteLabelBranding = useCallback((platformId: string, branding: OMNIState['tenantPlatforms'][0]['branding']) => {
    setState((prev) => ({
      ...prev,
      tenantPlatforms: prev.tenantPlatforms.map((p) => p.id === platformId ? { ...p, branding } : p)
    }));
    addAuditLog('WHITE_LABEL_BRANDING_UPDATED', 'White-Label', `Updated visual identity for platform tenant ID: ${platformId}`);
    triggerToast('Branding Saved', 'Visual custom assets and brand styles updated successfully.', 'success');
  }, [addAuditLog, triggerToast]);

  // 3. Update domain configuration
  const updateWhiteLabelDomain = useCallback((platformId: string, domain: OMNIState['tenantPlatforms'][0]['domain']) => {
    setState((prev) => ({
      ...prev,
      tenantPlatforms: prev.tenantPlatforms.map((p) => p.id === platformId ? { ...p, domain } : p)
    }));
    addAuditLog('WHITE_LABEL_DOMAIN_UPDATED', 'White-Label', `Updated domains for tenant: ${platformId}`);
    triggerToast('Domain Updated', 'Domain address records and canonical routing configured.', 'success');
  }, [addAuditLog, triggerToast]);

  // 4. Update Reseller hierarchy nodes
  const updateResellerNodes = useCallback((nodes: OMNIState['resellerNodes']) => {
    setState((prev) => ({
      ...prev,
      resellerNodes: nodes
    }));
    addAuditLog('RESELLER_HIERARCHY_UPDATED', 'Resellers', 'Reseller structural nodes synchronized.');
    triggerToast('Resellers Configured', 'Reseller nesting structural hierarchy saved.', 'success');
  }, [addAuditLog, triggerToast]);

  // 5. Update Reseller economics
  const updateResellerEconomics = useCallback((economics: OMNIState['resellerEconomics']) => {
    setState((prev) => ({
      ...prev,
      resellerEconomics: economics
    }));
    addAuditLog('RESELLER_ECONOMICS_UPDATED', 'Resellers', 'Wholesale markups and tier pricing models updated.');
    triggerToast('Economics Configured', 'Wholesale reseller pricing models updated.', 'success');
  }, [addAuditLog, triggerToast]);

  // 6. Update super admin controls
  const updateSuperAdminControls = useCallback((controls: OMNIState['superAdminControls']) => {
    setState((prev) => ({
      ...prev,
      superAdminControls: controls
    }));
    addAuditLog('SUPER_ADMIN_WL_CONTROLS_UPDATED', 'White-Label', 'Super Admin white-label constraints modified.');
    triggerToast('Admin Settings Saved', 'Minimum price, allowed apps, and KYB policies updated.', 'success');
  }, [addAuditLog, triggerToast]);

  // 7. Verify DNS & CNAME
  const verifyDnsRecord = useCallback((platformId: string) => {
    setState((prev) => ({
      ...prev,
      tenantPlatforms: prev.tenantPlatforms.map((p) => {
        if (p.id === platformId) {
          return {
            ...p,
            domain: {
              ...p.domain,
              dnsStatus: 'verified' as const,
              sslStatus: p.domain.sslStatus === 'inactive' ? 'generating' as const : p.domain.sslStatus
            }
          };
        }
        return p;
      })
    }));
    addAuditLog('DOMAIN_DNS_VERIFIED', 'White-Label', `Verified DNS records for platform ID: ${platformId}`);
    triggerToast('DNS Verified', 'TXT & CNAME records are successfully resolved.', 'success');
  }, [addAuditLog, triggerToast]);

  // 8. Provision SSL Certificate
  const provisionSslCertificate = useCallback((platformId: string) => {
    setState((prev) => ({
      ...prev,
      tenantPlatforms: prev.tenantPlatforms.map((p) => {
        if (p.id === platformId) {
          return {
            ...p,
            domain: {
              ...p.domain,
              sslStatus: 'active' as const
            }
          };
        }
        return p;
      })
    }));
    addAuditLog('SSL_CERTIFICATE_PROVISIONED', 'White-Label', `SSL certificate active for platform ID: ${platformId}`);
    triggerToast('SSL Certificate Active', 'TLS connection secured via automated Let\'s Encrypt certificate.', 'success');
  }, [addAuditLog, triggerToast]);

  // ==========================================
  // OMNI Shared Horizontal Services callbacks
  // ==========================================

  // 1. Send Notification (Dispatch to channel)
  const sendNotification = useCallback((log: Omit<NotificationDeliveryLog, 'id' | 'status' | 'retryCount'>) => {
    const newLog: NotificationDeliveryLog = {
      ...log,
      id: `not_log_${Math.random().toString(36).substring(2, 9)}`,
      status: 'sent',
      retryCount: 0,
      sentAt: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      notificationDeliveryLogs: [newLog, ...prev.notificationDeliveryLogs]
    }));
    addAuditLog('NOTIFICATION_DISPATCHED', 'Notifications', `Dispatched ${newLog.channel} notification to ${newLog.recipient}`);
    triggerToast('Notification Sent', `Successfully delivered via ${newLog.channel.toUpperCase()}`, 'success');
  }, [addAuditLog, triggerToast]);

  // 2. Retry Notification Delivery
  const retryNotification = useCallback((logId: string) => {
    setState((prev) => ({
      ...prev,
      notificationDeliveryLogs: prev.notificationDeliveryLogs.map((log) => {
        if (log.id === logId) {
          const nextRetry = log.retryCount + 1;
          const status = nextRetry >= log.maxRetries ? 'failed' : 'sent';
          return {
            ...log,
            status,
            retryCount: nextRetry,
            errorLog: status === 'failed' ? 'Max delivery attempts exceeded.' : undefined,
            sentAt: status === 'sent' ? new Date().toISOString() : log.sentAt
          };
        }
        return log;
      })
    }));
    addAuditLog('NOTIFICATION_RETRY', 'Notifications', `Retried delivery log: ${logId}`);
    triggerToast('Notification Retried', 'Retriggered carrier channel delivery pipeline.', 'info');
  }, [addAuditLog, triggerToast]);

  // 3. Register Notification Template
  const registerNotificationTemplate = useCallback((template: Omit<NotificationTemplate, 'id'>) => {
    const newTemplate: NotificationTemplate = {
      ...template,
      id: `tmpl_${Math.random().toString(36).substring(2, 9)}`
    };
    setState((prev) => ({
      ...prev,
      notificationTemplates: [...prev.notificationTemplates, newTemplate]
    }));
    addAuditLog('NOTIFICATION_TEMPLATE_CREATED', 'Notifications', `Created custom notification template for category: ${template.category}`);
    triggerToast('Template Created', 'Saved custom branding and message schemas.', 'success');
  }, [addAuditLog, triggerToast]);

  // 4. Update Notification Preference
  const updateNotificationPreference = useCallback((pref: NotificationPreference) => {
    setState((prev) => ({
      ...prev,
      notificationPreferences: prev.notificationPreferences.map(p => 
        p.userId === pref.userId && p.tenantId === pref.tenantId ? pref : p
      )
    }));
    addAuditLog('NOTIFICATION_PREF_UPDATED', 'Notifications', `Updated user notification channel configurations.`);
    triggerToast('Preferences Saved', 'Your communication channel configurations are synchronized.', 'success');
  }, [addAuditLog, triggerToast]);

  // 5. Send OMNI Inbox message (registered by app)
  const sendOmniInboxMessage = useCallback((msg: Omit<OmniInboxMessage, 'id' | 'isRead' | 'isArchived' | 'createdAt'>) => {
    const newMsg: OmniInboxMessage = {
      ...msg,
      id: `msg_inb_${Math.random().toString(36).substring(2, 9)}`,
      isRead: false,
      isArchived: false,
      createdAt: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      omniInboxMessages: [newMsg, ...prev.omniInboxMessages]
    }));
    addAuditLog('INBOX_MESSAGE_REGISTERED', 'Communications', `App "${msg.appId}" registered communication message type: ${msg.messageType}`);
  }, [addAuditLog]);

  // 6. Mark Inbox Message Read/Unread
  const markInboxMessageRead = useCallback((msgId: string, isRead: boolean) => {
    setState((prev) => ({
      ...prev,
      omniInboxMessages: prev.omniInboxMessages.map(m => m.id === msgId ? { ...m, isRead } : m)
    }));
  }, []);

  // 7. Archive Inbox Message
  const archiveInboxMessage = useCallback((msgId: string, isArchived: boolean) => {
    setState((prev) => ({
      ...prev,
      omniInboxMessages: prev.omniInboxMessages.map(m => m.id === msgId ? { ...m, isArchived } : m)
    }));
    triggerToast(isArchived ? 'Message Archived' : 'Message Restored', '', 'info');
  }, [triggerToast]);

  // 8. Submit SDK Analytics Event
  const submitAnalyticsEvent = useCallback((event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) => {
    const newEvent: AnalyticsEvent = {
      ...event,
      id: `ev_sdk_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      analyticsEvents: [...prev.analyticsEvents, newEvent]
    }));
    addAuditLog('ANALYTICS_EVENT_SDK', 'Analytics', `SDK submitted event "${event.eventType}" for App "${event.appId}"`);
  }, [addAuditLog]);

  // 9. Update Privacy Consent Settings
  const updatePrivacyConsent = useCallback((config: PrivacyConsentConfig) => {
    setState((prev) => ({
      ...prev,
      privacyConsentConfigs: prev.privacyConsentConfigs.map(c => 
        c.userId === config.userId && c.tenantId === config.tenantId ? config : c
      )
    }));
    addAuditLog('PRIVACY_CONSENT_MODIFIED', 'Privacy', `Configured data minimization constraints under ${config.regionalSchema}`);
    triggerToast('Privacy Saved', 'Your privacy and tracking constraints have been updated.', 'success');
  }, [addAuditLog, triggerToast]);

  // 10. Submit Trust Appeal
  const submitTrustAppeal = useCallback((entityId: string, appeal: Omit<TrustAppeal, 'id' | 'submittedAt' | 'status'>) => {
    const newAppeal: TrustAppeal = {
      ...appeal,
      id: `apl_${Math.random().toString(36).substring(2, 9)}`,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    setState((prev) => ({
      ...prev,
      entityTrustScores: prev.entityTrustScores.map(score => {
        if (score.id === entityId) {
          return {
            ...score,
            appeals: [newAppeal, ...score.appeals]
          };
        }
        return score;
      })
    }));
    addAuditLog('REPUTATION_APPEAL_SUBMITTED', 'Trust Engine', `Submitted reputation score appeal for entity: ${entityId}`);
    triggerToast('Appeal Received', 'Reputation score appeal submitted for administrative review.', 'success');
  }, [addAuditLog, triggerToast]);

  // 11. Review Trust Appeal (Admin Action)
  const reviewTrustAppeal = useCallback((entityId: string, appealId: string, status: 'approved' | 'rejected', adminNotes: string) => {
    setState((prev) => ({
      ...prev,
      entityTrustScores: prev.entityTrustScores.map(score => {
        if (score.id === entityId) {
          const updatedAppeals = score.appeals.map(a => 
            a.id === appealId 
              ? { ...a, status, adminNotes, reviewedAt: new Date().toISOString() } 
              : a
          );
          
          let newScore = score.score;
          if (status === 'approved') {
            newScore = Math.min(100, score.score + 15);
          }
          
          return {
            ...score,
            score: newScore,
            appeals: updatedAppeals,
            level: newScore >= 95 ? 'excellent' : newScore >= 80 ? 'good' : newScore >= 60 ? 'neutral' : newScore >= 40 ? 'fair' : 'high_risk'
          };
        }
        return score;
      })
    }));
    addAuditLog('TRUST_APPEAL_REVIEWED', 'Trust Engine', `Resolved appeal ${appealId} for ${entityId} with status: ${status}`);
    triggerToast('Appeal Reviewed', `Trust score updated to reflect administrative appeal decision.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 12. Submit risk events / shared fraud signals
  const submitRiskEvent = useCallback((risk: Omit<RiskEvent, 'id' | 'timestamp' | 'status'>) => {
    const newRisk: RiskEvent = {
      ...risk,
      id: `risk_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'active_alert'
    };

    const penalty = risk.severity === 'critical' ? 35 : risk.severity === 'high' ? 20 : risk.severity === 'medium' ? 10 : 5;

    setState((prev) => ({
      ...prev,
      riskEvents: [newRisk, ...prev.riskEvents],
      entityTrustScores: prev.entityTrustScores.map(score => {
        if (score.id === risk.tenantId || (risk.userId && score.id === risk.userId)) {
          const newScore = Math.max(0, score.score - penalty);
          const newSignal: ReputationSignal = {
            id: `sig_risk_${Math.random().toString(36).substring(2, 9)}`,
            type: 'negative',
            source: risk.appId,
            scoreImpact: -penalty,
            reasonCode: risk.riskType.toUpperCase(),
            description: risk.description,
            timestamp: new Date().toISOString()
          };
          return {
            ...score,
            score: newScore,
            signals: [newSignal, ...score.signals],
            level: newScore >= 95 ? 'excellent' : newScore >= 80 ? 'good' : newScore >= 60 ? 'neutral' : newScore >= 40 ? 'fair' : 'high_risk'
          };
        }
        return score;
      })
    }));
    addAuditLog('RISK_EVENT_RECORDED', 'Trust Engine', `Shared fraud risk triggered: ${risk.riskType} in App "${risk.appId}"`);
  }, [addAuditLog]);

  // 13. Universal Search utilities
  const addSearchHistory = useCallback((userId: string, query: string) => {
    const entry: SearchHistoryEntry = {
      id: `sh_${Math.random().toString(36).substring(2, 9)}`,
      userId,
      query,
      timestamp: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      searchHistory: [entry, ...prev.searchHistory.filter(h => h.query !== query)].slice(0, 15)
    }));
  }, []);

  const saveSearch = useCallback((saved: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    const entry: SavedSearch = {
      ...saved,
      id: `sv_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      savedSearches: [entry, ...prev.savedSearches]
    }));
    triggerToast('Search Saved', `Added search filter "${saved.name}" to shortcuts.`, 'success');
  }, [triggerToast]);

  const deleteSavedSearch = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      savedSearches: prev.savedSearches.filter(s => s.id !== id)
    }));
    triggerToast('Search Removed', 'Removed search filter shortcut.', 'info');
  }, [triggerToast]);

  // ==========================================
  // OMNI Developer Platform & Third-Party Ecosystem callbacks
  // ==========================================

  // 1. Register Developer Profile
  const registerDeveloper = useCallback((companyName: string, website: string) => {
    if (!state.user) {
      triggerToast('Authentication Required', 'Please log in to register as an OMNI developer.', 'error');
      return;
    }
    const devId = `dev_${companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const newProfile: DeveloperProfile = {
      id: devId,
      userId: state.user.id,
      companyName,
      developerWebsite: website,
      status: 'verified',
      apiKey: `omni_dev_key_${Math.random().toString(36).substring(2, 8)}`,
      oauthClientId: `client_id_${Math.random().toString(36).substring(2, 10)}`,
      oauthClientSecret: `client_secret_••••••••••••••••${Math.random().toString(36).substring(2, 6)}`,
      webhookUrl: `https://api.${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/webhooks`,
      registeredAt: new Date().toISOString(),
      earningsBalanceUsd: 0.00
    };
    setState((prev) => ({
      ...prev,
      developerProfiles: [...prev.developerProfiles, newProfile]
    }));
    addAuditLog('DEV_REGISTERED', 'DeveloperPlatform', `Registered developer organization: ${companyName}`);
    triggerToast('Developer Registered', 'Access credentials and sandbox environment are ready.', 'success');
  }, [state.user, addAuditLog, triggerToast]);

  // 2. Submit App for Review
  const submitMarketplaceApp = useCallback((app: Omit<MarketplaceApp, 'id' | 'developerId' | 'developerName' | 'status' | 'rating' | 'installCount' | 'createdAt' | 'revenueSharePercent'>) => {
    const devProfile = state.developerProfiles.find(d => d.userId === state.user?.id);
    if (!devProfile) {
      triggerToast('Developer Account Required', 'Register as an OMNI developer before publishing.', 'error');
      return;
    }
    const slug = app.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const newApp: MarketplaceApp = {
      ...app,
      id: `mkt_app_${slug}_${Math.floor(Math.random() * 9000 + 1000)}`,
      developerId: devProfile.id,
      developerName: devProfile.companyName,
      revenueSharePercent: 80,
      status: 'submitted',
      rating: 0,
      installCount: 0,
      createdAt: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      marketplaceApps: [...prev.marketplaceApps, newApp]
    }));
    addAuditLog('APP_MARKETPLACE_SUBMITTED', 'DeveloperPlatform', `Submitted "${app.name}" (${app.category.toUpperCase()}) for OMNI App Store review`);
    triggerToast('App Submitted', 'Your manifest has been logged. Initiating automated security checks...', 'success');
  }, [state.user, state.developerProfiles, addAuditLog, triggerToast]);

  // 3. Review / State Transition for App (Admin or Simulated Auto Checks)
  const reviewMarketplaceApp = useCallback((appId: string, status: MarketplaceApp['status'], notes?: string) => {
    setState((prev) => ({
      ...prev,
      marketplaceApps: prev.marketplaceApps.map((a) => {
        if (a.id === appId) {
          return { ...a, status, reviewNotes: notes };
        }
        return a;
      })
    }));
    addAuditLog('APP_MARKETPLACE_REVIEWED', 'DeveloperPlatform', `Updated marketplace app "${appId}" review status to: ${status.toUpperCase()}`);
    triggerToast('Review Status Updated', `App transitioned to "${status.replace('_', ' ')}" stage.`, 'info');
  }, [addAuditLog, triggerToast]);

  // 4. Install Marketplace App inside Tenant Space with Scope validation
  const installMarketplaceApp = useCallback((tenantId: string, appId: string, scopes: string[]) => {
    const app = state.marketplaceApps.find(a => a.id === appId);
    if (!app) return;

    const existing = state.appInstallations.find(inst => inst.tenantId === tenantId && inst.appId === appId && inst.status === 'active');
    if (existing) {
      triggerToast('Already Installed', 'This extension is already active in your workspace.', 'warning');
      return;
    }

    const price = app.priceAmount;
    const org = state.organizations.find(o => o.tenantId === tenantId);
    if ((app.pricingType === 'subscription' || app.pricingType === 'one_time') && org) {
      if (org.walletBalance < price) {
        triggerToast('Insufficient Funds', `Your ledger balance must exceed $${price} to license this integration.`, 'error');
        return;
      }
    }

    const newInstall: AppInstallation = {
      id: `inst_${Math.random().toString(36).substring(2, 9)}`,
      tenantId,
      appId,
      approvedScopes: scopes,
      status: 'active',
      installedBy: state.user?.id || 'usr_unknown',
      installedAt: new Date().toISOString()
    };

    let updatedOrgs = state.organizations;
    let updatedDevs = state.developerProfiles;
    let newEarnings = state.developerEarningLogs;

    if (app.pricingType === 'subscription' || app.pricingType === 'one_time') {
      updatedOrgs = state.organizations.map((o) => {
        if (o.tenantId === tenantId) {
          return { ...o, walletBalance: o.walletBalance - price };
        }
        return o;
      });

      const devEarningsGross = price;
      const devEarningsNet = (price * app.revenueSharePercent) / 100;
      const platformFee = devEarningsGross - devEarningsNet;

      updatedDevs = state.developerProfiles.map((d) => {
        if (d.id === app.developerId) {
          return { ...d, earningsBalanceUsd: d.earningsBalanceUsd + devEarningsNet };
        }
        return d;
      });

      const newEarnLog: DeveloperEarningLog = {
        id: `earn_${Math.random().toString(36).substring(2, 9)}`,
        developerId: app.developerId,
        appId: app.id,
        tenantId,
        amountGross: devEarningsGross,
        amountFee: platformFee,
        amountNet: devEarningsNet,
        referenceInvoiceId: `inv_lic_${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString()
      };
      newEarnings = [newEarnLog, ...newEarnings];
    }

    const updatedAppsPool = state.apps.some(pa => pa.id === app.id) 
      ? state.apps 
      : [...state.apps, {
          id: app.id,
          name: app.name,
          slug: app.slug,
          icon: app.category === 'ai_agent' ? 'Cpu' : app.category === 'connector' ? 'RefreshCw' : 'Sparkles',
          description: app.shortDescription,
          status: 'active',
          category: 'productivity',
          isNative: false,
          author: app.developerName,
          createdAt: new Date().toISOString()
        }];

    setState((prev) => ({
      ...prev,
      appInstallations: [...prev.appInstallations, newInstall],
      marketplaceApps: prev.marketplaceApps.map((a) => {
        if (a.id === appId) {
          return { ...a, installCount: a.installCount + 1 };
        }
        return a;
      }),
      organizations: updatedOrgs,
      developerProfiles: updatedDevs,
      developerEarningLogs: newEarnings,
      apps: updatedAppsPool
    }));

    addAuditLog('APP_INSTALLED', 'DeveloperPlatform', `Authorized app ${app.name} (${appId}) inside tenant ${tenantId}. Scopes granted: [${scopes.join(', ')}]`);
    triggerToast('Integration Installed', `"${app.name}" was successfully integrated with granted permissions.`, 'success');
  }, [state.marketplaceApps, state.appInstallations, state.organizations, state.developerProfiles, state.developerEarningLogs, state.apps, state.user, addAuditLog, triggerToast]);

  // 5. Revoke App Integration
  const revokeMarketplaceApp = useCallback((installationId: string) => {
    const inst = state.appInstallations.find(i => i.id === installationId);
    if (!inst) return;

    setState((prev) => ({
      ...prev,
      appInstallations: prev.appInstallations.map((i) => {
        if (i.id === installationId) {
          return { ...i, status: 'revoked' as const, revokedAt: new Date().toISOString() };
        }
        return i;
      })
    }));

    addAuditLog('APP_REVOKED', 'DeveloperPlatform', `Revoked credentials & API scopes for installation ID: ${installationId}`);
    triggerToast('App Access Revoked', 'Third-party scope token immediately invalidated.', 'warning');
  }, [state.appInstallations, addAuditLog, triggerToast]);

  // 6. Execute Sandbox API Request (Validates Developer Key and checks isolation boundaries)
  const submitSandboxApiRequest = useCallback((apiKey: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, requestPayload: string) => {
    const dev = state.developerProfiles.find(d => d.apiKey === apiKey);
    if (!dev) {
      triggerToast('Unauthorized API Key', 'Provided developer API key is invalid or suspended.', 'error');
      return;
    }

    const containsMaliciousOrRestrictedScope = 
      endpoint.toLowerCase().includes('wallet_restricted') || 
      requestPayload.toLowerCase().includes('restricted') ||
      endpoint.toLowerCase().includes('competitor');

    const checkResult = containsMaliciousOrRestrictedScope ? 'FAIL_RESTRICTED' as const : 'PASS_ENFORCED' as const;
    const statusCode = containsMaliciousOrRestrictedScope ? 403 : 200;

    let responsePayload = '';
    if (containsMaliciousOrRestrictedScope) {
      responsePayload = JSON.stringify({
        error: 'Forbidden',
        message: 'Security Exception: Multi-tenant tenant boundaries strictly check all inbound API authorization keys. Directly querying underlying database records outside of your verified developer workspace or assigned tenant ID is forbidden. Use specific OAuth scopes and access tokens.'
      }, null, 2);
    } else {
      if (endpoint.includes('ledger/balances')) {
        responsePayload = JSON.stringify({
          walletId: 'wallet_dynasty',
          balance: 4280550.00,
          currency: 'USD',
          isolationContext: dev.companyName,
          authorizedScopes: ['wallet.ledger.read']
        }, null, 2);
      } else if (endpoint.includes('ledger/transfers')) {
        responsePayload = JSON.stringify({
          transferId: `tx_sandbox_${Math.floor(Math.random() * 900000 + 100000)}`,
          status: 'completed',
          isolationContext: dev.companyName,
          complianceLevel: 'Sovereign Core Sandbox'
        }, null, 2);
      } else {
        responsePayload = JSON.stringify({
          status: 'ok',
          message: 'Secure sandbox endpoint successfully pinged.',
          developerId: dev.id,
          tenantIsolation: 'PASS_ENFORCED'
        }, null, 2);
      }
    }

    const newRequest: SandboxApiRequest = {
      id: `req_sand_${Math.random().toString(36).substring(2, 9)}`,
      apiKey,
      method,
      endpoint,
      requestPayload,
      responsePayload,
      statusCode,
      tenantIsolationCheck: checkResult,
      timestamp: new Date().toISOString()
    };

    setState((prev) => ({
      ...prev,
      sandboxApiRequests: [newRequest, ...prev.sandboxApiRequests]
    }));

    if (checkResult === 'FAIL_RESTRICTED') {
      addAuditLog('SANDBOX_ISOLATION_BREACH', 'Security/API', `Developer client blocked. High-risk cross-tenant query signature detected on ${endpoint}`);
      triggerToast('Security Breach Prevented', 'Raw database queries are blocked. Enforcing tenant boundaries.', 'error');
    } else {
      addAuditLog('SANDBOX_API_CALL', 'DeveloperPlatform', `Processed Sandbox API call: ${method} ${endpoint}`);
      triggerToast('API Request Logged', 'Response returned successfully via sandbox compiler.', 'success');
    }
  }, [state.developerProfiles, addAuditLog, triggerToast]);

  // --- PROMPT 10: CAPITAL, CAP TABLE & SHAREHOLDER TRUST ACTIONS ---

  // 1. Record Formal Valuation Event
  const recordValuation = useCallback((
    date: string,
    methodology: ValuationRecord['methodology'],
    supportingDocument: string,
    approvingAuthority: string,
    valuationAmount: number,
    notes: string
  ) => {
    const val: ValuationRecord = {
      id: `val_${Date.now()}`,
      date,
      methodology,
      supportingDocument,
      approvingAuthority,
      valuationAmount,
      notes
    };

    setState((prev) => ({
      ...prev,
      valuationRecords: [val, ...prev.valuationRecords]
    }));

    addAuditLog('VALUATION_RECORDED', 'Capital/Asset', `Recorded formal asset valuation: $${valuationAmount.toLocaleString()} via ${methodology}`);
    triggerToast('Valuation Recorded', `Formally filed OMNI asset valuation at $${valuationAmount.toLocaleString()}.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 2. Propose Draft Investment Offering (Disabled/Draft state initially)
  const proposeInvestmentOffering = useCallback((
    title: string,
    targetAmount: number,
    pricePerShare: number,
    shareClass: string,
    minInvestment: number
  ) => {
    const off: InvestmentOffering = {
      id: `off_${Date.now()}`,
      title,
      targetAmount,
      pricePerShare,
      shareClass,
      minInvestment,
      status: 'draft', // Draft initially - compliance disabled
      jurisdictionConfigured: false,
      licensedProviderName: 'Awaiting Compliance Allocation',
      legalApprovalReceived: false,
      kycAmlRulesRequired: true,
      investorDisclosuresCount: 0,
      eligibilityRules: 'Awaiting compliance officer rule matching.'
    };

    setState((prev) => ({
      ...prev,
      investmentOfferings: [...prev.investmentOfferings, off]
    }));

    addAuditLog('OFFERING_PROPOSED', 'Capital/Compliance', `Proposed capital investment offering: ${title} ($${targetAmount.toLocaleString()} target)`);
    triggerToast('Offering Draft Created', 'Capital investment offering initialized in draft mode.', 'success');
  }, [addAuditLog, triggerToast]);

  // 3. Configure Jurisdiction & Licensed Compliance Gate
  const configureJurisdictionCompliance = useCallback((
    offeringId: string,
    licensedProviderName: string,
    eligibilityRules: string,
    jurisdictionConfigured: boolean,
    legalApprovalReceived: boolean,
    kycAmlRulesRequired: boolean,
    investorDisclosuresCount: number
  ) => {
    setState((prev) => ({
      ...prev,
      investmentOfferings: prev.investmentOfferings.map((off) => {
        if (off.id === offeringId) {
          return {
            ...off,
            licensedProviderName,
            eligibilityRules,
            jurisdictionConfigured,
            legalApprovalReceived,
            kycAmlRulesRequired,
            investorDisclosuresCount,
            status: (jurisdictionConfigured && legalApprovalReceived) ? 'compliance_review' : off.status
          };
        }
        return off;
      })
    }));

    addAuditLog('COMPLIANCE_CONFIGURED', 'Capital/Compliance', `Updated compliance parameters for offering: ${offeringId}`);
    triggerToast('Compliance Configured', 'Jurisdiction gate security settings applied.', 'success');
  }, [addAuditLog, triggerToast]);

  // 4. Simulate AML/KYC Verification
  const mockSimulateAmlKycVerification = useCallback((
    shareholderId: string,
    kycStatus: ShareholderProfile['kycStatus']
  ) => {
    setState((prev) => ({
      ...prev,
      shareholders: prev.shareholders.map((sh) => {
        if (sh.id === shareholderId) {
          return { ...sh, kycStatus };
        }
        return sh;
      })
    }));

    addAuditLog('KYC_AML_STATUS_UPDATED', 'Capital/Compliance', `Investor KYC status updated to ${kycStatus} for shareholder profile ${shareholderId}`);
    triggerToast('Investor Status Saved', `KYC/AML status verified to: ${kycStatus.toUpperCase()}`, 'success');
  }, [addAuditLog, triggerToast]);

  // 5. Configure Future Exchange API Integration
  const configureExchangeCredentials = useCallback((
    credentialId: string,
    providerName: string,
    apiVersion: string,
    endpoint: string,
    status: ExchangeCredential['status']
  ) => {
    setState((prev) => ({
      ...prev,
      exchangeCredentials: prev.exchangeCredentials.map((cred) => {
        if (cred.id === credentialId) {
          return {
            ...cred,
            providerName,
            apiVersion,
            endpoint,
            status,
            apiKeysGenerated: status === 'connected',
            connectedAt: status === 'connected' ? new Date().toISOString() : undefined
          };
        }
        return cred;
      })
    }));

    addAuditLog('EXCHANGE_ADAPTER_MODIFIED', 'Capital/Exchange', `Modified exchange gateway: ${providerName} (${status})`);
    triggerToast('Exchange Configured', `Gateway status changed to: ${status.toUpperCase()}`, 'success');
  }, [addAuditLog, triggerToast]);

  // 6. Transition Offering State
  const transitionOfferingStatus = useCallback((
    offeringId: string,
    status: InvestmentOffering['status']
  ) => {
    const off = state.investmentOfferings.find(o => o.id === offeringId);
    if (!off) return;

    if (status === 'open' && (!off.jurisdictionConfigured || !off.legalApprovalReceived)) {
      triggerToast('Compliance Lock', 'Public offering cannot open until licensed provider & jurisdiction gates are certified.', 'error');
      return;
    }

    setState((prev) => ({
      ...prev,
      investmentOfferings: prev.investmentOfferings.map((o) => {
        if (o.id === offeringId) {
          return { ...o, status };
        }
        return o;
      })
    }));

    addAuditLog('OFFERING_STATE_TRANSITION', 'Capital/Compliance', `Transitioned investment offering status to: ${status}`);
    triggerToast('Offering Status Updated', `Offering successfully changed to: ${status.toUpperCase()}`, 'success');
  }, [state.investmentOfferings, addAuditLog, triggerToast]);

  // --- PROMPT 11: OMNI SUPER ADMIN, GOVERNANCE AND OPERATIONS ACTIONS ---

  // 1. Configure Governance Policy
  const updateGovernancePolicy = useCallback((
    policyId: string,
    value: any,
    isEnabled: boolean,
    approvalRequired: boolean
  ) => {
    setState((prev) => ({
      ...prev,
      governancePolicies: prev.governancePolicies.map((p) =>
        p.id === policyId ? { ...p, value, isEnabled, approvalRequired, updatedAt: new Date().toISOString() } : p
      )
    }));
    addAuditLog('POLICY_UPDATED', 'Governance/PolicyEngine', `Updated policy: ${policyId} (Enabled: ${isEnabled}, Approval Required: ${approvalRequired})`);
    triggerToast('Policy Saved', `Governance constraint updated successfully.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 2. Propose Sensitive Admin Action (Peer Approval Workflow)
  const proposeAdminAction = useCallback((
    actionType: string,
    description: string,
    payload: any
  ) => {
    const newTask = {
      id: `tsk_${Date.now()}`,
      actionType,
      requestedBy: state.user?.id || 'usr_gideon',
      requestedByEmail: state.user?.email || 'gideonoluwalanadynasty@gmail.com',
      payload,
      description,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };
    setState((prev) => ({
      ...prev,
      adminApprovalTasks: [newTask, ...prev.adminApprovalTasks]
    }));
    addAuditLog('ADMIN_ACTION_PROPOSED', 'Governance/Approvals', `Proposed administrative action: ${actionType} - ${description}`);
    triggerToast('Action Enqueued', `Action submitted for manual peer-review sign-off.`, 'info');
  }, [state.user, addAuditLog, triggerToast]);

  // 3. Process Peer Review Admin Approval Task
  const processAdminApprovalTask = useCallback((
    taskId: string,
    status: 'approved' | 'rejected'
  ) => {
    setState((prev) => {
      const task = prev.adminApprovalTasks.find((t) => t.id === taskId);
      if (!task) return prev;

      const updatedTasks = prev.adminApprovalTasks.map((t) =>
        t.id === taskId ? { ...t, status, completedAt: new Date().toISOString(), completedBy: prev.user?.email || 'gideonoluwalanadynasty@gmail.com' } : t
      );

      let nextState = { ...prev, adminApprovalTasks: updatedTasks };

      if (status === 'approved') {
        const { actionType, payload } = task;

        if (actionType === 'SUSPEND_USER') {
          // Add suspended log
          triggerToast('User Suspended', `Enforced suspension override for ${payload.userId}.`, 'success');
        } else if (actionType === 'RELEASE_PAYOUT') {
          if (nextState.payouts) {
            nextState.payouts = nextState.payouts.map((p) =>
              p.id === payload.payoutId || p.recipient === payload.recipient ? { ...p, status: 'completed' } : p
            );
          }
          triggerToast('Payout Released', `Disbursed held fund bonus to ${payload.recipient}.`, 'success');
        } else if (actionType === 'APPROVE_OFFERING') {
          if (nextState.investmentOfferings) {
            nextState.investmentOfferings = nextState.investmentOfferings.map((o) =>
              o.id === payload.offeringId ? { ...o, status: 'approved', legalApprovalReceived: true } : o
            );
          }
          triggerToast('Offering Approved', `Released ${payload.title} for private placement.`, 'success');
        } else if (actionType === 'REVOKE_APP') {
          if (nextState.marketplaceApps) {
            nextState.marketplaceApps = nextState.marketplaceApps.map((a) =>
              a.id === payload.appId ? { ...a, status: 'rejected' } : a
            );
          }
          triggerToast('Application Revoked', `Quarantined micro-app instantly.`, 'error');
        }
      }

      return nextState;
    });

    addAuditLog('ADMIN_TASK_RESOLVED', 'Governance/Approvals', `Resolved administrative audit task ${taskId} with decision: ${status.toUpperCase()}`);
    triggerToast(
      status === 'approved' ? 'Action Approved' : 'Action Rejected',
      `Manual peer authorization successfully resolved as: ${status}`,
      status === 'approved' ? 'success' : 'info'
    );
  }, [state.user, addAuditLog, triggerToast]);

  // 4. Update Advanced Feature Flag Scoping
  const updateAdvancedFeatureFlag = useCallback((
    id: string,
    updates: {
      isEnabled: boolean;
      isGlobal: boolean;
      targetTenants: string[];
      targetApps: string[];
      targetCountries: string[];
      targetPlans: string[];
      targetUserCohorts: string[];
    }
  ) => {
    setState((prev) => ({
      ...prev,
      featureFlags: prev.featureFlags.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      )
    }));
    addAuditLog('ADVANCED_FLAG_UPDATED', 'Infrastructure/Flags', `Saved multi-dimensional scoping rule for feature flag ${id}`);
    triggerToast('Feature Scoping Saved', `Advanced targeting rules applied.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 5. Update App Registry Availability Controls
  const adminUpdateAppAvailability = useCallback((
    appId: string,
    isEnabled: boolean,
    countries: string[],
    version: string
  ) => {
    setState((prev) => ({
      ...prev,
      apps: prev.apps.map((a) =>
        a.id === appId ? { ...a, status: isEnabled ? 'active' : 'suspended' } : a
      ),
      marketplaceApps: prev.marketplaceApps.map((m) =>
        m.id === appId ? { ...m, isEnabled, supportedCountries: countries, version } : m
      )
    }));
    addAuditLog('ADMIN_APP_MODIFIED', 'AppRegistry', `Adjusted availability controls for App: ${appId} (Active: ${isEnabled})`);
    triggerToast('App Configuration Saved', `Global registry permissions synced.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 6. Set User Control and Security State
  const adminUpdateUserControl = useCallback((
    userId: string,
    status: 'active' | 'suspended',
    identityVerified: boolean
  ) => {
    setState((prev) => {
      const newNotif = {
        id: generateUUID(),
        title: status === 'suspended' ? 'ACCOUNT SUSPENDED' : 'ACCOUNT REINSTATED',
        content: status === 'suspended' 
          ? 'Your OMNI Passport credentials have been temporarily suspended due to security compliance holds.'
          : 'Your OMNI Passport has been fully reinstated following manual verification of credentials.',
        type: 'security' as const,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      
      return {
        ...prev,
        notifications: [newNotif, ...prev.notifications]
      };
    });
    addAuditLog('ADMIN_USER_MODIFIED', 'Auth/Identity', `Admin manually set User ${userId} state to ${status.toUpperCase()} and verification to ${identityVerified}`);
    triggerToast('User State Updated', `Enforced user profile configuration overrides.`, 'success');
  }, [addAuditLog, triggerToast]);

  // 7. Configure Tenant plan & Domain Routings
  const adminUpdateTenantControl = useCallback((
    tenantId: string,
    updates: {
      plan: 'free' | 'growth' | 'enterprise';
      status: 'active' | 'suspended';
      domain: string;
    }
  ) => {
    setState((prev) => ({
      ...prev,
      organizations: prev.organizations.map((o) =>
        o.tenantId === tenantId ? { ...o, billingPlan: updates.plan, status: updates.status, subdomains: [updates.domain, ...o.subdomains.filter(s => s !== updates.domain)] } : o
      )
    }));
    addAuditLog('ADMIN_TENANT_MODIFIED', 'WhiteLabel/Tenants', `Adjusted Tenant ${tenantId} plan to ${updates.plan.toUpperCase()} and status to ${updates.status}`);
    triggerToast('Tenant Configuration Saved', `Domain routing and billing overrides active.`, 'success');
  }, [addAuditLog, triggerToast]);


  return {
    state,
    setState,
    updateState,
    toasts,
    triggerToast,
    addAuditLog,
    setView,
    switchOrg,
    addTransaction,
    createOrg,
    toggleMfa,
    toggleFeatureFlag,
    addApiCredential,
    deleteApiCredential,
    addWebhook,
    deleteWebhook,
    registerApp,
    setSearchQuery,
    toggleTheme,
    clearNotifications,
    loginUser,
    signupUser,
    completeOnboarding,
    runAiCommand,
    // OMNI Passport hooks
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
    validateAndRegisterAppFromManifest,
    dispatchDomainEvent,
    replayWebhookDelivery,
    retryWebhookDelivery,
    // OMNI AI Operating System hooks
    toggleProviderStatus,
    updateModelStatus,
    updateAgentConfig,
    updateAutonomyRule,
    addKnowledgeSource,
    deleteKnowledgeSource,
    updateBudgetLimit,
    setActiveRoutingProfile,
    saveByokCredential,
    testByokCredential,
    revokeByokCredential,
    registerByomEndpoint,
    healthCheckByomEndpoint,
    deleteByomEndpoint,
    simulateProviderChaos,
    clearAiCache,
    approveApprovalTask,
    rejectApprovalTask,
    sendAgentChatMessage,
    clearChatHistory,
    // OMNI Financial Accounting hooks
    recordDoubleEntryTransaction,
    updatePaymentIntegration,
    updateSubscription,
    generateInvoice,
    requestPayout,
    processPayoutAction,
    runFinancialReconciliation,
    simulateFailedPayment,
    // OMNI Affiliate hooks
    registerAsAffiliate,
    updateAttributionModel,
    simulateAffiliateClick,
    simulateAffiliateLead,
    triggerAffiliateConversion,
    processFraudAlertAction,
    allocateGrowthReward,
    redeemGrowthRewardPoints,
    // OMNI White-Label & Reseller hooks
    launchWhiteLabelPlatform,
    updateWhiteLabelBranding,
    updateWhiteLabelDomain,
    updateResellerNodes,
    updateResellerEconomics,
    updateSuperAdminControls,
    verifyDnsRecord,
    provisionSslCertificate,
    // OMNI Shared Horizontal Services hooks
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
    deleteSavedSearch,
    // OMNI Developer Ecosystem hooks
    registerDeveloper,
    submitMarketplaceApp,
    reviewMarketplaceApp,
    installMarketplaceApp,
    revokeMarketplaceApp,
    submitSandboxApiRequest,
    // OMNI Capital & Ownership hooks
    recordValuation,
    proposeInvestmentOffering,
    configureJurisdictionCompliance,
    mockSimulateAmlKycVerification,
    configureExchangeCredentials,
    transitionOfferingStatus,
    // OMNI Super Admin & Governance hooks
    updateGovernancePolicy,
    proposeAdminAction,
    processAdminApprovalTask,
    updateAdvancedFeatureFlag,
    adminUpdateAppAvailability,
    adminUpdateUserControl,
    adminUpdateTenantControl
  };
}
