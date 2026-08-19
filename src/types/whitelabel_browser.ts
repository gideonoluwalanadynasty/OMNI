// Types for OMNI White Label Browser SaaS Platform & Business Engine

export type WhiteLabelStatus = 'live' | 'building' | 'draft' | 'suspended';
export type WhiteLabelDnsStatus = 'verified' | 'pending_cname' | 'propagating' | 'error';
export type WhiteLabelThemeMode = 'dark' | 'light' | 'system' | 'custom_duotone';
export type WhiteLabelBorderRadius = 'none' | 'subtle' | 'smooth' | 'full';
export type WhiteLabelSearchEngine = 'omni_sovereign' | 'duckduckgo' | 'google' | 'brave' | 'custom_intranet';
export type WhiteLabelAiModel = 'omni-flash-sovereign' | 'omni-pro-multimodal' | 'enterprise-fine-tuned';
export type WhiteLabelVpnMode = 'omni_multihop' | 'enterprise_wireguard' | 'ipsec_gateway' | 'tor_hybrid';
export type WhiteLabelMonetization = 'seat_subscription' | 'ad_supported_free' | 'freemium_tiered' | 'sponsored_enterprise';
export type WhiteLabelUserRole = 'Owner' | 'Admin' | 'IT_SecOps' | 'Brand_Manager' | 'Viewer';
export type WhiteLabelResellerTier = 'Silver Partner' | 'Gold Solution Provider' | 'Sovereign Diamond';

export interface WhiteLabelPinnedDial {
  id: string;
  name: string;
  url: string;
  iconName: string;
  category: string;
  isSponsored?: boolean;
  isAffiliate?: boolean;
  color?: string;
}

export interface WhiteLabelNewsSource {
  id: string;
  name: string;
  rssUrl: string;
  category: string;
  enabled: boolean;
}

export interface WhiteLabelKnowledgeDoc {
  id: string;
  name: string;
  type: 'pdf' | 'wiki' | 'url_crawl' | 'api';
  docCount: number;
  status: 'indexed' | 'syncing' | 'pending';
  lastSyncedAt: string;
}

export interface WhiteLabelExtensionItem {
  id: string;
  name: string;
  icon: string;
  version: string;
  mandatory: boolean;
  description: string;
  publisher: string;
  category: string;
}

export interface WhiteLabelPricingTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  seatCap: number;
  features: string[];
  isPopular?: boolean;
}

export interface WhiteLabelAdBid {
  id: string;
  advertiser: string;
  bidCpm: number;
  tileUrl: string;
  tileTitle: string;
  status: 'active' | 'paused';
  impressions: number;
  clicks: number;
  revenue: number;
}

export interface WhiteLabelTeamMember {
  id: string;
  name: string;
  email: string;
  role: WhiteLabelUserRole;
  addedAt: string;
  lastActive: string;
  ssoEnabled: boolean;
  avatarUrl: string;
}

export interface WhiteLabelLedgerTx {
  id: string;
  timestamp: string;
  type: 'subscription_charge' | 'domain_purchase' | 'ad_revenue_credit' | 'affiliate_payout' | 'wholesale_discount';
  description: string;
  debit: number;
  credit: number;
  balance: number;
  referenceId: string;
}

export interface WhiteLabelBrowserConfig {
  id: string;
  tenantId: string;
  name: string;
  slug: string;
  tagline: string;
  status: WhiteLabelStatus;
  createdAt: string;
  updatedAt: string;

  // Brand & Identity
  brand: {
    companyName: string;
    brandName: string;
    tagline: string;
    accentColor: string; // Hex e.g. #6366f1
    surfaceColor: string; // Hex e.g. #0f172a
    fontFamily: string;
    borderRadius: WhiteLabelBorderRadius;
    themeMode: WhiteLabelThemeMode;
    poweredByOmniBadge: boolean;
    splashScreenTitle: string;
    supportEmail: string;
    copyrightNotice: string;
  };

  // Logos & Visual Assets
  logos: {
    logoUrl: string;
    logoDarkUrl: string;
    faviconUrl: string;
    watermarkUrl: string;
    appIconUrl: string;
  };

  // Domains & Networking
  domain: {
    subdomain: string; // e.g. acme (acme.omnibrowser.com)
    customDomain: string; // e.g. browser.acme.com
    dnsStatus: WhiteLabelDnsStatus;
    cnameTarget: string; // ingress.omnibrowser.com
    txtVerificationKey: string;
    sslStatus: 'issued' | 'pending' | 'auto_renewing';
    sslExpiresAt: string;
    sslIssuer: string;
    autoDnsManagedByOmni: boolean;
  };

