// PROMPT 6: OMNI EXTENSION MARKETPLACE & DEVELOPER ECOSYSTEM TYPES

export type ExtensionArchitectureTarget = 'chrome_mv3' | 'chrome_mv2' | 'firefox_webextension' | 'omni_native';

export type ExtensionReviewStatus = 
  | 'draft'
  | 'submitted'
  | 'security_scan'
  | 'permission_review'
  | 'approval'
  | 'published'
  | 'rejected'
  | 'quarantined';

export type ExtensionPricingModel = 
  | 'free'
  | 'one_time'
  | 'subscription_monthly'
  | 'subscription_yearly'
  | 'enterprise_license';

export type ExtensionSecuritySeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ExtensionPermissionAuditItem {
  permission: string;
  category: 'network' | 'storage' | 'dom_access' | 'cookies' | 'ai_model' | 'crypto_wallet' | 'os_bridge';
  riskLevel: ExtensionSecuritySeverity;
  reason: string;
  isExcessive: boolean;
  recommendation: string;
}

export interface ExtensionSecurityReviewReport {
  id: string;
  extensionId: string;
  version: string;
  scannedAt: string;
  overallScore: number; // 0-100 (100 is cleanest)
  isApproved: boolean;
  // Security review criteria:
  excessivePermissions: {
    passed: boolean;
    findings: ExtensionPermissionAuditItem[];
  };
  maliciousCodeAnalysis: {
    passed: boolean;
    astObfuscationDetected: boolean;
    evalUsageDetected: boolean;
    remoteCodeLoadingDetected: boolean;
    wasmIntegrityValid: boolean;
    findingsCount: number;
    details: string[];
  };
  dataCollectionAudit: {
    passed: boolean;
    telemetryDetected: boolean;
    thirdPartyAnalyticsEndpoints: string[];
    piiExtractionRisk: 'none' | 'low' | 'medium' | 'high';
    privacyPolicyValid: boolean;
  };
  unsafeApisCheck: {
    passed: boolean;
    unsafeApisFound: string[];
    deprecatedApisFound: string[];
    manifestV3Compliant: boolean;
  };
  sandboxCompatibility: {
    isTested: boolean;
    compatibilityGuarantee: 'verified_compatible' | 'experimental' | 'untested' | 'incompatible';
    testResults: {
      chromeMv3Score: number; // 0-100
      firefoxScore: number; // 0-100
      omniNativeScore: number; // 0-100
      notes: string;
    };
  };
  reviewerNotes?: string;
}

export interface ExtensionVersionRelease {
  version: string;
  releaseDate: string;
  changelog: string;
  manifestJsonSnippet: string;
  packageSizeBytes: number;
  packageSha256: string;
  reviewStatus: ExtensionReviewStatus;
  reviewReport?: ExtensionSecurityReviewReport;
}

export interface OmniDeveloperExtensionItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  descriptionMarkdown: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorVerified: boolean;
  icon: string;
  bannerImage?: string;
  category: 'productivity' | 'developer' | 'security' | 'privacy' | 'ai' | 'finance' | 'creative' | 'enterprise';
  architecture: ExtensionArchitectureTarget;
  supportedArchitectures: ExtensionArchitectureTarget[];
  currentVersion: string;
  versions: ExtensionVersionRelease[];
  reviewStatus: ExtensionReviewStatus;
  latestReviewReport?: ExtensionSecurityReviewReport;
  pricingModel: ExtensionPricingModel;
  priceUsd: number;
  revenueShareCreatorPercent: number; // e.g., 90 (OMNI Core billing handles 10% platform, 90% creator)
  monthlySubPriceUsd?: number;
  enterpriseSeatPriceUsd?: number;
  isEnterpriseEligible: boolean;
  isInstalledInBrowser?: boolean;
  isPurchased?: boolean;
  activeInstallsCount: number;
  totalRevenueUsd: number;
  ratingAverage: number;
  ratingCount: number;
  permissionsRequired: string[];
  optionsPageUrl?: string;
  repositoryUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExtensionDeveloperProfile {
  developerId: string;
  displayName: string;
  orgName: string;
  email: string;
  didPassport: string;
  isKycVerified: boolean;
  payoutWalletAddress: string;
  totalSubmissions: number;
  publishedCount: number;
  accruedRevenueUsd: number;
  pendingPayoutUsd: number;
  tier: 'community' | 'verified_partner' | 'enterprise_isv';
}

export interface ExtensionStoreFilter {
  category: string;
  architecture: string;
  pricing: string;
  searchQuery: string;
  sortBy: 'featured' | 'popular' | 'rating' | 'newest';
}
