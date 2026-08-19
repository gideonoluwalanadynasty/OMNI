import {
  OmniTrackerItem,
  OmniTrackerCategory,
  OmniAdBlockRule,
  OmniPublisherMonetizationConfig,
  OmniCookieItem,
  OmniCookiePolicy,
  OmniSecureDnsProvider,
  OmniAntiFingerprintConfig,
  OmniSitePermission,
  OmniConnectedDevice,
  OmniPrivacyScoreBreakdown,
  OmniPrivacyRecommendation
} from '../../types';

export class OmniPrivacyShieldService {
  private static instance: OmniPrivacyShieldService;

  // Trackers detected database
  private trackers: OmniTrackerItem[] = [
    {
      id: 'trk_01',
      domain: 'google-analytics.com',
      scriptUrl: 'https://www.google-analytics.com/analytics.js',
      category: 'analytics',
      severity: 'medium',
      blockedCount: 412,
      siteUrl: 'https://techcrunch.com',
      detectedAt: new Date(Date.now() - 3600000).toISOString(),
      companyName: 'Alphabet Inc.',
      purposeDescription: 'Behavioral telemetry, event logging, and audience retention tracking.'
    },
    {
      id: 'trk_02',
      domain: 'connect.facebook.net',
      scriptUrl: 'https://connect.facebook.net/en_US/fbevents.js',
      category: 'social_pixel',
      severity: 'high',
      blockedCount: 388,
      siteUrl: 'https://nytimes.com',
      detectedAt: new Date(Date.now() - 7200000).toISOString(),
      companyName: 'Meta Platforms',
      purposeDescription: 'Cross-site identity matching, pixel conversions, and lookalike profiling.'
    },
    {
      id: 'trk_03',
      domain: 'doubleclick.net',
      scriptUrl: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
      category: 'advertising',
      severity: 'high',
      blockedCount: 924,
      siteUrl: 'https://bloomberg.com',
      detectedAt: new Date(Date.now() - 1800000).toISOString(),
      companyName: 'Google Ad Manager',
      purposeDescription: 'Real-time bidding auctions, cookie syncing, and behavioral ad targeting.'
    },
    {
      id: 'trk_04',
      domain: 'criteo.net',
      scriptUrl: 'https://static.criteo.net/js/ld/ld.js',
      category: 'advertising',
      severity: 'high',
      blockedCount: 215,
      siteUrl: 'https://amazon.com',
      detectedAt: new Date(Date.now() - 14400000).toISOString(),
      companyName: 'Criteo SA',
      purposeDescription: 'Cross-device product retargeting and commercial basket profiling.'
    },
    {
      id: 'trk_05',
      domain: 'fpjs.io',
      scriptUrl: 'https://openfpcdn.io/fingerprintjs/v3',
      category: 'fingerprinting',
      severity: 'high',
      blockedCount: 78,
      siteUrl: 'https://financialtimes.com',
      detectedAt: new Date(Date.now() - 21600000).toISOString(),
      companyName: 'FingerprintJS Inc.',
      purposeDescription: 'Canvas, audio buffer, and hardware concurrency device hash generation.'
    },
    {
      id: 'trk_06',
      domain: 'coinhive-miner.com',
      scriptUrl: 'https://coinhive-miner.com/lib/miner.wasm',
      category: 'cryptomining',
      severity: 'high',
      blockedCount: 14,
      siteUrl: 'https://freepaper.net',
      detectedAt: new Date(Date.now() - 86400000).toISOString(),
      companyName: 'Unknown Malicious Actor',
      purposeDescription: 'Unauthorised WebAssembly CPU thread exhaustion for cryptocurrency mining.'
    },
    {
      id: 'trk_07',
      domain: 'telemetry.tiktok.com',
      scriptUrl: 'https://analytics.tiktok.com/i18n/pixel/events.js',
      category: 'social_pixel',
      severity: 'high',
      blockedCount: 165,
      siteUrl: 'https://buzzfeed.com',
      detectedAt: new Date(Date.now() - 43200000).toISOString(),
      companyName: 'ByteDance Ltd.',
      purposeDescription: 'Cross-app engagement matching and biometric video affinity profiling.'
    },
    {
      id: 'trk_08',
      domain: 'segment.com',
      scriptUrl: 'https://cdn.segment.com/analytics.js/v1/loader.min.js',
      category: 'telemetry',
      severity: 'medium',
      blockedCount: 302,
      siteUrl: 'https://github.com',
      detectedAt: new Date(Date.now() - 5000000).toISOString(),
      companyName: 'Twilio Segment',
      purposeDescription: 'Customer data platform identity resolution and event stream routing.'
    }
  ];

