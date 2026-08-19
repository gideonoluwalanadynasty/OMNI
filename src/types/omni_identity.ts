/**
 * OMNI DIGITAL IDENTITY SYSTEM & USERNAME REGISTRY TYPES
 * Application ID: connect
 * Module: Identity, Usernames, Profiles, Omni Pages, Custom Domains, Verification & Privacy
 * 
 * Reuses OMNI Passport, Identity, Organizations, Permissions, Finance OS, AI, Ads, Marketplace
 */

import { ConnectProfileType } from './omni_connect';

// ============================================================================
// 1. UNIVERSAL USERNAME REGISTRY & RULES
// ============================================================================

export type UsernameStatus = 'active' | 'reserved' | 'premium' | 'suspended' | 'historical_redirect';

export interface UsernameRecord {
  id: string;
  username: string; // e.g. "gideon", "fenol", "ecclesiaglobal"
  profileId: string;
  tenantId: string;
  status: UsernameStatus;
  isPrimary: boolean;
  assignedAt: string;
  previousUsernames: string[];
  redirectTargetUsername?: string;
  canonicalUrl: string; // e.g. "omni.com/@gideon"
  subdomainUrl: string; // e.g. "gideon.omni.com"
  customDomain?: string; // e.g. "www.fenolsolutions.com"
}

export interface UsernameRuleConfig {
  minLength: number;
  maxLength: number;
  allowedRegex: string; // e.g. "^[a-z0-9_.-]+$"
  allowUppercase: boolean;
  reservedKeywords: string[];
  premiumKeywords: string[];
  coolDownDaysBetweenChanges: number;
}

// ============================================================================
// 2. PROFILE TYPES & RICH DOMAIN ENRICHMENTS
// ============================================================================

export type VerificationBadgeType =
  | 'none'
  | 'verified_human'      // Blue check
  | 'verified_creator'    // Purple star
  | 'verified_business'   // Gold shield
  | 'verified_official'   // Emerald government / institution badge
  | 'verified_faith';     // Amber fellowship badge

export interface SocialLink {
  platform: 'omni' | 'website' | 'github' | 'linkedin' | 'x' | 'youtube' | 'instagram' | 'telegram';
  url: string;
  label: string;
}

export interface PersonalProfileEnrichment {
  location: string;
  languages: string[];
  interests: string[];
  skills: string[];
  availabilityStatus: 'open_to_collaborate' | 'busy' | 'speaking_engagements' | 'offline';
  websiteLinks: SocialLink[];
  featuredPostIds: string[];
  joinedCommunitiesCount: number;
}

export interface CreatorProfileEnrichment {
  creatorCategory: 'Fintech & Tech' | 'Education & Science' | 'Music & Arts' | 'Faith & Ministry' | 'Business & Investing';
  subscribersCount: number;
  monthlyRevenueUsd: number;
  monetizationEnabled: boolean;
  membershipTiers: {
    id: string;
    name: string;
    priceUsdMonth: number;
    benefits: string[];
    subscribersCount: number;
  }[];
  courses: {
    id: string;
    title: string;
    modulesCount: number;
    studentsCount: number;
    priceUsd: number;
    thumbnailUrl: string;
  }[];
  mediaGallery: {
    id: string;
    title: string;
    type: 'video' | 'audio' | 'article' | 'podcast';
    durationOrLength: string;
    viewsCount: number;
    mediaUrl: string;
  }[];
  connectedFinanceWalletId: string;
  omniAdsRevenueSharePercent: number;
}

export interface BusinessProfileEnrichment {
  companyRegistrationNumber: string;
  taxVatNumber: string;
  foundedYear: number;
  headquartersAddress: string;
  operatingHours: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    hours: string;
    isOpen: boolean;
  }[];
  contactOptions: {
    email: string;
    phone: string;
    whatsappNumber?: string;
    supportPortalUrl?: string;
  };
  services: {
    id: string;
    title: string;
    description: string;
    startingPriceUsd: number;
    serviceCategory: string;
  }[];
  verifiedReviews: {
    id: string;
    authorName: string;
    authorAvatar: string;
    rating: number; // 1 to 5
    reviewText: string;
    date: string;
    verifiedPurchase: boolean;
  }[];
  averageRating: number;
  totalReviewsCount: number;
  teamMembersCount: number;
  crmIntegrationActive: boolean;
}

export interface OrganisationProfileEnrichment {
  orgType: 'church_ministry' | 'school_university' | 'ngo_nonprofit' | 'government_body' | 'community_network';
  governingCouncil: string[];
  membersCount: number;
  announcements: {
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    priority: 'normal' | 'urgent' | 'broadcast';
  }[];
  downloadableResources: {
    id: string;
    title: string;
    format: 'PDF' | 'EPUB' | 'ZIP' | 'DOCX';
    fileSizeBytes: number;
    downloadUrl: string;
  }[];
  donationCampaigns: {
    id: string;
    title: string;
    causeDescription: string;
    targetAmountUsd: number;
    raisedAmountUsd: number;
    donorsCount: number;
    acceptsRecurringTithe: boolean;
    financeLedgerAccountId: string;
  }[];
  affiliatedBranches: {
    id: string;
    branchName: string;
    locationCity: string;
    pastorOrLeadName: string;
    membersCount: number;
  }[];
}

export interface EnterpriseProfileEnrichment {
  enterpriseSubsidiaries: string[];
  slaTier: 'mission_critical' | 'enterprise_gold' | 'custom_tier1';
  complianceCertifications: string[]; // e.g. ["ISO-27001", "SOC2 Type II", "GDPR", "PCI-DSS Level 1"]
  ssoConfiguration: {
    provider: 'OMNI Passport SAML 2.0' | 'OIDC' | 'ActiveDirectory';
    enforcedForDomains: string[];
  };
  dedicatedSupportEngineer: string;
}

