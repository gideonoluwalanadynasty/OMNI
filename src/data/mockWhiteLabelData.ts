import {
  WhiteLabelBrowserConfig,
  WhiteLabelExtensionItem
} from '../types/whitelabel_browser';

export const INITIAL_WHITE_LABEL_PRESETS: WhiteLabelBrowserConfig[] = [
  {
    id: 'wl-acme-corp',
    tenantId: 'tenant-acme-001',
    name: 'Acme Enterprise Browser',
    slug: 'acme-corp',
    tagline: 'Ultra-Secure Zero-Trust Workspace Browser for Global Teams',
    status: 'live',
    createdAt: '2026-04-12T08:00:00Z',
    updatedAt: '2026-08-16T19:30:00Z',

    brand: {
      companyName: 'Acme Corporation',
      brandName: 'Acme Secure Browser',
      tagline: 'Empowering sovereign enterprise workflows with zero-trust AI.',
      accentColor: '#3b82f6', // Electric Blue
      surfaceColor: '#0b132b',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: 'smooth',
      themeMode: 'dark',
      poweredByOmniBadge: true,
      splashScreenTitle: 'Welcome to Acme Enterprise Environment',
      supportEmail: 'secops@acme.corp',
      copyrightNotice: '© 2026 Acme Corp. All rights reserved. Powered by OMNI.'
    },

    logos: {
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      logoDarkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&auto=format&fit=crop&q=80',
      watermarkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
      appIconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80'
    },

    domain: {
      subdomain: 'acme',
      customDomain: 'browser.acmecorp.internal',
      dnsStatus: 'verified',
      cnameTarget: 'ingress.omnibrowser.com',
      txtVerificationKey: 'omni-verify=7c53d53f-acme-secops-2026',
      sslStatus: 'issued',
      sslExpiresAt: '2027-04-12T00:00:00Z',
      sslIssuer: 'OMNI Automated TLS / Let\'s Encrypt ECC',
      autoDnsManagedByOmni: true
    },

    homepage: {
      heroTitle: 'Acme Global Command Center',
      heroSubtitle: 'Connected securely to Acme Virtual Private Cloud & Knowledge Mesh.',
      wallpaperType: 'cosmic',
      customWallpaperUrl: '',
      pinnedSpeedDials: [
        { id: 'psd-1', name: 'Acme ERP & HR', url: 'https://erp.acmecorp.internal', iconName: 'Building2', category: 'Enterprise', color: 'text-blue-400 bg-blue-950/80 border-blue-800' },
        { id: 'psd-2', name: 'Internal GitLab', url: 'https://code.acmecorp.internal', iconName: 'Code2', category: 'Dev', color: 'text-amber-400 bg-amber-950/80 border-amber-800' },
        { id: 'psd-3', name: 'Salesforce CRM', url: 'https://acme.my.salesforce.com', iconName: 'Database', category: 'Sales', isAffiliate: true, color: 'text-cyan-400 bg-cyan-950/80 border-cyan-800' },
        { id: 'psd-4', name: 'Acme Cloud Drive', url: 'https://drive.acmecorp.internal', iconName: 'HardDrive', category: 'Enterprise', color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' },
        { id: 'psd-5', name: 'AWS Console SSO', url: 'https://aws.amazon.com/console', iconName: 'Cloud', category: 'Dev', isSponsored: true, color: 'text-orange-400 bg-orange-950/80 border-orange-800' },
        { id: 'psd-6', name: 'Jira Project Hub', url: 'https://jira.acmecorp.internal', iconName: 'CheckSquare', category: 'Productivity', color: 'text-indigo-400 bg-indigo-950/80 border-indigo-800' }
      ],
      announcementBanner: {
        isEnabled: true,
        title: 'Quarterly Security Audit & Zero-Trust MFA Update',
        text: 'All employees must verify their FIDO2 Passkeys in OMNI Passport before Friday 5 PM EST.',
        ctaUrl: 'https://passport.omni.com',
        ctaLabel: 'Verify Passkey',
        type: 'info'
      },
      widgets: {
        quickSearch: true,
        dailyNews: true,
        aiCopilotBar: true,
        weatherCrypto: false,
        corporateShortcuts: true,
        workspaceTray: true
      }
    },

    searchEngine: {
      defaultEngine: 'custom_intranet',
      customSearchEndpoint: 'https://search.acmecorp.internal/api/v2?q=%s',
      searchAutosuggestApi: 'https://search.acmecorp.internal/api/v2/suggest?q=%s',
      strictSafeSearch: true,
      enterpriseIntranetIndexing: true,
      customBangShortcuts: [
        { prefix: '!jira', name: 'Acme Jira Tickets', urlTemplate: 'https://jira.acmecorp.internal/browse/%s' },
        { prefix: '!confl', name: 'Confluence Wiki', urlTemplate: 'https://wiki.acmecorp.internal/search?q=%s' },
        { prefix: '!repo', name: 'GitLab Repositories', urlTemplate: 'https://code.acmecorp.internal/search?q=%s' }
      ]
    },

    newsFeed: {
      enabled: true,
      sources: [
        { id: 'ns-1', name: 'Acme Corporate Wire', rssUrl: 'https://news.acmecorp.internal/feed.xml', category: 'Internal', enabled: true },
        { id: 'ns-2', name: 'Reuters Global Markets', rssUrl: 'https://reuters.com/markets/rss', category: 'Finance', enabled: true },
        { id: 'ns-3', name: 'Cybersecurity Threat Intelligence', rssUrl: 'https://threatpost.com/feed', category: 'Security', enabled: true }
      ],
      aiDigestCadence: 'daily_morning',
      corporateInternalFeedUrl: 'https://news.acmecorp.internal/api/v1/feed',
      bannedCategories: ['gossip', 'gambling', 'entertainment']
    },

    aiAssistant: {
      aiAssistantName: 'Acme Neural Copilot',
      aiAvatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      modelTier: 'enterprise-fine-tuned',
      systemPrompt: 'You are the official Acme Enterprise AI Assistant. You possess knowledge of internal company policies, technical architecture, and customer guidelines. Never output confidential internal codes outside authorized sessions. Always prioritize enterprise safety and clarity.',
      knowledgeBases: [
        { id: 'kb-1', name: 'Acme Employee Handbook 2026.pdf', type: 'pdf', docCount: 142, status: 'indexed', lastSyncedAt: '2026-08-10' },
        { id: 'kb-2', name: 'Internal Architecture Wikis', type: 'wiki', docCount: 840, status: 'indexed', lastSyncedAt: '2026-08-16' },
        { id: 'kb-3', name: 'Product Release Notes API', type: 'api', docCount: 310, status: 'indexed', lastSyncedAt: '2026-08-15' }
      ],
      zeroDataRetentionEnforced: true,
      allowedModes: {
        chat: true,
        codeExplain: true,
        pageSummarizer: true,
        autoEmailDraft: true,
        enterpriseDataSearch: true
      }
    },

    vpn: {
      vpnBundled: true,
      tunnelMode: 'enterprise_wireguard',
      customWireguardConfig: '[Interface]\nPrivateKey = ************************\nAddress = 10.144.0.5/24\nDNS = 10.144.0.1\n\n[Peer]\nPublicKey = 9kX+EnterpriseAcmeGatewayPQCGateway=\nEndpoint = vpn.acmecorp.internal:51820\nAllowedIPs = 10.0.0.0/8, 172.16.0.0/12',
      allowedCountries: ['US', 'CA', 'DE', 'GB', 'JP', 'SG'],
      killSwitchEnforced: true,
      splitTunnelingDomains: ['youtube.com', 'spotify.com'],
      zeroLogsPolicyAuditSignature: 'NIST-800-53-REV5-AUDIT-VALIDATED'
    },

    extensions: {
      storeMode: 'curated_whitelist',
      preInstalled: [
        { id: 'ext-1', name: 'Acme Single Sign-On Agent', icon: 'ShieldCheck', version: '4.2.0', mandatory: true, description: 'Automates FIDO2 passkey handshakes across Acme intranets.', publisher: 'Acme IT Security', category: 'Security' },
        { id: 'ext-2', name: 'OMNI Ad & Tracker Shield', icon: 'ShieldAlert', version: '3.1.2', mandatory: true, description: 'Blocks malicious telemetry and script injection.', publisher: 'OMNI Foundation', category: 'Privacy' },
        { id: 'ext-3', name: '1Password Enterprise Bridge', icon: 'Key', version: '2.8.5', mandatory: false, description: 'Corporate credential manager with biometric autofill.', publisher: 'AgileBits', category: 'Productivity' }
      ],
      allowCustomSideloading: false
    },

    monetization: {
      model: 'seat_subscription',
      pricingTiers: [
        { id: 'tier-1', name: 'Starter Team', priceMonthly: 12, priceAnnual: 120, seatCap: 25, features: ['Custom Branded UI', 'Subdomain Access', 'Basic VPN Routing', 'Standard AI Copilot'] },
        { id: 'tier-2', name: 'Enterprise Sovereign', priceMonthly: 28, priceAnnual: 280, seatCap: 500, features: ['Custom Domain + SSL', 'Dedicated WireGuard Gateway', 'Corporate Knowledge AI', 'No OMNI Badge', 'Full Telemetry Export'], isPopular: true },
        { id: 'tier-3', name: 'Unlimited Global Org', priceMonthly: 45, priceAnnual: 450, seatCap: 10000, features: ['Unlimited Seats', 'Custom Model Fine-Tuning', '24/7 Dedicated SLA', 'On-Premises Air-Gapped Fallback'] }
      ],
      currency: 'USD',
      paywallTrigger: 'seat_limit_exceeded',
      trialDays: 14,
      billingProvider: 'OMNI Billing'
    },

    advertising: {
      adNetworkEnabled: false,
      adTypes: {
        sponsoredSpeedDials: false,
        sidebarDeals: false,
        newTabWallpaperSponsor: false,
        inFeedSponsoredNews: false
      },
      customerPayoutSplit: 80,
      sponsoredBids: [],
      currentMonthAdRevenue: 0
    },

    analytics: {
      activeDailyUsers: 3420,
      activeMonthlyUsers: 14850,
      retention30d: 94.2,
      totalSearches24h: 48920,
      bandwidthSavedGb: 1240.5,
      trackersBlockedTotal: 984210,
      totalRevenueGenerated: 84200,
      userPlatformBreakdown: { desktop: 78, mobile: 18, tablet: 4 }
    },

    usersPermissions: {
      seatsAllocated: 500,
      seatsUsed: 385,
      ssoProvider: 'okta_saml',
      rbacPoliciesEnforced: true,
      auditLogsRetentionDays: 365,
      teamMembers: [
        { id: 'u-1', name: 'Sarah Connor', email: 's.connor@acme.corp', role: 'Owner', addedAt: '2026-04-12', lastActive: '2 mins ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
        { id: 'u-2', name: 'David Vance', email: 'd.vance@acme.corp', role: 'IT_SecOps', addedAt: '2026-05-01', lastActive: '14 mins ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
        { id: 'u-3', name: 'Elena Rostova', email: 'e.rostova@acme.corp', role: 'Brand_Manager', addedAt: '2026-05-10', lastActive: '1 hour ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80' },
        { id: 'u-4', name: 'Marcus Sterling', email: 'm.sterling@acme.corp', role: 'Admin', addedAt: '2026-06-01', lastActive: '3 hours ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' }
      ]
    },

    resellerAffiliate: {
      isReseller: true,
      resellerTier: 'Gold Solution Provider',
      wholesaleDiscountPercent: 30,
      affiliateReferralCode: 'ACME-SOVEREIGN-2026',
      affiliateCommissionRate: 25,
      totalAffiliateClicks: 14280,
      totalAffiliateConversions: 412,
      totalCommissionEarned: 18450.00,
      payoutMethod: 'OMNI Pay'
    },

    billingLedger: {
      billingCycle: 'monthly',
      currentInvoice: {
        invoiceNumber: 'INV-OMNI-2026-08-491',
        amountDue: 8960.00,
        dueDate: '2026-09-01',
        status: 'paid',
        lineItems: [
          { desc: 'Acme Secure Browser - 385 Active Enterprise Seats ($28/seat)', qty: 385, unitPrice: 28, total: 10780.00 },
          { desc: 'Gold Reseller Wholesale Discount (-30%)', qty: 1, unitPrice: -3234.00, total: -3234.00 },
          { desc: 'Dedicated WireGuard High-Throughput Egress Gateway', qty: 1, unitPrice: 1414.00, total: 1414.00 }
        ]
      },
      transactions: [
        { id: 'tx-101', timestamp: '2026-08-01 00:01:00', type: 'subscription_charge', description: 'August Enterprise Seat Allocation (385 Seats)', debit: 8960.00, credit: 0, balance: -8960.00, referenceId: 'INV-08-491' },
        { id: 'tx-102', timestamp: '2026-08-02 11:20:00', type: 'affiliate_payout', description: 'Affiliate Commission Settlement (July Referrals)', debit: 0, credit: 4120.00, balance: -4840.00, referenceId: 'PAY-AFF-712' },
        { id: 'tx-103', timestamp: '2026-08-05 14:00:00', type: 'subscription_charge', description: 'OMNI Pay Escrow Auto-Payment Settled', debit: 0, credit: 4840.00, balance: 0.00, referenceId: 'OMNIPAY-88190' }
      ]
    }
  },

  {
    id: 'wl-apex-crypto',
    tenantId: 'tenant-apex-002',
    name: 'Apex Trader Quantum Browser',
    slug: 'apex-trader',
    tagline: 'High-Frequency Decentralized Web3 & Financial Terminal Browser',
    status: 'live',
    createdAt: '2026-05-18T10:00:00Z',
    updatedAt: '2026-08-15T12:00:00Z',

    brand: {
      companyName: 'Apex Capital & DeFi Labs',
      brandName: 'Apex Trader Browser',
      tagline: 'Sub-millisecond market execution with post-quantum key vaulting.',
      accentColor: '#10b981', // Emerald
      surfaceColor: '#051b11',
      fontFamily: 'JetBrains Mono, monospace, sans-serif',
      borderRadius: 'subtle',
      themeMode: 'dark',
      poweredByOmniBadge: true,
      splashScreenTitle: 'Apex Sovereign Financial Terminal Loading...',
      supportEmail: 'desk@apextraders.io',
      copyrightNotice: '© 2026 Apex Capital. Powered by OMNI.'
    },

    logos: {
      logoUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=150&auto=format&fit=crop&q=80',
      logoDarkUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=150&auto=format&fit=crop&q=80',
      faviconUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=64&auto=format&fit=crop&q=80',
      watermarkUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=300&auto=format&fit=crop&q=80',
      appIconUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=128&auto=format&fit=crop&q=80'
    },

    domain: {
      subdomain: 'apex',
      customDomain: 'terminal.apextraders.io',
      dnsStatus: 'verified',
      cnameTarget: 'ingress.omnibrowser.com',
      txtVerificationKey: 'omni-verify=apex-trader-pqc-991',
      sslStatus: 'issued',
      sslExpiresAt: '2027-05-18T00:00:00Z',
      sslIssuer: 'OMNI Automated ZeroSSL ECC',
      autoDnsManagedByOmni: true
    },

    homepage: {
      heroTitle: 'Apex Global Financial Terminal',
      heroSubtitle: 'Direct memory-mapped order book feeds, decentralized liquidity aggregators, and zero MEV routing.',
      wallpaperType: 'minimal_grid',
      customWallpaperUrl: '',
      pinnedSpeedDials: [
        { id: 'apx-1', name: 'TradingView Pro', url: 'https://tradingview.com', iconName: 'TrendingUp', category: 'Markets', color: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
        { id: 'apx-2', name: 'Bloomberg Anywhere', url: 'https://bloomberg.com', iconName: 'LineChart', category: 'Terminal', color: 'text-amber-400 bg-amber-950 border-amber-800' },
        { id: 'apx-3', name: 'OMNI Pay Escrow', url: 'https://pay.omni.com', iconName: 'Wallet', category: 'Settlement', color: 'text-cyan-400 bg-cyan-950 border-cyan-800' },
        { id: 'apx-4', name: 'DeFiLlama Yields', url: 'https://defillama.com', iconName: 'Percent', category: 'Crypto', color: 'text-indigo-400 bg-indigo-950 border-indigo-800' }
      ],
      announcementBanner: {
        isEnabled: true,
        title: 'Flash CME Micro Futures Arbitrage Bot Deployed',
        text: 'Live liquidity pools rebalanced across London and Tokyo nodes.',
        ctaUrl: 'https://terminal.apextraders.io/arbitrage',
        ctaLabel: 'View Pool Metrics',
        type: 'promo'
      },
      widgets: {
        quickSearch: true,
        dailyNews: true,
        aiCopilotBar: true,
        weatherCrypto: true,
        corporateShortcuts: true,
        workspaceTray: false
      }
    },

    searchEngine: {
      defaultEngine: 'omni_sovereign',
      customSearchEndpoint: '',
      searchAutosuggestApi: '',
      strictSafeSearch: false,
      enterpriseIntranetIndexing: false,
      customBangShortcuts: [
        { prefix: '!btc', name: 'Bitcoin Mempool', urlTemplate: 'https://mempool.space/tx/%s' },
        { prefix: '!eth', name: 'Etherscan', urlTemplate: 'https://etherscan.io/address/%s' }
      ]
    },

    newsFeed: {
      enabled: true,
      sources: [
        { id: 'ns-apx-1', name: 'CoinDesk Pro Wire', rssUrl: 'https://coindesk.com/arc/outboundfeeds/rss', category: 'Crypto', enabled: true },
        { id: 'ns-apx-2', name: 'FT Financial Markets', rssUrl: 'https://ft.com/markets/rss', category: 'Finance', enabled: true }
      ],
      aiDigestCadence: 'realtime_breaking',
      corporateInternalFeedUrl: '',
      bannedCategories: []
    },

    aiAssistant: {
      aiAssistantName: 'Apex Quant AI',
      aiAvatarUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=100&auto=format&fit=crop&q=80',
      modelTier: 'omni-pro-multimodal',
      systemPrompt: 'You are Apex Quant AI, a financial modeling and algorithmic trading assistant. Provide statistical arbitrage formulas, options Greeks calculation, and smart contract audit analysis with mathematical rigor.',
      knowledgeBases: [
        { id: 'kb-apx-1', name: 'Black-Scholes & Volatility Surface Lab.pdf', type: 'pdf', docCount: 88, status: 'indexed', lastSyncedAt: '2026-08-12' },
        { id: 'kb-apx-2', name: 'Solidity & Rust Smart Contract Patterns', type: 'wiki', docCount: 410, status: 'indexed', lastSyncedAt: '2026-08-14' }
      ],
      zeroDataRetentionEnforced: true,
      allowedModes: {
        chat: true,
        codeExplain: true,
        pageSummarizer: true,
        autoEmailDraft: false,
        enterpriseDataSearch: true
      }
    },

    vpn: {
      vpnBundled: true,
      tunnelMode: 'omni_multihop',
      customWireguardConfig: '',
      allowedCountries: ['CH', 'IS', 'SG', 'JP', 'DE'],
      killSwitchEnforced: true,
      splitTunnelingDomains: [],
      zeroLogsPolicyAuditSignature: 'SWISS-ENCLAVE-ZERO-LOG-CERT-2026'
    },

    extensions: {
      storeMode: 'curated_whitelist',
      preInstalled: [
        { id: 'ext-apx-1', name: 'Apex Post-Quantum Hardware Key', icon: 'KeyRound', version: '2.1.0', mandatory: true, description: 'Air-gapped transaction signing bridge.', publisher: 'Apex Labs', category: 'Web3' },
        { id: 'ext-apx-2', name: 'TradingView Shortcut Floater', icon: 'Maximize2', version: '1.4.0', mandatory: false, description: 'Floating chart overlay in any tab.', publisher: 'Apex Labs', category: 'Finance' }
      ],
      allowCustomSideloading: true
    },

    monetization: {
      model: 'ad_supported_free',
      pricingTiers: [
        { id: 'tier-apx-1', name: 'Trader Free', priceMonthly: 0, priceAnnual: 0, seatCap: 1, features: ['Community Speed Dials', 'Privacy VPN (1 Hop)', 'Basic Quant AI'] },
        { id: 'tier-apx-2', name: 'VIP Institutional', priceMonthly: 99, priceAnnual: 990, seatCap: 10, features: ['Sub-ms Low Latency Tunnel', 'Dedicated Bloomberg Bridge', 'Zero-Ad Experience', 'Custom Smart Contract Audits'], isPopular: true }
      ],
      currency: 'USD',
      paywallTrigger: 'feature_locked',
      trialDays: 7,
      billingProvider: 'OMNI Pay Escrow'
    },

    advertising: {
      adNetworkEnabled: true,
      adTypes: {
        sponsoredSpeedDials: true,
        sidebarDeals: true,
        newTabWallpaperSponsor: false,
        inFeedSponsoredNews: true
      },
      customerPayoutSplit: 85,
      sponsoredBids: [
        { id: 'bid-1', advertiser: 'Coinbase Prime Institutional', bidCpm: 45.00, tileUrl: 'https://prime.coinbase.com', tileTitle: 'Coinbase Prime Liquidity', status: 'active', impressions: 42000, clicks: 1240, revenue: 1890.00 },
        { id: 'bid-2', advertiser: 'Kraken Futures Lab', bidCpm: 38.50, tileUrl: 'https://kraken.com/futures', tileTitle: 'Kraken 50x Margin Terminal', status: 'active', impressions: 31000, clicks: 980, revenue: 1193.50 }
      ],
      currentMonthAdRevenue: 3083.50
    },

    analytics: {
      activeDailyUsers: 8940,
      activeMonthlyUsers: 32400,
      retention30d: 88.5,
      totalSearches24h: 112000,
      bandwidthSavedGb: 4320.0,
      trackersBlockedTotal: 2410800,
      totalRevenueGenerated: 142000,
      userPlatformBreakdown: { desktop: 91, mobile: 7, tablet: 2 }
    },

    usersPermissions: {
      seatsAllocated: 50,
      seatsUsed: 38,
      ssoProvider: 'omni_passport',
      rbacPoliciesEnforced: true,
      auditLogsRetentionDays: 180,
      teamMembers: [
        { id: 'u-apx-1', name: 'Vikram Mehta', email: 'v.mehta@apextraders.io', role: 'Owner', addedAt: '2026-05-18', lastActive: '1 min ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80' },
        { id: 'u-apx-2', name: 'Chloe Dubois', email: 'c.dubois@apextraders.io', role: 'Admin', addedAt: '2026-06-01', lastActive: '5 mins ago', ssoEnabled: true, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80' }
      ]
    },

    resellerAffiliate: {
      isReseller: true,
      resellerTier: 'Sovereign Diamond',
      wholesaleDiscountPercent: 40,
      affiliateReferralCode: 'APEX-QUANT-2026',
      affiliateCommissionRate: 30,
      totalAffiliateClicks: 52100,
      totalAffiliateConversions: 1890,
      totalCommissionEarned: 68420.00,
      payoutMethod: 'USDC Wire'
    },

    billingLedger: {
      billingCycle: 'annual',
      currentInvoice: {
        invoiceNumber: 'INV-APEX-2026-08-992',
        amountDue: 4500.00,
        dueDate: '2026-09-15',
        status: 'paid',
        lineItems: [
          { desc: 'Apex Trader Quantum Browser - 38 Pro Seats License', qty: 38, unitPrice: 990, total: 37620.00 },
          { desc: 'Diamond Reseller Wholesale Discount (-40%)', qty: 1, unitPrice: -15048.00, total: -15048.00 },
          { desc: 'Ad Revenue Credit Offset (-$3,083.50)', qty: 1, unitPrice: -3083.50, total: -3083.50 }
        ]
      },
      transactions: [
        { id: 'tx-201', timestamp: '2026-08-01 00:00:00', type: 'ad_revenue_credit', description: 'July Publisher Ad Earnings Payout Credit', debit: 0, credit: 3083.50, balance: 3083.50, referenceId: 'AD-PAY-771' },
        { id: 'tx-202', timestamp: '2026-08-10 16:00:00', type: 'affiliate_payout', description: 'USDC Wire Withdrawal Settled to Escrow', debit: 3000.00, credit: 0, balance: 83.50, referenceId: 'USDC-TX-99014' }
      ]
    }
  }
];

export const OMNI_DOMAINS_CATALOG = [
  { domain: 'mycompanybrowser.com', extension: '.com', priceAnnual: 14.00, available: true, badge: 'Popular' },
  { domain: 'corp.omnibrowser.com', extension: '.omnibrowser.com', priceAnnual: 0.00, available: true, badge: 'Instant Free Subdomain' },
  { domain: 'acmesecure.browser', extension: '.browser', priceAnnual: 29.00, available: true, badge: 'Official Web3 & PQC Top-Level Domain' },
  { domain: 'apexquantum.ai', extension: '.ai', priceAnnual: 65.00, available: true, badge: 'High Demand' },
  { domain: 'fintechshield.omni', extension: '.omni', priceAnnual: 19.00, available: true, badge: 'Zero-Trust Native' },
  { domain: 'medsecure.tech', extension: '.tech', priceAnnual: 12.00, available: true, badge: 'Verified Registry' },
  { domain: 'sovereigncapital.io', extension: '.io', priceAnnual: 38.00, available: false, badge: 'Registered' }
];

export const CURATED_ENTERPRISE_EXTENSIONS: WhiteLabelExtensionItem[] = [
  { id: 'ext-omni-shield', name: 'OMNI Post-Quantum Privacy Shield', icon: 'Shield', version: '4.5.1', mandatory: true, description: 'Blocks malicious tracking, WebRTC leaks, and fingerprinting.', publisher: 'OMNI Foundation', category: 'Privacy & Security' },
  { id: 'ext-pwd-vault', name: 'Universal Zero-Knowledge Passkey Vault', icon: 'Key', version: '3.2.0', mandatory: false, description: 'Biometric autofill with FIDO2 and ML-KEM quantum keys.', publisher: 'Sovereign Labs', category: 'Security' },
  { id: 'ext-figma-omni', name: 'Figma Canvas Embed Bridge', icon: 'Layers', version: '2.1.4', mandatory: false, description: 'Live preview UI designs inside any workspace tab.', publisher: 'Figma Community', category: 'Design & Dev' },
  { id: 'ext-github-copilot', name: 'GitHub Enterprise PR Code Assistant', icon: 'Code', version: '1.9.8', mandatory: false, description: 'Inline code reviews and semantic diff analyzer.', publisher: 'GitHub', category: 'Development' },
  { id: 'ext-grammarly-ai', name: 'Grammarly Business Tone & Grammar', icon: 'FileText', version: '3.0.1', mandatory: false, description: 'Corporate style guide checker and grammar enhancement.', publisher: 'Grammarly', category: 'Productivity' },
  { id: 'ext-notion-clipper', name: 'Notion & Omni Notes Web Clipper', icon: 'Bookmark', version: '2.7.0', mandatory: false, description: 'Save articles, PDFs, and citations directly into team wikis.', publisher: 'Notion', category: 'Knowledge' }
];