  // Homepage & New Tab Experience
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    wallpaperType: 'gradient' | 'cosmic' | 'minimal_grid' | 'custom_image' | 'video_canvas';
    customWallpaperUrl: string;
    pinnedSpeedDials: WhiteLabelPinnedDial[];
    announcementBanner: {
      isEnabled: boolean;
      title: string;
      text: string;
      ctaUrl: string;
      ctaLabel: string;
      type: 'info' | 'warning' | 'promo';
    };
    widgets: {
      quickSearch: boolean;
      dailyNews: boolean;
      aiCopilotBar: boolean;
      weatherCrypto: boolean;
      corporateShortcuts: boolean;
      workspaceTray: boolean;
    };
  };

  // Search Engine Configuration
  searchEngine: {
    defaultEngine: WhiteLabelSearchEngine;
    customSearchEndpoint: string;
    searchAutosuggestApi: string;
    strictSafeSearch: boolean;
    enterpriseIntranetIndexing: boolean;
    customBangShortcuts: Array<{ prefix: string; name: string; urlTemplate: string }>;
  };

  // News Feed & Curation
  newsFeed: {
    enabled: boolean;
    sources: WhiteLabelNewsSource[];
    aiDigestCadence: 'hourly' | 'daily_morning' | 'realtime_breaking' | 'disabled';
    corporateInternalFeedUrl: string;
    bannedCategories: string[];
  };

  // Custom AI Assistant
  aiAssistant: {
    aiAssistantName: string;
    aiAvatarUrl: string;
    modelTier: WhiteLabelAiModel;
    systemPrompt: string;
    knowledgeBases: WhiteLabelKnowledgeDoc[];
    zeroDataRetentionEnforced: boolean;
    allowedModes: {
      chat: boolean;
      codeExplain: boolean;
      pageSummarizer: boolean;
      autoEmailDraft: boolean;
      enterpriseDataSearch: boolean;
    };
  };

  // VPN & Security Gateways
  vpn: {
    vpnBundled: boolean;
    tunnelMode: WhiteLabelVpnMode;
    customWireguardConfig: string;
    allowedCountries: string[];
    killSwitchEnforced: boolean;
    splitTunnelingDomains: string[];
    zeroLogsPolicyAuditSignature: string;
  };

  // Extensions Marketplace
  extensions: {
    storeMode: 'curated_whitelist' | 'all_open' | 'enterprise_only';
    preInstalled: WhiteLabelExtensionItem[];
    allowCustomSideloading: boolean;
  };

  // Subscriptions & Monetization
  monetization: {
    model: WhiteLabelMonetization;
    pricingTiers: WhiteLabelPricingTier[];
    currency: string;
    paywallTrigger: 'on_install' | 'feature_locked' | 'seat_limit_exceeded' | 'none';
    trialDays: number;
    billingProvider: 'OMNI Billing' | 'Stripe Connect' | 'OMNI Pay Escrow';
  };

  // Privacy-Respecting Advertising
  advertising: {
    adNetworkEnabled: boolean;
    adTypes: {
      sponsoredSpeedDials: boolean;
      sidebarDeals: boolean;
      newTabWallpaperSponsor: boolean;
      inFeedSponsoredNews: boolean;
    };
    customerPayoutSplit: number; // e.g. 80
    sponsoredBids: WhiteLabelAdBid[];
    currentMonthAdRevenue: number;
  };

  // Privacy-Preserving Telemetry & Analytics
  analytics: {
    activeDailyUsers: number;
    activeMonthlyUsers: number;
    retention30d: number;
    totalSearches24h: number;
    bandwidthSavedGb: number;
    trackersBlockedTotal: number;
    totalRevenueGenerated: number;
    userPlatformBreakdown: { desktop: number; mobile: number; tablet: number };
  };

  // Users, Seats & Permissions
  usersPermissions: {
    seatsAllocated: number;
    seatsUsed: number;
    teamMembers: WhiteLabelTeamMember[];
    ssoProvider: 'omni_passport' | 'okta_saml' | 'azure_ad' | 'google_workspace';
    rbacPoliciesEnforced: boolean;
    auditLogsRetentionDays: number;
  };

  // Reseller & Affiliate Integration
  resellerAffiliate: {
    isReseller: boolean;
    resellerTier: WhiteLabelResellerTier;
    wholesaleDiscountPercent: number; // e.g. 30%
    affiliateReferralCode: string;
    affiliateCommissionRate: number; // e.g. 25%
    totalAffiliateClicks: number;
    totalAffiliateConversions: number;
    totalCommissionEarned: number;
    payoutMethod: 'OMNI Pay' | 'Stripe' | 'USDC Wire';
  };

  // OMNI Billing & Ledger
  billingLedger: {
    billingCycle: 'monthly' | 'annual';
    currentInvoice: {
      invoiceNumber: string;
      amountDue: number;
      dueDate: string;
      status: 'paid' | 'pending' | 'draft';
      lineItems: Array<{ desc: string; qty: number; unitPrice: number; total: number }>;
    };
    transactions: WhiteLabelLedgerTx[];
  };
}