export interface UniversalOmniProfile {
  id: string;
  tenantId: string;
  userId: string;
  username: string; // e.g. "gideon"
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  profileType: ConnectProfileType;
  verificationBadge: VerificationBadgeType;
  reputationScore: number;
  countryCode: string;
  language: string;
  isPrivate: boolean;
  allowDirectMessages: 'everyone' | 'followers' | 'verified_only' | 'none';
  customLinks: SocialLink[];
  customDomain?: string;
  subdomain: string; // e.g. "gideon.omni.com"
  canonicalUrl: string; // e.g. "omni.com/@gideon"
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
    communitiesCount: number;
    reputationPoints: number;
  };
  personalData?: PersonalProfileEnrichment;
  creatorData?: CreatorProfileEnrichment;
  businessData?: BusinessProfileEnrichment;
  organisationData?: OrganisationProfileEnrichment;
  enterpriseData?: EnterpriseProfileEnrichment;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 3. OMNI PAGE BUILDER & TEMPLATES (Turn Profiles into Websites)
// ============================================================================

export type PageTemplateCategory =
  | 'business'
  | 'creator'
  | 'portfolio'
  | 'church'
  | 'school'
  | 'company'
  | 'ngo'
  | 'community'
  | 'store';

export type PageSectionType =
  | 'home'
  | 'about'
  | 'products'
  | 'services'
  | 'courses'
  | 'events'
  | 'community'
  | 'media'
  | 'contact'
  | 'reviews'
  | 'donations';

export interface PageSectionConfig {
  id: string;
  type: PageSectionType;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
  contentCustomization?: Record<string, any>;
}

export interface OmniPageConfig {
  id: string;
  profileId: string;
  tenantId: string;
  slug: string;
  siteTitle: string;
  tagline: string;
  templateCategory: PageTemplateCategory;
  theme: {
    primaryColor: string;
    accentColor: string;
    fontFamily: string;
    darkModeDefault: boolean;
    heroBannerVariant: 'gradient_minimal' | 'full_cover' | 'video_canvas' | 'split_showcase';
  };
  sections: PageSectionConfig[];
  isPublished: boolean;
  publishedUrl: string;
  customDomain?: string;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
    ogImageUrl: string;
  };
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
    conversionRatePercent: number;
  };
  updatedAt: string;
}

export interface OmniPageTemplateDefinition {
  category: PageTemplateCategory;
  name: string;
  description: string;
  badge: string;
  recommendedFor: string;
  previewThumbnail: string;
  defaultSections: PageSectionType[];
  defaultPrimaryColor: string;
  defaultAccentColor: string;
}

// ============================================================================
// 4. CUSTOM DOMAINS, DNS VERIFICATION & SSL ENGINE
// ============================================================================

export type CustomDomainStatus = 'active' | 'pending_dns' | 'issuing_ssl' | 'dns_failed' | 'expired';

export interface DnsRecordRequirement {
  type: 'CNAME' | 'A' | 'TXT';
  name: string; // e.g. "@" or "www" or "_omni-challenge"
  value: string; // e.g. "connect.omni.com" or "omni-verify=x89f2a..."
  ttl: number;
  isVerified: boolean;
}

export interface CustomDomainRecord {
  id: string;
  profileId: string;
  tenantId: string;
  domain: string; // e.g. "www.fenolsolutions.com" or "ecclesiaglobal.org"
  domainType: 'omni_subdomain' | 'custom_apex' | 'custom_subdomain';
  status: CustomDomainStatus;
  dnsRecords: DnsRecordRequirement[];
  sslCertificate: {
    issuer: string; // e.g. "Let's Encrypt Authority X3" | "Cloudflare Zero Trust Edge"
    validUntil: string;
    isAutoRenewing: boolean;
  };
  targetPageId?: string;
  routingTarget: string; // e.g. "connect.omni.com/@fenol"
  createdAt: string;
  lastCheckedAt: string;
}

// ============================================================================
// 5. VERIFICATION SYSTEM & WORKFLOW
// ============================================================================

export type VerificationStatus = 'draft' | 'pending_review' | 'under_investigation' | 'approved' | 'rejected' | 'info_requested';

export interface VerificationDocument {
  id: string;
  docType: 'government_id' | 'business_registration' | 'tax_exemption_501c3' | 'ecclesiastical_charter' | 'press_credential' | 'utility_bill';
  fileName: string;
  fileSizeBytes: number;
  uploadedAt: string;
  checksumSha256: string;
  status: 'verified_authentic' | 'pending_ocr' | 'flagged';
}

export interface VerificationApplication {
  id: string;
  profileId: string;
  tenantId: string;
  applicantLegalName: string;
  applicantEmail: string;
  entityType: 'person' | 'creator' | 'business' | 'organization' | 'government';
  requestedBadge: VerificationBadgeType;
  category: string;
  justificationText: string;
  officialWebsiteUrl: string;
  documents: VerificationDocument[];
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  assignedBadge?: VerificationBadgeType;
  merkleAuditProof?: string;
}

// ============================================================================
// 6. GRANULAR PRIVACY SETTINGS
// ============================================================================

export interface IdentityPrivacySettings {
  profileVisibility: 'public' | 'followers_only' | 'private' | 'custom_circle';
  allowDirectMessages: 'everyone' | 'followers' | 'verified_only' | 'none';
  whoCanFollow: 'everyone' | 'approval_required' | 'none';
  contentVisibility: 'public' | 'followers_only';
  showOnlineStatus: boolean;
  showFollowersList: boolean;
  showFinancialBadges: boolean;
  allowSearchEngineIndexing: boolean;
  twoFactorEnforced: boolean;
}