  // Ad blocking rules
  private adBlockRules: OmniAdBlockRule[] = [
    {
      id: 'rule_easylist_std',
      name: 'EasyList Global Advertising Shield',
      ruleText: '||pubads.g.doubleclick.net^\n||adservice.google.com^\n||taboola.com^\n||outbrain.com^',
      ruleType: 'easylist',
      isEnabled: true,
      targetDomains: ['*'],
      blockedElementsCount: 3420,
      createdAt: '2026-01-01'
    },
    {
      id: 'rule_easyprivacy_std',
      name: 'EasyPrivacy Telemetry & Beacon Filter',
      ruleText: '||google-analytics.com^\n||segment.io^\n||mixpanel.com^\n||hotjar.com^',
      ruleType: 'easylist',
      isEnabled: true,
      targetDomains: ['*'],
      blockedElementsCount: 2890,
      createdAt: '2026-01-01'
    },
    {
      id: 'rule_ent_malware',
      name: 'Corporate Zero-Trust Domain Enforcement',
      ruleText: '||phishing-alerts.net^\n||c2-gateways.cc^\n||untrusted-tld.click^',
      ruleType: 'enterprise_policy',
      isEnabled: true,
      targetDomains: ['*'],
      blockedElementsCount: 142,
      createdAt: '2026-03-15'
    },
    {
      id: 'rule_user_custom_1',
      name: 'Custom Sticky Header Banner Block',
      ruleText: '##div[class*="sticky-advert"]\n##aside[id*="sponsor-bar"]',
      ruleType: 'user_custom',
      isEnabled: true,
      targetDomains: ['news.ycombinator.com', 'reddit.com'],
      blockedElementsCount: 88,
      createdAt: '2026-06-10'
    }
  ];

  // Monetization & Acceptable Ads configuration
  private monetizationConfig: OmniPublisherMonetizationConfig = {
    allowAcceptableAds: true, // Non-intrusive ads that meet strict Coalition for Better Ads standards
    directPublisherRewards: false, // Sovereign micro-token streaming to verified creators
    verifiedPublisherAllowlist: [
      'wikipedia.org',
      'eff.org',
      'archive.org',
      'mozilla.org',
      'arstechnica.com'
    ]
  };

