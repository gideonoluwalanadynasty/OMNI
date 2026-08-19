import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Shield,
  Wifi,
  Filter,
  Cookie,
  Globe,
  Fingerprint,
  Activity,
  Sliders,
  CheckCircle2,
  XCircle,
  RefreshCw,
  LayoutDashboard,
  ArrowLeft
} from 'lucide-react';
import {
  OmniVpnLiveSession,
  OmniVpnServerNode,
  OmniVpnProviderAdapterInfo,
  OmniTrackerItem,
  OmniAdBlockRule,
  OmniPublisherMonetizationConfig,
  OmniCookieItem,
  OmniCookiePolicy,
  OmniSecureDnsProvider,
  OmniAntiFingerprintConfig,
  OmniSitePermission,
  OmniConnectedDevice,
  OmniPrivacyScoreBreakdown
} from '../../../types';
import { omniSecureVpnService } from '../../../sdk/browser-services/OmniSecureVpnService';
import { omniPrivacyShieldService } from '../../../sdk/browser-services/OmniPrivacyShieldService';
import { OmniPrivacyDashboardView } from './OmniPrivacyDashboardView';
import { OmniVpnPlatformView } from './OmniVpnPlatformView';
import { OmniTrackerAdBlockView } from './OmniTrackerAdBlockView';
import { OmniCookieManagerView } from './OmniCookieManagerView';
import { OmniSecureDnsView } from './OmniSecureDnsView';
import { OmniAntiFingerprintView } from './OmniAntiFingerprintView';

export type OmniSecureTab =
  | 'dashboard'
  | 'vpn'
  | 'trackers'
  | 'cookies'
  | 'dns'
  | 'fingerprint';

interface OmniSecurePlatformProps {
  initialTab?: OmniSecureTab;
  onClose?: () => void;
}

