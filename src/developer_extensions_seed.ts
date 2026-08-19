import {
  OmniDeveloperExtensionItem,
  ExtensionDeveloperProfile,
  ExtensionSecurityReviewReport
} from './types';

export const SEED_DEVELOPER_PROFILE: ExtensionDeveloperProfile = {
  developerId: 'dev_omni_dynasty_99',
  displayName: 'Gideon Dynasty',
  orgName: 'Dynasty Systems & Security Labs',
  email: 'gideonoluwalanadynasty@gmail.com',
  didPassport: 'did:omni:passport:0x77c28994aa109fbce2',
  isKycVerified: true,
  payoutWalletAddress: '0x9924BfA204fA829388c42Ce46',
  totalSubmissions: 7,
  publishedCount: 5,
  accruedRevenueUsd: 18450.00,
  pendingPayoutUsd: 2840.00,
  tier: 'verified_partner'
};

export const SEED_EXTENSIONS_MARKETPLACE: OmniDeveloperExtensionItem[] = [
  {
    id: 'ext_omni_ai_copilot',
    slug: 'omni-ai-copilot',
    name: 'OMNI AI Sovereign Copilot',
    tagline: 'Deep page reasoning, semantic fact checking, consensus graph and AI synthesis',
    descriptionMarkdown: `### Next-Generation Sovereign AI Assistant
The OMNI AI Sovereign Copilot seamlessly binds into every web session to provide:
- **Instant Article Summarization**: Multi-perspective TL;DR with key quotes & citations.
- **Deep Consensus Engine**: Verifies claims against decentralized knowledge graphs and scholarly archives.
- **Side-by-Side Research**: Extracts comparison tables, technical metrics, and data points into OMNI Docs.
- **Multi-Engine BYOM**: Works with Gemini 1.5/2.0, DeepSeek, Claude, and local Ollama WASM.`,
    authorId: 'dev_omni_dynasty_99',
    authorName: 'OMNI Intelligence Labs',
    authorEmail: 'ai-labs@omni.com',
    authorVerified: true,
    icon: 'Sparkles',
    bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'ai',
    architecture: 'omni_native',
    supportedArchitectures: ['omni_native', 'chrome_mv3', 'firefox_webextension'],
    currentVersion: '2.4.0',
    reviewStatus: 'published',
    pricingModel: 'subscription_monthly',
    priceUsd: 0,
    monthlySubPriceUsd: 4.99,
    enterpriseSeatPriceUsd: 9.99,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: true,
    isInstalledInBrowser: true,
    isPurchased: true,
    activeInstallsCount: 384000,
    totalRevenueUsd: 142800.00,
    ratingAverage: 4.9,
    ratingCount: 2314,
    permissionsRequired: ['activeTab', 'contextMenus', 'storage', 'ai.use'],
    optionsPageUrl: 'omni://extensions/omni-ai-copilot',
    repositoryUrl: 'https://github.com/omni-ecosystem/omni-ai-copilot',
    createdAt: '2026-01-10T12:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z',
    versions: [
      {
        version: '2.4.0',
        releaseDate: '2026-08-10',
        changelog: 'Added real-time citation confidence verification and multi-document comparison charts.',
        manifestJsonSnippet: `{
  "manifest_version": 3,
  "name": "OMNI AI Sovereign Copilot",
  "version": "2.4.0",
  "permissions": ["activeTab", "storage", "ai.use"]
}`,
        packageSizeBytes: 1454080,
        packageSha256: '9a84f932e9120ba441bfe3941320efb672a912a73ef8902cb349001b2a991823',
        reviewStatus: 'published'
      },
      {
        version: '2.3.1',
        releaseDate: '2026-06-15',
        changelog: 'Bug fixes in WebAssembly tokenizer cache.',
        manifestJsonSnippet: `{"manifest_version": 3, "version": "2.3.1"}`,
        packageSizeBytes: 1420000,
        packageSha256: '88cba84f932e9120ba441bfe3941320efb672a912a73ef8902cb349001b2a99',
        reviewStatus: 'published'
      }
    ],
    latestReviewReport: {
      id: 'rev_ai_copilot_240',
      extensionId: 'ext_omni_ai_copilot',
      version: '2.4.0',
      scannedAt: '2026-08-10T11:45:00Z',
      overallScore: 99,
      isApproved: true,
      excessivePermissions: {
        passed: true,
        findings: [
          {
            permission: 'activeTab',
            category: 'dom_access',
            riskLevel: 'low',
            reason: 'Required for summarization on user trigger',
            isExcessive: false,
            recommendation: 'Permission scope is optimal.'
          },
          {
            permission: 'ai.use',
            category: 'ai_model',
            riskLevel: 'low',
            reason: 'Invokes local or server-side OMNI AI engine',
            isExcessive: false,
            recommendation: 'Approved under OMNI Core Security Framework.'
          }
        ]
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['Zero obfuscated payloads found', 'Strict CSP v3 compliant']
      },
      dataCollectionAudit: {
        passed: true,
        telemetryDetected: false,
        thirdPartyAnalyticsEndpoints: [],
        piiExtractionRisk: 'none',
        privacyPolicyValid: true
      },
      unsafeApisCheck: {
        passed: true,
        unsafeApisFound: [],
        deprecatedApisFound: [],
        manifestV3Compliant: true
      },
      sandboxCompatibility: {
        isTested: true,
        compatibilityGuarantee: 'verified_compatible',
        testResults: {
          chromeMv3Score: 98,
          firefoxScore: 95,
          omniNativeScore: 100,
          notes: 'Full cross-platform runtime support confirmed across all target engines.'
        }
      },
      reviewerNotes: 'Passed automated DevSecOps validation and manual permission audit.'
    }
  },
  {
    id: 'ext_privacy_sentinel',
    slug: 'privacy-sentinel-pro',
    name: 'OMNI Privacy Sentinel Pro',
    tagline: 'Multi-layer tracker interception, canvas fingerprint randomizer and cookie sandboxing',
    descriptionMarkdown: `### Military-Grade Privacy Shield
Shield your browsing from surveillance capitalism:
- **Declarative Net Request**: Real-time ad and telemetry blocking without CPU overhead.
- **Fingerprint Randomization**: Modifies Canvas, WebGL, AudioContext, and Font metrics.
- **CNAME Uncloaking**: Unmasks third-party tracking domains hidden behind first-party DNS aliases.
- **Zero Log Guarantee**: Fully deterministic cryptographic execution.`,
    authorId: 'dev_omni_dynasty_99',
    authorName: 'OMNI Security Taskforce',
    authorEmail: 'security@omni.com',
    authorVerified: true,
    icon: 'ShieldCheck',
    bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    category: 'privacy',
    architecture: 'omni_native',
    supportedArchitectures: ['omni_native', 'chrome_mv3', 'firefox_webextension'],
    currentVersion: '3.1.2',
    reviewStatus: 'published',
    pricingModel: 'free',
    priceUsd: 0,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: true,
    isInstalledInBrowser: true,
    isPurchased: true,
    activeInstallsCount: 520000,
    totalRevenueUsd: 0,
    ratingAverage: 5.0,
    ratingCount: 4120,
    permissionsRequired: ['declarativeNetRequest', 'cookies', 'privacy', 'storage'],
    optionsPageUrl: 'omni://extensions/privacy-sentinel',
    repositoryUrl: 'https://github.com/omni-ecosystem/privacy-sentinel',
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-08-12T16:00:00Z',
    versions: [
      {
        version: '3.1.2',
        releaseDate: '2026-08-12',
        changelog: 'Updated adblock rule lists (uBlock and EasyPrivacy synchronized).',
        manifestJsonSnippet: `{"manifest_version": 3, "version": "3.1.2"}`,
        packageSizeBytes: 911360,
        packageSha256: '3e120894ba99bfe3941320efb672a912a73ef8902cb349001b2a991823ab4321',
        reviewStatus: 'published'
      }
    ],
    latestReviewReport: {
      id: 'rev_priv_312',
      extensionId: 'ext_privacy_sentinel',
      version: '3.1.2',
      scannedAt: '2026-08-12T15:00:00Z',
      overallScore: 100,
      isApproved: true,
      excessivePermissions: {
        passed: true,
        findings: [
          {
            permission: 'declarativeNetRequest',
            category: 'network',
            riskLevel: 'medium',
            reason: 'Necessary for low-latency ad/tracker filtering',
            isExcessive: false,
            recommendation: 'Approved with strict rule bounds.'
          }
        ]
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['Clean source code verification passed']
      },
      dataCollectionAudit: {
        passed: true,
        telemetryDetected: false,
        thirdPartyAnalyticsEndpoints: [],
        piiExtractionRisk: 'none',
        privacyPolicyValid: true
      },
      unsafeApisCheck: {
        passed: true,
        unsafeApisFound: [],
        deprecatedApisFound: [],
        manifestV3Compliant: true
      },
      sandboxCompatibility: {
        isTested: true,
        compatibilityGuarantee: 'verified_compatible',
        testResults: {
          chromeMv3Score: 100,
          firefoxScore: 98,
          omniNativeScore: 100,
          notes: 'Tested on MV3 declarativeNetRequest and Firefox webExtensions.'
        }
      }
    }
  },
  {
    id: 'ext_devsecops_auditor',
    slug: 'devsecops-auditor',
    name: 'OMNI DevSecOps & AST Vulnerability Linter',
    tagline: 'Real-time source inspector, dependency scanner, and CVE correlation engine',
    descriptionMarkdown: `### Enterprise Security & Code Review Tool
Inspect web apps in real time right inside DevTools:
- **Zero-Day & CVE Correlation**: Matches loaded npm/bundle packages against NIST NVD.
- **DOM XSS Taint Analysis**: Tracks untrusted user inputs to dangerous DOM sinks.
- **CSP Inspector & Auto-Hardening**: Generates optimal nonce and SHA-256 policies.
- **Enterprise Team Sync**: Stream audit results to SIEM and OMNI Core Security hub.`,
    authorId: 'dev_omni_dynasty_99',
    authorName: 'Dynasty Systems & Security Labs',
    authorEmail: 'gideonoluwalanadynasty@gmail.com',
    authorVerified: true,
    icon: 'Terminal',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'developer',
    architecture: 'chrome_mv3',
    supportedArchitectures: ['chrome_mv3', 'firefox_webextension', 'omni_native'],
    currentVersion: '1.5.0',
    reviewStatus: 'published',
    pricingModel: 'one_time',
    priceUsd: 19.99,
    enterpriseSeatPriceUsd: 49.00,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: true,
    isInstalledInBrowser: false,
    isPurchased: false,
    activeInstallsCount: 42100,
    totalRevenueUsd: 841579.00,
    ratingAverage: 4.8,
    ratingCount: 680,
    permissionsRequired: ['devtools', 'debugger', 'webNavigation', 'storage'],
    optionsPageUrl: 'omni://extensions/devsecops-auditor',
    repositoryUrl: 'https://github.com/dynasty-labs/devsecops-auditor',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-08-14T09:00:00Z',
    versions: [
      {
        version: '1.5.0',
        releaseDate: '2026-08-14',
        changelog: 'Added WebAssembly memory taint tracking and OMNI Passport integration.',
        manifestJsonSnippet: `{"manifest_version": 3, "name": "DevSecOps Auditor", "version": "1.5.0"}`,
        packageSizeBytes: 1863680,
        packageSha256: '7fa890123ef8902cb349001b2a9918239a84f932e9120ba441bfe3941320efb6',
        reviewStatus: 'published'
      }
    ],
    latestReviewReport: {
      id: 'rev_dso_150',
      extensionId: 'ext_devsecops_auditor',
      version: '1.5.0',
      scannedAt: '2026-08-14T08:30:00Z',
      overallScore: 94,
      isApproved: true,
      excessivePermissions: {
        passed: true,
        findings: [
          {
            permission: 'debugger',
            category: 'os_bridge',
            riskLevel: 'high',
            reason: 'Used for AST instrumented runtime analysis inside developer tools',
            isExcessive: false,
            recommendation: 'Legitimate developer tool requirement. User confirmation prompted at install.'
          }
        ]
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['Source is cleanly transpiled from TypeScript with source maps verified.']
      },
      dataCollectionAudit: {
        passed: true,
        telemetryDetected: false,
        thirdPartyAnalyticsEndpoints: [],
        piiExtractionRisk: 'none',
        privacyPolicyValid: true
      },
      unsafeApisCheck: {
        passed: true,
        unsafeApisFound: [],
        deprecatedApisFound: [],
        manifestV3Compliant: true
      },
      sandboxCompatibility: {
        isTested: true,
        compatibilityGuarantee: 'verified_compatible',
        testResults: {
          chromeMv3Score: 98,
          firefoxScore: 90,
          omniNativeScore: 99,
          notes: 'Firefox debugger protocol requires devtools privilege grant.'
        }
      }
    }
  },
  {
    id: 'ext_firefox_tab_tree_pro',
    slug: 'vertical-tab-tree-pro',
    name: 'TreeStyle Sovereign Tabs (Firefox Port)',
    tagline: 'Hierarchical vertical tab management with memory unloading and group pinning',
    descriptionMarkdown: `### The Famous Firefox Tree Style Tab for OMNI & WebExtensions
Organize hundreds of open tabs in a recursive visual tree hierarchy:
- **Parent-Child Tree Structuring**: Automatic grouping when opening links in new background tabs.
- **Proactive Memory Sleeping**: Suspends inactive tab trees after configurable idle periods.
- **Cross-Browser Manifest Compatibility**: Seamlessly loads Firefox \`web-ext\` and Chrome MV3 bundles.`,
    authorId: 'dev_community_tree',
    authorName: 'Kiroshi Tabworks',
    authorEmail: 'kiroshi@tabworks.io',
    authorVerified: true,
    icon: 'Layers',
    bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    category: 'productivity',
    architecture: 'firefox_webextension',
    supportedArchitectures: ['firefox_webextension', 'chrome_mv3', 'omni_native'],
    currentVersion: '5.2.0',
    reviewStatus: 'published',
    pricingModel: 'free',
    priceUsd: 0,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: false,
    isInstalledInBrowser: false,
    isPurchased: true,
    activeInstallsCount: 168000,
    totalRevenueUsd: 0,
    ratingAverage: 4.7,
    ratingCount: 1950,
    permissionsRequired: ['tabs', 'storage', 'sessions'],
    optionsPageUrl: 'omni://extensions/vertical-tab-tree',
    repositoryUrl: 'https://github.com/tabworks/treestyle-sovereign',
    createdAt: '2026-03-01T00:00:00Z',
    updatedAt: '2026-07-22T00:00:00Z',
    versions: [
      {
        version: '5.2.0',
        releaseDate: '2026-07-22',
        changelog: 'Added OMNI Browser multiplatform tab bridge support.',
        manifestJsonSnippet: `{"manifest_version": 2, "name": "TreeStyle Tabs", "version": "5.2.0"}`,
        packageSizeBytes: 520000,
        packageSha256: '9902cb349001b2a9918239a84f932e9120ba441bfe3941320efb67fa890123ef8',
        reviewStatus: 'published'
      }
    ],
    latestReviewReport: {
      id: 'rev_tst_520',
      extensionId: 'ext_firefox_tab_tree_pro',
      version: '5.2.0',
      scannedAt: '2026-07-22T10:00:00Z',
      overallScore: 96,
      isApproved: true,
      excessivePermissions: {
        passed: true,
        findings: []
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['Clean static analysis']
      },
      dataCollectionAudit: {
        passed: true,
        telemetryDetected: false,
        thirdPartyAnalyticsEndpoints: [],
        piiExtractionRisk: 'none',
        privacyPolicyValid: true
      },
      unsafeApisCheck: {
        passed: true,
        unsafeApisFound: [],
        deprecatedApisFound: ['Manifest V2 (Shimmed via OMNI Compatibility Layer)'],
        manifestV3Compliant: false
      },
      sandboxCompatibility: {
        isTested: true,
        compatibilityGuarantee: 'verified_compatible',
        testResults: {
          chromeMv3Score: 92,
          firefoxScore: 100,
          omniNativeScore: 98,
          notes: 'Emulates browser.tabs and chrome.tabs via unified WebExtension bridge.'
        }
      }
    }
  },
  {
    id: 'ext_enterprise_dlp_vault',
    slug: 'enterprise-dlp-vault',
    name: 'OMNI Enterprise Sovereign DLP & Data Guard',
    tagline: 'Data loss prevention, PII redaction on paste, watermarking, and zero-trust audit compliance',
    descriptionMarkdown: `### Enterprise Compliance & Data Loss Prevention
Tailored for Fortune 500 banks, healthcare networks, and sovereign defense:
- **Real-Time PII & Secret Redaction**: Intercepts credit card numbers, SSNs, and private keys before form submission.
- **Dynamic Session Watermarking**: Renders subtle forensic cryptographic watermarks over confidential workspaces.
- **Enterprise Fleet Policy**: Centrally configurable via OMNI Admin Console and MDM.`,
    authorId: 'dev_omni_dynasty_99',
    authorName: 'Dynasty Systems & Security Labs',
    authorEmail: 'enterprise-security@dynasty.com',
    authorVerified: true,
    icon: 'Lock',
    bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'enterprise',
    architecture: 'omni_native',
    supportedArchitectures: ['omni_native', 'chrome_mv3'],
    currentVersion: '4.0.0',
    reviewStatus: 'published',
    pricingModel: 'enterprise_license',
    priceUsd: 0,
    monthlySubPriceUsd: 19.00,
    enterpriseSeatPriceUsd: 120.00,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: true,
    isInstalledInBrowser: false,
    isPurchased: false,
    activeInstallsCount: 94000,
    totalRevenueUsd: 480200.00,
    ratingAverage: 4.9,
    ratingCount: 310,
    permissionsRequired: ['clipboardRead', 'clipboardWrite', 'enterprise.deviceAttributes', 'storage'],
    optionsPageUrl: 'omni://extensions/enterprise-dlp',
    repositoryUrl: 'https://github.com/dynasty-labs/enterprise-dlp',
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
    versions: [
      {
        version: '4.0.0',
        releaseDate: '2026-08-01',
        changelog: 'Added AI LLM prompt DLP sanitizer and air-gapped SIEM export.',
        manifestJsonSnippet: `{"manifest_version": 3, "name": "Enterprise DLP Vault", "version": "4.0.0"}`,
        packageSizeBytes: 2450000,
        packageSha256: '2a9918239a84f932e9120ba441bfe3941320efb67fa890123ef89902cb349001',
        reviewStatus: 'published'
      }
    ],
    latestReviewReport: {
      id: 'rev_dlp_400',
      extensionId: 'ext_enterprise_dlp_vault',
      version: '4.0.0',
      scannedAt: '2026-08-01T12:00:00Z',
      overallScore: 98,
      isApproved: true,
      excessivePermissions: {
        passed: true,
        findings: [
          {
            permission: 'clipboardRead',
            category: 'os_bridge',
            riskLevel: 'high',
            reason: 'Needed for client-side secret scrubbing before clipboard commit',
            isExcessive: false,
            recommendation: 'Requires explicit Enterprise Administrator provisioning.'
          }
        ]
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['All DLP pattern matcher regex engines pass static analysis.']
      },
      dataCollectionAudit: {
        passed: true,
        telemetryDetected: false,
        thirdPartyAnalyticsEndpoints: [],
        piiExtractionRisk: 'none',
        privacyPolicyValid: true
      },
      unsafeApisCheck: {
        passed: true,
        unsafeApisFound: [],
        deprecatedApisFound: [],
        manifestV3Compliant: true
      },
      sandboxCompatibility: {
        isTested: true,
        compatibilityGuarantee: 'verified_compatible',
        testResults: {
          chromeMv3Score: 97,
          firefoxScore: 92,
          omniNativeScore: 100,
          notes: 'Full support across OMNI Native Sandboxes and Chrome MV3.'
        }
      }
    }
  },
  {
    id: 'ext_untested_crypto_sniper',
    slug: 'untested-crypto-sniper',
    name: 'Decentralized DEX Flash Sniper (Pending Review)',
    tagline: 'High frequency DEX arbitrage bot and liquidity listener',
    descriptionMarkdown: `### High Frequency Mempool Monitor
Monitors pending mempool transactions across EVM and Solana chains for automated trading.`,
    authorId: 'dev_anon_trader',
    authorName: 'Satoshi Phantom',
    authorEmail: 'phantom@anonsec.net',
    authorVerified: false,
    icon: 'TrendingUp',
    bannerImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80',
    category: 'finance',
    architecture: 'chrome_mv3',
    supportedArchitectures: ['chrome_mv3'],
    currentVersion: '0.9.1-beta',
    reviewStatus: 'permission_review',
    pricingModel: 'subscription_monthly',
    priceUsd: 0,
    monthlySubPriceUsd: 49.00,
    revenueShareCreatorPercent: 90,
    isEnterpriseEligible: false,
    isInstalledInBrowser: false,
    isPurchased: false,
    activeInstallsCount: 12,
    totalRevenueUsd: 0,
    ratingAverage: 3.5,
    ratingCount: 4,
    permissionsRequired: ['webRequest', 'webRequestBlocking', 'cookies', '<all_urls>', 'storage'],
    optionsPageUrl: 'omni://extensions/crypto-sniper',
    createdAt: '2026-08-15T22:00:00Z',
    updatedAt: '2026-08-16T04:00:00Z',
    versions: [
      {
        version: '0.9.1-beta',
        releaseDate: '2026-08-16',
        changelog: 'Initial submission for automated security review.',
        manifestJsonSnippet: `{"manifest_version": 3, "permissions": ["<all_urls>", "webRequestBlocking"]}`,
        packageSizeBytes: 890000,
        packageSha256: 'ff9918239a84f932e9120ba441bfe3941320efb67fa890123ef89902cb349001',
        reviewStatus: 'permission_review'
      }
    ],
    latestReviewReport: {
      id: 'rev_sniper_091',
      extensionId: 'ext_untested_crypto_sniper',
      version: '0.9.1-beta',
      scannedAt: '2026-08-16T05:00:00Z',
      overallScore: 58,
      isApproved: false,
      excessivePermissions: {
        passed: false,
        findings: [
          {
            permission: '<all_urls>',
            category: 'network',
            riskLevel: 'high',
            reason: 'Requests unrestricted broad access to all browsing origins',
            isExcessive: true,
            recommendation: 'Limit origin matches strictly to known RPC endpoints.'
          },
          {
            permission: 'webRequestBlocking',
            category: 'network',
            riskLevel: 'critical',
            reason: 'Intercepts plaintext network traffic synchronously',
            isExcessive: true,
            recommendation: 'Migrate to declarativeNetRequest to protect user credentials.'
          }
        ]
      },
      maliciousCodeAnalysis: {
        passed: true,
        astObfuscationDetected: false,
        evalUsageDetected: false,
        remoteCodeLoadingDetected: false,
        wasmIntegrityValid: true,
        findingsCount: 0,
        details: ['Static analysis passed; waiting on manual permission justification.']
      },
      dataCollectionAudit: {
        passed: false,
        telemetryDetected: true,
        thirdPartyAnalyticsEndpoints: ['https://analytics.phantom-anon.xyz/collect'],
        piiExtractionRisk: 'medium',
        privacyPolicyValid: false
      },
      unsafeApisCheck: {
        passed: false,
        unsafeApisFound: ['webRequestBlocking'],
        deprecatedApisFound: [],
        manifestV3Compliant: false
      },
      sandboxCompatibility: {
        isTested: false,
        compatibilityGuarantee: 'untested',
        testResults: {
          chromeMv3Score: 60,
          firefoxScore: 50,
          omniNativeScore: 40,
          notes: 'Compatibility cannot be guaranteed without automated sandbox test runs.'
        }
      },
      reviewerNotes: 'Blocked due to excessive <all_urls> permission and unverified analytics telemetry endpoint.'
    }
  }
];