  // Cookies database
  private cookies: OmniCookieItem[] = [
    {
      id: 'ck_01',
      name: '_ga',
      domain: 'techcrunch.com',
      value: 'GA1.2.1983021948.171800293',
      path: '/',
      expires: '2027-08-16',
      isSession: false,
      isHttpOnly: false,
      isSecure: true,
      sameSite: 'Lax',
      isThirdParty: false,
      isPartitioned: false,
      isTrackingCookie: true
    },
    {
      id: 'ck_02',
      name: '_fbp',
      domain: 'nytimes.com',
      value: 'fb.1.1718002930.981237',
      path: '/',
      expires: '2026-11-16',
      isSession: false,
      isHttpOnly: false,
      isSecure: true,
      sameSite: 'Lax',
      isThirdParty: true,
      isPartitioned: false,
      isTrackingCookie: true
    },
    {
      id: 'ck_03',
      name: '__Secure-omni-token',
      domain: 'omni.com',
      value: 'eyJhGciOiJKV1QiLCJhbGciOiJFZERTQSJ9...',
      path: '/',
      expires: '2026-09-01',
      isSession: false,
      isHttpOnly: true,
      isSecure: true,
      sameSite: 'Strict',
      isThirdParty: false,
      isPartitioned: true,
      partitionKey: 'https://omni.com',
      isTrackingCookie: false
    },
    {
      id: 'ck_04',
      name: 'IDE',
      domain: 'doubleclick.net',
      value: 'AHWqTUnv892kdslk092jlkas...',
      path: '/',
      expires: '2027-01-01',
      isSession: false,
      isHttpOnly: true,
      isSecure: true,
      sameSite: 'None',
      isThirdParty: true,
      isPartitioned: false,
      isTrackingCookie: true
    },
    {
      id: 'ck_05',
      name: 'session_id',
      domain: 'github.com',
      value: 's%3A9812903810293.ab9812',
      path: '/',
      expires: 'Session',
      isSession: true,
      isHttpOnly: true,
      isSecure: true,
      sameSite: 'Lax',
      isThirdParty: false,
      isPartitioned: true,
      partitionKey: 'https://github.com',
      isTrackingCookie: false
    }
  ];

  // Cookie policy
  private cookiePolicy: OmniCookiePolicy = {
    blockThirdPartyCookies: true,
    autoRejectConsentBanners: true,
    autoClearOnClose: false,
    isolateCookiesPerWorkspace: true,
    domainExceptions: ['auth0.com', 'accounts.google.com']
  };

  // Secure DNS providers
  private dnsProviders: OmniSecureDnsProvider[] = [
    {
      id: 'dns_omni_sovereign',
      name: 'OMNI Sovereign Encrypted DNS',
      description: 'Zero-knowledge hardware encrypted DNS with automated malware interception and ECS scrubbing.',
      dohUrl: 'https://dns.sovereign.omni.com/dns-query',
      dotServer: 'dns.sovereign.omni.com:853',
      ipv4: ['194.38.20.53', '194.38.20.54'],
      ipv6: ['2a00:1450:4001:820::200e'],
      privacyPolicyUrl: 'https://omni.com/privacy/dns',
      features: ['dnssec', 'no_logging', 'malware_filtering', 'ad_filtering', 'ecs_disabled']
    },
    {
      id: 'dns_cloudflare_privacy',
      name: 'Cloudflare 1.1.1.1 (Privacy First)',
      description: 'Ultra-fast Anycast global DNS with 24-hour log purge and KPMG audit attestation.',
      dohUrl: 'https://cloudflare-dns.com/dns-query',
      dotServer: '1.1.1.1:853',
      ipv4: ['1.1.1.1', '1.0.0.1'],
      ipv6: ['2606:4700:4700::1111'],
      privacyPolicyUrl: 'https://cloudflare.com/privacypolicy',
      features: ['dnssec', 'no_logging', 'ecs_disabled']
    },
    {
      id: 'dns_quad9_malware',
      name: 'Quad9 DNS (Threat & Malware Defense)',
      description: 'Swiss non-profit foundation providing real-time threat intelligence filtering and privacy.',
      dohUrl: 'https://dns.quad9.net/dns-query',
      dotServer: 'dns.quad9.net:853',
      ipv4: ['9.9.9.9', '149.112.112.112'],
      ipv6: ['2620:fe::fe'],
      privacyPolicyUrl: 'https://quad9.net/privacy',
      features: ['dnssec', 'no_logging', 'malware_filtering', 'ecs_disabled']
    },
    {
      id: 'dns_nextdns',
      name: 'NextDNS Sovereign Profile',
      description: 'Personalized cloud DNS firewall with analytics, Native CNAME uncloaking, and blocklists.',
      dohUrl: 'https://dns.nextdns.io/omni-sovereign',
      dotServer: 'dns.nextdns.io:853',
      ipv4: ['45.90.28.0', '45.90.30.0'],
      ipv6: ['2a07:a8c0::'],
      privacyPolicyUrl: 'https://nextdns.io/privacy',
      features: ['dnssec', 'malware_filtering', 'ad_filtering', 'ecs_disabled']
    },
    {
      id: 'dns_adguard',
      name: 'AdGuard DNS (Family & Privacy)',
      description: 'Encrypted DNS server blocking web ads, mobile tracking, and adult websites.',
      dohUrl: 'https://dns.adguard-dns.com/dns-query',
      dotServer: 'dns.adguard-dns.com:853',
      ipv4: ['94.140.14.14', '94.140.15.15'],
      ipv6: ['2a10:50c0::ad1:ff'],
      privacyPolicyUrl: 'https://adguard.com/privacy',
      features: ['dnssec', 'malware_filtering', 'ad_filtering']
    }
  ];
  private selectedDnsProviderId: string = 'dns_omni_sovereign';