export const OmniSecurePlatform: React.FC<OmniSecurePlatformProps> = ({
  initialTab = 'dashboard',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<OmniSecureTab>(initialTab);

  // VPN State
  const [vpnSession, setVpnSession] = useState<OmniVpnLiveSession>(omniSecureVpnService.getLiveSession());
  const [servers, setServers] = useState<OmniVpnServerNode[]>([]);
  const [adapters, setAdapters] = useState<OmniVpnProviderAdapterInfo[]>(omniSecureVpnService.getAdapters());
  const [activeAdapterId, setActiveAdapterId] = useState<string>(omniSecureVpnService.getActiveAdapter().id);

  // Privacy Shield State
  const [trackers, setTrackers] = useState<OmniTrackerItem[]>(omniPrivacyShieldService.getTrackers());
  const [adBlockRules, setAdBlockRules] = useState<OmniAdBlockRule[]>(omniPrivacyShieldService.getAdBlockRules());
  const [monetizationConfig, setMonetizationConfig] = useState<OmniPublisherMonetizationConfig>(
    omniPrivacyShieldService.getMonetizationConfig()
  );
  const [cookies, setCookies] = useState<OmniCookieItem[]>(omniPrivacyShieldService.getCookies());
  const [cookiePolicy, setCookiePolicy] = useState<OmniCookiePolicy>(omniPrivacyShieldService.getCookiePolicy());
  const [dnsProviders, setDnsProviders] = useState<OmniSecureDnsProvider[]>(
    omniPrivacyShieldService.getDnsProviders()
  );
  const [selectedDnsProvider, setSelectedDnsProvider] = useState<OmniSecureDnsProvider>(
    omniPrivacyShieldService.getSelectedDnsProvider()
  );
  const [antiFingerprint, setAntiFingerprint] = useState<OmniAntiFingerprintConfig>(
    omniPrivacyShieldService.getAntiFingerprintConfig()
  );
  const [sitePermissions, setSitePermissions] = useState<OmniSitePermission[]>(
    omniPrivacyShieldService.getSitePermissions()
  );
  const [connectedDevices, setConnectedDevices] = useState<OmniConnectedDevice[]>(
    omniPrivacyShieldService.getConnectedDevices()
  );

  // Subscribe to VPN telemetry
  useEffect(() => {
    const unsub = omniSecureVpnService.subscribe(newSession => {
      setVpnSession(newSession);
    });
    omniSecureVpnService.getAllServers().then(s => setServers(s));
    return unsub;
  }, []);

  // Compute dynamic score
  const isVpnConnected = vpnSession.status === 'connected';
  const privacyScore = omniPrivacyShieldService.calculatePrivacyScore(isVpnConnected);

  // Handlers for VPN
  const handleConnect = async (server?: OmniVpnServerNode) => {
    await omniSecureVpnService.connect(server);
  };

  const handleDisconnect = async () => {
    await omniSecureVpnService.disconnect();
  };

  const handleSelectAdapter = (adapterId: string) => {
    omniSecureVpnService.setActiveAdapter(adapterId);
    setActiveAdapterId(adapterId);
  };

  const handleToggleKillSwitch = () => {
    omniSecureVpnService.toggleKillSwitch();
  };

  const handleToggleSplitTunneling = () => {
    omniSecureVpnService.toggleSplitTunneling();
  };

  const handleUpgradeTier = (tier: 'free' | 'pro' | 'enterprise') => {
    omniSecureVpnService.upgradeSubscriptionTier(tier);
  };

  // Handlers for AdBlock & Trackers
  const handleToggleRule = (ruleId: string) => {
    omniPrivacyShieldService.toggleRule(ruleId);
    setAdBlockRules(omniPrivacyShieldService.getAdBlockRules());
  };

  const handleAddCustomRule = (name: string, ruleText: string, targetDomains: string[]) => {
    omniPrivacyShieldService.addCustomRule(name, ruleText, targetDomains);
    setAdBlockRules(omniPrivacyShieldService.getAdBlockRules());
  };

  const handleDeleteRule = (ruleId: string) => {
    omniPrivacyShieldService.deleteCustomRule(ruleId);
    setAdBlockRules(omniPrivacyShieldService.getAdBlockRules());
  };

  const handleUpdateMonetization = (config: Partial<OmniPublisherMonetizationConfig>) => {
    omniPrivacyShieldService.updateMonetizationConfig(config);
    setMonetizationConfig(omniPrivacyShieldService.getMonetizationConfig());
  };

  const handleTogglePublisherAllowlist = (domain: string) => {
    omniPrivacyShieldService.togglePublisherAllowlist(domain);
    setMonetizationConfig(omniPrivacyShieldService.getMonetizationConfig());
  };

  // Handlers for Cookies
  const handleUpdateCookiePolicy = (policy: Partial<OmniCookiePolicy>) => {
    omniPrivacyShieldService.updateCookiePolicy(policy);
    setCookiePolicy(omniPrivacyShieldService.getCookiePolicy());
  };

  const handleClearCookie = (cookieId: string) => {
    omniPrivacyShieldService.clearCookie(cookieId);
    setCookies(omniPrivacyShieldService.getCookies());
  };

  const handleClearDomainCookies = (domain: string) => {
    omniPrivacyShieldService.clearCookiesForDomain(domain);
    setCookies(omniPrivacyShieldService.getCookies());
  };

  const handleClearAllThirdParty = () => {
    omniPrivacyShieldService.clearAllThirdPartyCookies();
    setCookies(omniPrivacyShieldService.getCookies());
  };

  // Handlers for DNS
  const handleSelectDnsProvider = (providerId: string) => {
    omniPrivacyShieldService.selectDnsProvider(providerId);
    setSelectedDnsProvider(omniPrivacyShieldService.getSelectedDnsProvider());
  };

  const handleAddCustomDns = (name: string, dohUrl: string, dotServer: string) => {
    omniPrivacyShieldService.addCustomDohProvider(name, dohUrl, dotServer);
    setDnsProviders(omniPrivacyShieldService.getDnsProviders());
    setSelectedDnsProvider(omniPrivacyShieldService.getSelectedDnsProvider());
  };

  // Handlers for AntiFingerprint
  const handleUpdateAntiFingerprint = (config: Partial<OmniAntiFingerprintConfig>) => {
    omniPrivacyShieldService.updateAntiFingerprintConfig(config);
    setAntiFingerprint(omniPrivacyShieldService.getAntiFingerprintConfig());
  };

  // Handlers for Permissions
  const handleUpdatePermission = (
    domain: string,
    perm: OmniSitePermission['permission'],
    status: OmniSitePermission['status']
  ) => {
    omniPrivacyShieldService.setSitePermission(domain, perm, status);
    setSitePermissions(omniPrivacyShieldService.getSitePermissions());
  };

  const handleRevokePermission = (
    domain: string,
    perm: OmniSitePermission['permission']
  ) => {
    omniPrivacyShieldService.revokePermission(domain, perm);
    setSitePermissions(omniPrivacyShieldService.getSitePermissions());
  };

  const handleRevokeDevice = (deviceId: string) => {
    omniPrivacyShieldService.revokeDeviceSession(deviceId);
    setConnectedDevices(omniPrivacyShieldService.getConnectedDevices());
  };

  // 1-Click Fix Recommendation Dispatcher
  const handleFixRecommendation = (actionType: string) => {
    switch (actionType) {
      case 'connect_vpn':
        handleConnect();
        break;
      case 'block_third_party_cookies':
        handleUpdateCookiePolicy({ blockThirdPartyCookies: true });
        break;
      case 'enable_canvas_noise':
        handleUpdateAntiFingerprint({ canvasNoiseInjection: true });
        break;
      case 'enable_auto_consent':
        handleUpdateCookiePolicy({ autoRejectConsentBanners: true });
        break;
      case 'review_settings':
        setActiveTab('dashboard');
        break;
    }
  };

  const tabs: { id: OmniSecureTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Privacy Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'vpn', label: 'VPN Platform', icon: <Wifi className="w-4 h-4" /> },
    { id: 'trackers', label: 'Trackers & Ads', icon: <Filter className="w-4 h-4" /> },
    { id: 'cookies', label: 'Cookie Manager', icon: <Cookie className="w-4 h-4" /> },
    { id: 'dns', label: 'Secure DNS', icon: <Globe className="w-4 h-4" /> },
    { id: 'fingerprint', label: 'Anti-Fingerprint', icon: <Fingerprint className="w-4 h-4" /> }
  ];

  return (
    <div id="omni-secure-platform-root" className="min-h-full bg-stone-950 text-stone-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Main Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
              title="Back to Browser"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 text-indigo-400 shadow-lg shadow-indigo-950/50">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-stone-100">OMNI Secure</h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
                Privacy Enclave
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Provider-neutral cryptographic tunneling, tracker deflection, and entropy minimization
            </p>
          </div>
        </div>

        {/* Quick Connection Pill */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('vpn')}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              isVpnConnected
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                : 'bg-stone-900 border-stone-800 text-stone-400'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isVpnConnected ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`}
            />
            <span>{isVpnConnected ? `VPN Active (${vpnSession.activeServer?.city})` : 'VPN Disconnected'}</span>
          </div>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="px-3.5 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono font-bold text-stone-200 cursor-pointer flex items-center gap-1.5"
          >
            <span className="text-stone-400">Privacy Score:</span>
            <span className="text-indigo-400">{privacyScore.totalScore}/100</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-stone-900/80 border border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Views */}
      <div className="pt-2">
        {activeTab === 'dashboard' && (
          <OmniPrivacyDashboardView
            scoreBreakdown={privacyScore}
            sitePermissions={sitePermissions}
            connectedDevices={connectedDevices}
            vpnSession={vpnSession}
            onFixRecommendation={handleFixRecommendation}
            onUpdatePermission={handleUpdatePermission}
            onRevokePermission={handleRevokePermission}
            onRevokeDevice={handleRevokeDevice}
            onNavigateTab={tabId => setActiveTab(tabId as OmniSecureTab)}
          />
        )}

        {activeTab === 'vpn' && (
          <OmniVpnPlatformView
            vpnSession={vpnSession}
            servers={servers}
            adapters={adapters}
            activeAdapterId={activeAdapterId}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onSelectAdapter={handleSelectAdapter}
            onToggleKillSwitch={handleToggleKillSwitch}
            onToggleSplitTunneling={handleToggleSplitTunneling}
            onUpgradeTier={handleUpgradeTier}
          />
        )}

        {activeTab === 'trackers' && (
          <OmniTrackerAdBlockView
            trackers={trackers}
            adBlockRules={adBlockRules}
            monetizationConfig={monetizationConfig}
            onToggleRule={handleToggleRule}
            onAddCustomRule={handleAddCustomRule}
            onDeleteRule={handleDeleteRule}
            onUpdateMonetization={handleUpdateMonetization}
            onTogglePublisherAllowlist={handleTogglePublisherAllowlist}
          />
        )}

        {activeTab === 'cookies' && (
          <OmniCookieManagerView
            cookies={cookies}
            cookiePolicy={cookiePolicy}
            onUpdatePolicy={handleUpdateCookiePolicy}
            onClearCookie={handleClearCookie}
            onClearDomainCookies={handleClearDomainCookies}
            onClearAllThirdParty={handleClearAllThirdParty}
          />
        )}

        {activeTab === 'dns' && (
          <OmniSecureDnsView
            dnsProviders={dnsProviders}
            selectedProvider={selectedDnsProvider}
            onSelectProvider={handleSelectDnsProvider}
            onAddCustomProvider={handleAddCustomDns}
          />
        )}

        {activeTab === 'fingerprint' && (
          <OmniAntiFingerprintView
            config={antiFingerprint}
            onUpdateConfig={handleUpdateAntiFingerprint}
          />
        )}
      </div>
    </div>
  );
};