  // Anti-fingerprinting configuration
  private antiFingerprint: OmniAntiFingerprintConfig = {
    canvasNoiseInjection: true,
    webGlVendorMasking: true,
    audioBufferFuzzing: true,
    fontEnumerationSpoofing: true,
    clientHintsStandardization: true,
    screenResolutionLetterboxing: true,
    webRtcIpLeakShield: true,
    batteryStatusSpoofing: true,
    hardwareConcurrencyFuzzing: true,
    anonymityNoticeAcknowledged: true
  };

  // Granular site permissions
  private sitePermissions: OmniSitePermission[] = [
    { domain: 'meet.google.com', permission: 'camera', status: 'allow', updatedDate: '2026-08-01' },
    { domain: 'meet.google.com', permission: 'microphone', status: 'allow', updatedDate: '2026-08-01' },
    { domain: 'maps.google.com', permission: 'geolocation', status: 'ask', updatedDate: '2026-07-20' },
    { domain: 'nytimes.com', permission: 'notifications', status: 'block', updatedDate: '2026-07-15' },
    { domain: 'bloomberg.com', permission: 'notifications', status: 'block', updatedDate: '2026-07-10' },
    { domain: 'github.com', permission: 'clipboard', status: 'allow', updatedDate: '2026-08-10' }
  ];

  // Connected devices
  private connectedDevices: OmniConnectedDevice[] = [
    {
      id: 'dev_current_m3',
      deviceName: 'MacBook Pro 16" (M3 Max)',
      deviceType: 'laptop',
      os: 'macOS Sonoma 14.5 (Darwin Kernel 23.5)',
      clientVersion: 'OMNI Browser v2.4.0-sovereign',
      location: 'Zurich, Switzerland',
      ipAddress: '194.38.20.114',
      vpnActive: true,
      lastSeen: 'Active Now',
      isCurrentDevice: true
    },
    {
      id: 'dev_sovereign_phone',
      deviceName: 'iPhone 15 Pro (Sovereign Mobile)',
      deviceType: 'mobile',
      os: 'iOS 17.5.1',
      clientVersion: 'OMNI Browser Mobile v2.3.8',
      location: 'Frankfurt, Germany',
      ipAddress: '142.132.240.89',
      vpnActive: true,
      lastSeen: '12 minutes ago',
      isCurrentDevice: false
    },
    {
      id: 'dev_vault_workstation',
      deviceName: 'Linux Sovereign Workstation (AMD Threadripper)',
      deviceType: 'desktop',
      os: 'NixOS 24.05 (Immutable ZFS)',
      clientVersion: 'OMNI Engine v2.4.0 Native',
      location: 'Reykjavik, Iceland',
      ipAddress: '185.112.144.50',
      vpnActive: true,
      lastSeen: '2 hours ago',
      isCurrentDevice: false
    }
  ];

  private constructor() {}

  public static getInstance(): OmniPrivacyShieldService {
    if (!OmniPrivacyShieldService.instance) {
      OmniPrivacyShieldService.instance = new OmniPrivacyShieldService();
    }
    return OmniPrivacyShieldService.instance;
  }

  // TRACKERS
  public getTrackers(): OmniTrackerItem[] {
    return [...this.trackers];
  }

  public getTrackersForSite(siteUrl: string): OmniTrackerItem[] {
    const domain = siteUrl.replace(/^https?:\/\//, '').split('/')[0];
    return this.trackers.filter(t => t.siteUrl.includes(domain) || t.domain.includes(domain));
  }

  public getTrackerStats(): { totalBlocked: number; byCategory: Record<OmniTrackerCategory, number> } {
    const byCategory: Record<OmniTrackerCategory, number> = {
      analytics: 0,
      advertising: 0,
      social_pixel: 0,
      fingerprinting: 0,
      cryptomining: 0,
      telemetry: 0
    };

    let totalBlocked = 0;
    this.trackers.forEach(t => {
      totalBlocked += t.blockedCount;
      if (byCategory[t.category] !== undefined) {
        byCategory[t.category] += t.blockedCount;
      }
    });

    return { totalBlocked, byCategory };
  }

  // AD BLOCKING
  public getAdBlockRules(): OmniAdBlockRule[] {
    return [...this.adBlockRules];
  }

  public toggleRule(ruleId: string): boolean {
    const rule = this.adBlockRules.find(r => r.id === ruleId);
    if (rule) {
      rule.isEnabled = !rule.isEnabled;
      return rule.isEnabled;
    }
    return false;
  }

  public addCustomRule(name: string, ruleText: string, targetDomains: string[]): OmniAdBlockRule {
    const newRule: OmniAdBlockRule = {
      id: `rule_custom_${Date.now()}`,
      name,
      ruleText,
      ruleType: 'user_custom',
      isEnabled: true,
      targetDomains,
      blockedElementsCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.adBlockRules.unshift(newRule);
    return newRule;
  }

  public deleteCustomRule(ruleId: string): boolean {
    const idx = this.adBlockRules.findIndex(r => r.id === ruleId);
    if (idx !== -1) {
      this.adBlockRules.splice(idx, 1);
      return true;
    }
    return false;
  }

  // PUBLISHER MONETIZATION
  public getMonetizationConfig(): OmniPublisherMonetizationConfig {
    return { ...this.monetizationConfig };
  }

  public updateMonetizationConfig(config: Partial<OmniPublisherMonetizationConfig>) {
    this.monetizationConfig = { ...this.monetizationConfig, ...config };
  }

  public togglePublisherAllowlist(domain: string): boolean {
    const exists = this.monetizationConfig.verifiedPublisherAllowlist.includes(domain);
    if (exists) {
      this.monetizationConfig.verifiedPublisherAllowlist = this.monetizationConfig.verifiedPublisherAllowlist.filter(
        d => d !== domain
      );
      return false;
    } else {
      this.monetizationConfig.verifiedPublisherAllowlist.push(domain);
      return true;
    }
  }

  // COOKIES
  public getCookies(): OmniCookieItem[] {
    return [...this.cookies];
  }

  public getCookiePolicy(): OmniCookiePolicy {
    return { ...this.cookiePolicy };
  }

  public updateCookiePolicy(policy: Partial<OmniCookiePolicy>) {
    this.cookiePolicy = { ...this.cookiePolicy, ...policy };
  }

  public clearCookie(cookieId: string): boolean {
    const idx = this.cookies.findIndex(c => c.id === cookieId);
    if (idx !== -1) {
      this.cookies.splice(idx, 1);
      return true;
    }
    return false;
  }

  public clearCookiesForDomain(domain: string): number {
    const initialLen = this.cookies.length;
    this.cookies = this.cookies.filter(c => !c.domain.includes(domain));
    return initialLen - this.cookies.length;
  }

  public clearAllThirdPartyCookies(): number {
    const initialLen = this.cookies.length;
    this.cookies = this.cookies.filter(c => !c.isThirdParty && !c.isTrackingCookie);
    return initialLen - this.cookies.length;
  }

  // SECURE DNS
  public getDnsProviders(): OmniSecureDnsProvider[] {
    return [...this.dnsProviders];
  }

  public getSelectedDnsProvider(): OmniSecureDnsProvider {
    return (
      this.dnsProviders.find(p => p.id === this.selectedDnsProviderId) ||
      this.dnsProviders[0]
    );
  }

  public selectDnsProvider(providerId: string): boolean {
    const p = this.dnsProviders.find(d => d.id === providerId);
    if (p) {
      this.selectedDnsProviderId = providerId;
      return true;
    }
    return false;
  }

  public addCustomDohProvider(name: string, dohUrl: string, dotServer: string): OmniSecureDnsProvider {
    const custom: OmniSecureDnsProvider = {
      id: `dns_custom_${Date.now()}`,
      name,
      description: 'Custom self-hosted or organizational DoH endpoint.',
      dohUrl,
      dotServer,
      ipv4: [],
      ipv6: [],
      privacyPolicyUrl: dohUrl,
      features: ['dnssec', 'no_logging', 'ecs_disabled'],
      isCustom: true
    };
    this.dnsProviders.push(custom);
    this.selectedDnsProviderId = custom.id;
    return custom;
  }

  // ANTI-FINGERPRINTING
  public getAntiFingerprintConfig(): OmniAntiFingerprintConfig {
    return { ...this.antiFingerprint };
  }

  public updateAntiFingerprintConfig(config: Partial<OmniAntiFingerprintConfig>) {
    this.antiFingerprint = { ...this.antiFingerprint, ...config };
  }

  // PERMISSIONS
  public getSitePermissions(): OmniSitePermission[] {
    return [...this.sitePermissions];
  }

  public setSitePermission(
    domain: string,
    permission: OmniSitePermission['permission'],
    status: OmniSitePermission['status']
  ) {
    const existing = this.sitePermissions.find(
      p => p.domain === domain && p.permission === permission
    );
    if (existing) {
      existing.status = status;
      existing.updatedDate = new Date().toISOString().split('T')[0];
    } else {
      this.sitePermissions.push({
        domain,
        permission,
        status,
        updatedDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  public revokePermission(domain: string, permission: OmniSitePermission['permission']) {
    this.sitePermissions = this.sitePermissions.filter(
      p => !(p.domain === domain && p.permission === permission)
    );
  }

  // CONNECTED DEVICES
  public getConnectedDevices(): OmniConnectedDevice[] {
    return [...this.connectedDevices];
  }

  public revokeDeviceSession(deviceId: string): boolean {
    const idx = this.connectedDevices.findIndex(d => d.id === deviceId);
    if (idx !== -1 && !this.connectedDevices[idx].isCurrentDevice) {
      this.connectedDevices.splice(idx, 1);
      return true;
    }
    return false;
  }

  // DYNAMIC PRIVACY SCORE & RECOMMENDATIONS
  public calculatePrivacyScore(isVpnConnected: boolean): OmniPrivacyScoreBreakdown {
    // 1. Network security (max 20)
    let networkScore = 5;
    if (isVpnConnected) networkScore += 12;
    if (this.antiFingerprint.webRtcIpLeakShield) networkScore += 3;

    // 2. Tracker Shield (max 20)
    let trackerScore = 20;

    // 3. Ad Block State (max 15)
    const enabledRulesCount = this.adBlockRules.filter(r => r.isEnabled).length;
    let adBlockScore = Math.min(15, enabledRulesCount * 4);

    // 4. Fingerprint Resistance (max 15)
    let fpScore = 0;
    if (this.antiFingerprint.canvasNoiseInjection) fpScore += 3;
    if (this.antiFingerprint.webGlVendorMasking) fpScore += 3;
    if (this.antiFingerprint.audioBufferFuzzing) fpScore += 3;
    if (this.antiFingerprint.fontEnumerationSpoofing) fpScore += 3;
    if (this.antiFingerprint.screenResolutionLetterboxing) fpScore += 3;

    // 5. Cookie Hygiene (max 15)
    let cookieScore = 5;
    if (this.cookiePolicy.blockThirdPartyCookies) cookieScore += 5;
    if (this.cookiePolicy.autoRejectConsentBanners) cookieScore += 3;
    if (this.cookiePolicy.isolateCookiesPerWorkspace) cookieScore += 2;

    // 6. DNS Privacy (max 15)
    let dnsScore = 15; // default encrypted DoH

    const totalScore = networkScore + trackerScore + adBlockScore + fpScore + cookieScore + dnsScore;

    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'A+';
    if (totalScore >= 92) grade = 'A+';
    else if (totalScore >= 80) grade = 'A';
    else if (totalScore >= 68) grade = 'B';
    else if (totalScore >= 50) grade = 'C';
    else grade = 'D';

    // Build actionable recommendations
    const recommendations: OmniPrivacyRecommendation[] = [];

    if (!isVpnConnected) {
      recommendations.push({
        id: 'rec_vpn_connect',
        title: 'Connect Sovereign VPN Relay',
        description: 'Your real public IP address and ISP routing path are exposed to visited web servers.',
        impact: 'high',
        category: 'vpn',
        actionLabel: 'Connect VPN Now',
        actionType: 'connect_vpn',
        isFixed: false
      });
    }

    if (!this.cookiePolicy.blockThirdPartyCookies) {
      recommendations.push({
        id: 'rec_cookie_block',
        title: 'Block Cross-Site Third-Party Cookies',
        description: 'Advertising networks can place cross-domain tracking tokens to reconstruct your browsing path.',
        impact: 'high',
        category: 'cookies',
        actionLabel: 'Block 3rd Party Cookies',
        actionType: 'block_third_party_cookies',
        isFixed: false
      });
    }

    if (!this.antiFingerprint.canvasNoiseInjection) {
      recommendations.push({
        id: 'rec_canvas_noise',
        title: 'Enable Canvas Noise Jitter Injection',
        description: 'Prevent fingerprinting scripts from hashing your GPU font rendering rasterizations.',
        impact: 'medium',
        category: 'fingerprinting',
        actionLabel: 'Enable Canvas Shield',
        actionType: 'enable_canvas_noise',
        isFixed: false
      });
    }

    if (!this.cookiePolicy.autoRejectConsentBanners) {
      recommendations.push({
        id: 'rec_auto_consent',
        title: 'Auto-Reject Cookie Consent Banners',
        description: 'Automatically decline all non-essential GDPR/CCPA tracking cookies without tedious manual clicks.',
        impact: 'medium',
        category: 'cookies',
        actionLabel: 'Enable Auto-Reject',
        actionType: 'enable_auto_consent',
        isFixed: false
      });
    }

    // Default positive recommendations if everything is hardened
    if (recommendations.length === 0) {
      recommendations.push({
        id: 'rec_all_hardened',
        title: 'Sovereign Privacy Defense is Optimal',
        description: 'Hardware enclaves, DoH encrypted resolution, anti-fingerprinting noise, and zero-telemetry shields are active.',
        impact: 'low',
        category: 'vpn',
        actionLabel: 'Review Settings',
        actionType: 'review_settings',
        isFixed: true
      });
    }

    return {
      totalScore,
      grade,
      categories: {
        networkSecurity: networkScore,
        trackerShield: trackerScore,
        adBlockState: adBlockScore,
        fingerprintResistance: fpScore,
        cookieHygiene: cookieScore,
        dnsPrivacy: dnsScore
      },
      recommendations
    };
  }
}

export const omniPrivacyShieldService = OmniPrivacyShieldService.getInstance();
