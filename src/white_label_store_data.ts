import { AppRegistration } from './types';

// White-Label Types
export type WhiteLabelLevel = 'level_1_app' | 'level_2_suite' | 'level_3_super_platform';

export interface ColorSystem {
  primary: string;       // HEX e.g., "#0F172A"
  secondary: string;     // HEX
  background: string;    // HEX
  surface: string;       // HEX
  accent: string;        // HEX
  text: string;          // HEX
}

export interface TypographyConfig {
  displayFont: string;  // e.g., "Playfair Display", "Plus Jakarta Sans"
  bodyFont: string;     // e.g., "Inter", "Sora"
  baseSize: string;     // e.g., "16px"
  lineHeight: number;   // e.g., 1.6
}

export interface TerminologyConfig {
  platformName: string; // e.g., "LearnHub"
  appsLabel: string;    // e.g., "Modules"
  merchantLabel: string;// e.g., "Sellers"
  customerLabel: string;// e.g., "Students"
  walletLabel: string;  // e.g., "Balance"
  affiliateLabel: string;// e.g., "Partners"
}

export interface LegalPage {
  title: string;
  slug: string;
  content: string;
}

export interface DomainConfig {
  subdomain: string;        // tenant.omni.com
  customDomain?: string;    // customdomain.com
  appDomain?: string;       // app.customdomain.com
  dnsStatus: 'verified' | 'unverified' | 'propagating';
  txtRecordName: string;
  txtRecordValue: string;
  cnameTarget: string;
  sslStatus: 'active' | 'generating' | 'expired' | 'inactive';
  canonicalSelection: 'subdomain' | 'custom' | 'app_custom';
}

export interface WhiteLabelTemplate {
  id: string;
  name: string;
  category: string;
  layout: 'sidebar' | 'topbar' | 'bento' | 'minimalist_cards';
  sections: string[];
  colorSystem: ColorSystem;
  typography: TypographyConfig;
  terminology: TerminologyConfig;
  appIds: string[];
  homepageHeadline: string;
  homepageSubheadline: string;
  footerText: string;
  emailHeaderHex: string;
  legalPages: LegalPage[];
}

export interface TenantPlatform {
  id: string;
  name: string;
  ownerOrgId: string; // the organization that owns this tenant platform
  ownerUserId: string;
  level: WhiteLabelLevel;
  slug: string;
  logoUrl?: string;
  faviconUrl?: string;
  templateId: string;
  apps: string[]; // App IDs configured
  domain: DomainConfig;
  branding: {
    colorSystem: ColorSystem;
    typography: TypographyConfig;
    terminology: TerminologyConfig;
    homepageHeadline: string;
    homepageSubheadline: string;
    footerText: string;
    emailHeaderHex: string;
    navigationItems: { label: string; href: string }[];
  };
  countries: string[];
  currencies: string[];
  languages: string[];
  pricing: {
    baseMonthlyFee: number;
    revenueSharePercent: number;
    payoutMethod: string;
  };
  commissions: {
    referralRatePercent: number;
    minimumCommitment: number;
  };
  analytics: {
    visitors24h: number;
    registrations30d: number;
    volume30d: number;
  };
  status: 'active' | 'paused' | 'onboarding';
  createdAt: string;
}

// Reseller Hierarchy & Economics
export interface ResellerNode {
  id: string;
  name: string;
  type: 'omni' | 'master_reseller' | 'reseller' | 'tenant' | 'end_customer';
  parentId: string | null;
  orgId?: string;
  status: 'active' | 'suspended';
  level: number; // nesting constraint tracker
}

export interface ResellerEconomics {
  id: string;
  resellerNodeId: string;
  wholesalePriceUsd: number; // price reseller pays OMNI
  resellerMarkupPercent: number; // markup reseller applies
  recurringRevenueSharePercent: number; // rev share on tenant subscriptions
  commissionPercent: number; // commissions on transactional volumes
  minimumCommitmentUsd: number; // monthly contract commitments
  tierPricing: { maxTenants: number; costPerTenantUsd: number }[];
}

// Platform Owner Controls (Super Admin Settings)
export interface SuperAdminWhiteLabelControl {
  permittedApps: string[]; // App IDs allowed to be white-labeled
  minimumMonthlyPriceUsd: number;
  defaultRevenueSharePercent: number;
  allowedCountries: string[];
  resourceLimits: {
    maxStorageGb: number;
    maxTenantsPerReseller: number;
    maxDomainsPerTenant: number;
  };
  brandingRestrictions: {
    customFaviconsAllowed: boolean;
    poweredByOmniFooterRequired: boolean;
  };
  policyRequirements: {
    mfaRequiredForOperators: boolean;
    kybRequiredBeforeLaunch: boolean;
  };
}

export const SEED_SUPER_ADMIN_CONTROLS: SuperAdminWhiteLabelControl = {
  permittedApps: ['app_learn', 'app_books', 'app_pay', 'app_market', 'app_creator', 'app_business', 'app_logistics', 'app_ads'],
  minimumMonthlyPriceUsd: 149.00,
  defaultRevenueSharePercent: 5.0,
  allowedCountries: ['US', 'CA', 'GB', 'DE', 'ZA', 'NG', 'KE', 'JP', 'SG', 'BR'],
  resourceLimits: {
    maxStorageGb: 500,
    maxTenantsPerReseller: 25,
    maxDomainsPerTenant: 3,
  },
  brandingRestrictions: {
    customFaviconsAllowed: true,
    poweredByOmniFooterRequired: false,
  },
  policyRequirements: {
    mfaRequiredForOperators: true,
    kybRequiredBeforeLaunch: true,
  }
};

// 30 Premium Preset Configurations
export const BRAND_PRESETS: WhiteLabelTemplate[] = [
  {
    id: 'tpl_marketplace',
    name: 'General Marketplace',
    category: 'E-commerce',
    layout: 'bento',
    sections: ['Hero Grid', 'Universal Search', 'Dynamic Directory', 'Featured Merchants', 'Ecosystem Showcase', 'Platform Trust Badges'],
    colorSystem: { primary: '#1E293B', secondary: '#334155', background: '#F8FAFC', surface: '#FFFFFF', accent: '#3B82F6', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniMarket', appsLabel: 'Ecosystems', merchantLabel: 'Venders', customerLabel: 'Buyers', walletLabel: 'Tokens', affiliateLabel: 'Advocates' },
    appIds: ['app_market', 'app_pay', 'app_ads'],
    homepageHeadline: 'The Universal Peer-to-Peer digital exchange catalog',
    homepageSubheadline: 'Secure checkout, instant ledger clearance, and direct logistics dispatch.',
    footerText: 'Powered by OMNI Core Relational Infrastructure.',
    emailHeaderHex: '#3B82F6',
    legalPages: [
      { title: 'Terms of Fair Trading', slug: 'terms', content: 'Trading must be transparent. Ledger settlement completes within standard 14ms cycles.' },
      { title: 'Refund Protocol', slug: 'refunds', content: 'Disputes are resolved on-chain using accredited OMNI mediators.' }
    ]
  },
  {
    id: 'tpl_luxury',
    name: 'Luxury Commerce',
    category: 'E-commerce',
    layout: 'minimalist_cards',
    sections: ['Editorial Hero', 'Private Showcase', 'Artisan Biographies', 'Curated Ledger Categories', 'White-Glove Support Widget'],
    colorSystem: { primary: '#111111', secondary: '#1E1E1E', background: '#FAF9F6', surface: '#FFFFFF', accent: '#D4AF37', text: '#1C1C1C' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Sora', baseSize: '15px', lineHeight: 1.7 },
    terminology: { platformName: 'Pavilion', appsLabel: 'Collections', merchantLabel: 'Ateliers', customerLabel: 'Patrons', walletLabel: 'Reserves', affiliateLabel: 'Connoisseurs' },
    appIds: ['app_market', 'app_pay'],
    homepageHeadline: 'An Uncompromising Gateway to Refined Acquisitions',
    homepageSubheadline: 'Bespoke goods secured via cryptographically guaranteed multi-currency transactions.',
    footerText: 'The Pavilion. All reserves accounted via OMNI Ledger. Exclusive access.',
    emailHeaderHex: '#D4AF37',
    legalPages: [
      { title: 'Authenticity Pledge', slug: 'authenticity', content: 'Every single luxury consignment holds a unique, non-repudiable OMNI Certificate of Provenance.' }
    ]
  },
  {
    id: 'tpl_fashion',
    name: 'Fashion Hub',
    category: 'E-commerce',
    layout: 'topbar',
    sections: ['Lookbook Carousels', 'Seasonal Drops', 'Trending Styles', 'Size Guides', 'Social Grid Integration'],
    colorSystem: { primary: '#09090B', secondary: '#27272A', background: '#FAFAFA', surface: '#FFFFFF', accent: '#EC4899', text: '#18181B' },
    typography: { displayFont: 'DM Sans', bodyFont: 'Sora', baseSize: '16px', lineHeight: 1.55 },
    terminology: { platformName: 'Trendline', appsLabel: 'Boutiques', merchantLabel: 'Designers', customerLabel: 'Stylists', walletLabel: 'Credit', affiliateLabel: 'Inspirers' },
    appIds: ['app_market', 'app_pay', 'app_ads'],
    homepageHeadline: 'Reimagine self-expression on a sovereign platform',
    homepageSubheadline: 'Instant merchant onboarding and real-time commission tracking for creators.',
    footerText: 'Trendline Logistics are powered by OMNI routing algorithms.',
    emailHeaderHex: '#EC4899',
    legalPages: [{ title: 'Ethics & Circularity', slug: 'ethical-policy', content: 'Our supply chain adheres strictly to OMNI cold-chain and labor audit telemetry.' }]
  },
  {
    id: 'tpl_beauty',
    name: 'Beauty Wellness',
    category: 'Health & Beauty',
    layout: 'sidebar',
    sections: ['Skincare Selector', 'Expert Consultations', 'Clean Ingredient Transparency', 'Subscription Boxes', 'Community Reviews'],
    colorSystem: { primary: '#4A3731', secondary: '#5D4037', background: '#FDFBF7', surface: '#FFFFFF', accent: '#E0A899', text: '#3E2723' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Plus Jakarta Sans', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'Botanica', appsLabel: 'Therapies', merchantLabel: 'Estheticians', customerLabel: 'Members', walletLabel: 'Points', affiliateLabel: 'Enthusiasts' },
    appIds: ['app_market', 'app_pay', 'app_learn'],
    homepageHeadline: 'Organic Care Grounded in Botanical Science',
    homepageSubheadline: 'Clean formulas certified via transparent supply tracking ledger logs.',
    footerText: 'Botanica Ecosystem. Verified safe, verified authentic.',
    emailHeaderHex: '#E0A899',
    legalPages: [{ title: 'Ingredient Verification Policy', slug: 'ingredients', content: 'All botanical extracts are certified on-ledger by independent laboratories.' }]
  },
  {
    id: 'tpl_electronics',
    name: 'Electronics & Tech',
    category: 'E-commerce',
    layout: 'bento',
    sections: ['Spec Comparison Matrix', 'Flash Tech Sales', 'Verified Refurbished Drops', 'Teardown Guides', 'Extended Warranty Ledger'],
    colorSystem: { primary: '#0F172A', secondary: '#1E293B', background: '#020617', surface: '#0F172A', accent: '#10B981', text: '#F8FAFC' },
    typography: { displayFont: 'Sora', bodyFont: 'Sora', baseSize: '15px', lineHeight: 1.6 },
    terminology: { platformName: 'VoltSource', appsLabel: 'Devices', merchantLabel: 'Integrators', customerLabel: 'Operators', walletLabel: 'Power', affiliateLabel: 'Affiliates' },
    appIds: ['app_market', 'app_pay', 'app_cloud'],
    homepageHeadline: 'State-of-the-art silicon and edge hardware logistics',
    homepageSubheadline: 'Real-time serial code ownership tracking via global OMNI inventory databases.',
    footerText: 'VoltSource is built fully open-source with OMNI database telemetry.',
    emailHeaderHex: '#10B981',
    legalPages: [{ title: 'Electronics Recyclability Index', slug: 'recycling', content: 'Our hardware recycling programs map component reuse audits on OMNI ledger.' }]
  },
  {
    id: 'tpl_grocery',
    name: 'Grocery & Fresh',
    category: 'Retail',
    layout: 'topbar',
    sections: ['Neighborhood Store Locator', 'Farm-to-Table Telemetry', 'Weekly Fresh Bundles', 'Aisles Directory', 'Fast Routing Dispatcher'],
    colorSystem: { primary: '#14532D', secondary: '#166534', background: '#F0FDF4', surface: '#FFFFFF', accent: '#22C55E', text: '#14532D' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'FreshSprout', appsLabel: 'Grocers', merchantLabel: 'Farmers', customerLabel: 'Kitchens', walletLabel: 'Cabbage', affiliateLabel: 'Locals' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Fresh, local, and audited farm-to-table logistics',
    homepageSubheadline: 'Real-time refrigeration tracking via continuous OMNI cold-chain telemetry logs.',
    footerText: 'FreshSprout local routing maps verified under global standards.',
    emailHeaderHex: '#22C55E',
    legalPages: [{ title: 'Food Traceability Pledge', slug: 'traceability', content: 'All fresh items log harvest times, soil profiles, and cold carrier temperatures.' }]
  },
  {
    id: 'tpl_books',
    name: 'Books & Publishing',
    category: 'Media',
    layout: 'sidebar',
    sections: ['Publishers Row', 'Independent Authors Catalog', 'Sample Audio Player', 'Bestseller Ticker', 'Review Ledger'],
    colorSystem: { primary: '#451A03', secondary: '#78350F', background: '#FFFBEB', surface: '#FFFFFF', accent: '#D97706', text: '#451A03' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.65 },
    terminology: { platformName: 'ExLibris', appsLabel: 'Libraries', merchantLabel: 'Authors', customerLabel: 'Readers', walletLabel: 'Ink', affiliateLabel: 'Reviewers' },
    appIds: ['app_books', 'app_learn', 'app_pay'],
    homepageHeadline: 'Direct peer-to-peer publishing and literary distribution',
    homepageSubheadline: 'Decentralized royalty allocation rules distribute 95% of proceeds instantly to authors.',
    footerText: 'ExLibris books use secure cryptographic verification certificates.',
    emailHeaderHex: '#D97706',
    legalPages: [{ title: 'Fair Royalties Pledge', slug: 'royalties', content: 'Traditional publishers take 85%. ExLibris maps 95% straight to author wallets.' }]
  },
  {
    id: 'tpl_education',
    name: 'Education Academy',
    category: 'Media',
    layout: 'sidebar',
    sections: ['Syllabus Path Analyzer', 'Live Seminars', 'Certificates Ledger', 'Educator Profiles', 'Interactive Assessments'],
    colorSystem: { primary: '#1E3A8A', secondary: '#1E40AF', background: '#EFF6FF', surface: '#FFFFFF', accent: '#3B82F6', text: '#1E3A8A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniLearn', appsLabel: 'Academics', merchantLabel: 'Mentors', customerLabel: 'Scholars', walletLabel: 'Grants', affiliateLabel: 'Ambassadors' },
    appIds: ['app_learn', 'app_books', 'app_pay'],
    homepageHeadline: 'Professional skills development & verified certifications',
    homepageSubheadline: 'Earn verifiable credentials written on the secure, non-editable OMNI database.',
    footerText: 'Certifications and courses verified by accredited OMNI academic entities.',
    emailHeaderHex: '#3B82F6',
    legalPages: [{ title: 'Credential Verifiability', slug: 'credentials', content: 'Our certification ledger permits anyone to audit verification logs via public APIs.' }]
  },
  {
    id: 'tpl_creator',
    name: 'Creator Studio',
    category: 'Media',
    layout: 'bento',
    sections: ['Media Synthesizer', 'Royalty split-contracts', 'Content drops', 'Subscription channels', 'Sponsor integrations'],
    colorSystem: { primary: '#581C87', secondary: '#6B21A8', background: '#FAF5FF', surface: '#FFFFFF', accent: '#A855F7', text: '#581C87' },
    typography: { displayFont: 'Sora', bodyFont: 'Plus Jakarta Sans', baseSize: '16px', lineHeight: 1.5 },
    terminology: { platformName: 'Sovereign', appsLabel: 'Channels', merchantLabel: 'Creators', customerLabel: 'Fans', walletLabel: 'Points', affiliateLabel: 'Partners' },
    appIds: ['app_creator', 'app_pay', 'app_ads'],
    homepageHeadline: 'Take back control of your media and creative audience',
    homepageSubheadline: 'Enforce real-time programmatic royalty splits on every stream and asset purchase.',
    footerText: 'Sovereign is the creator infrastructure built on OMNI double-entry ledgers.',
    emailHeaderHex: '#A855F7',
    legalPages: [{ title: 'Creator Rights and Splits', slug: 'rights', content: 'Media splits execute immediately when licensing fees post to the OMNI Ledger.' }]
  },
  {
    id: 'tpl_streaming',
    name: 'Streaming Video',
    category: 'Media',
    layout: 'bento',
    sections: ['Video Live Theatre', 'Creator Channels', 'Pay-Per-View Smart Gate', 'Stream Schedules', 'Direct Audience Support'],
    colorSystem: { primary: '#09090B', secondary: '#18181B', background: '#09090B', surface: '#18181B', accent: '#E11D48', text: '#FAFAFA' },
    typography: { displayFont: 'DM Sans', bodyFont: 'DM Sans', baseSize: '15px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniStream', appsLabel: 'Theatres', merchantLabel: 'Broadcasters', customerLabel: 'Viewers', walletLabel: 'Credits', affiliateLabel: 'Referrers' },
    appIds: ['app_creator', 'app_pay', 'app_ads'],
    homepageHeadline: 'High-fidelity audio-visual streaming with direct ledger tips',
    homepageSubheadline: 'Bypass traditional corporate streaming networks. Direct monetization pipelines.',
    footerText: 'OmniStream video server farms operate on sustainable edge structures.',
    emailHeaderHex: '#E11D48',
    legalPages: [{ title: 'Copyright & DMCA Registry', slug: 'copyright', content: 'DMCA notices verify stream and recording asset hashes against original digital registry files.' }]
  },
  {
    id: 'tpl_property',
    name: 'Real Estate & Land',
    category: 'Services',
    layout: 'sidebar',
    sections: ['Property Directory', 'Geographical Registry Maps', 'Rental Escrow Tracker', 'Document Verification Terminal', 'Leasing Schedule'],
    colorSystem: { primary: '#134E5E', secondary: '#246A73', background: '#F2F7F7', surface: '#FFFFFF', accent: '#0E9F6E', text: '#134E5E' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'AcreLedger', appsLabel: 'Leases', merchantLabel: 'Hosts', customerLabel: 'Tenants', walletLabel: 'Escrows', affiliateLabel: 'Brokers' },
    appIds: ['app_business', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Verifiable Real Estate, Land Title, and Escrow Platforms',
    homepageSubheadline: 'Secure title transfers and programmatic rental payments written directly to the ledger.',
    footerText: 'AcreLedger is audited under sovereign land boundary registries.',
    emailHeaderHex: '#0E9F6E',
    legalPages: [{ title: 'Escrow Regulations & Protection', slug: 'escrow-rules', content: 'Rent balances remain locked in automated multi-sig escrows until terms verify.' }]
  },
  {
    id: 'tpl_automotive',
    name: 'Automotive & Fleet',
    category: 'Retail',
    layout: 'topbar',
    sections: ['Vehicle Inventory Grid', 'Parts Registry', 'Fleet Tracking Analytics', 'Maintenance Schedules', 'Direct Purchase Escrow'],
    colorSystem: { primary: '#1E293B', secondary: '#475569', background: '#F8FAFC', surface: '#FFFFFF', accent: '#DC2626', text: '#0F172A' },
    typography: { displayFont: 'Sora', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.5 },
    terminology: { platformName: 'OmniDrive', appsLabel: 'Garages', merchantLabel: 'Dealers', customerLabel: 'Drivers', walletLabel: 'Tokens', affiliateLabel: 'Agents' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Automotive Fleet management and verified title registers',
    homepageSubheadline: 'Verify maintenance history records and part replacement tracking logs.',
    footerText: 'OmniDrive. Transparent mechanical audits via the OMNI ledger.',
    emailHeaderHex: '#DC2626',
    legalPages: [{ title: 'Odometer & Accident Disclosure', slug: 'disclosure', content: 'Accident profiles and odometer readings write non-modifiable records on OMNI.' }]
  },
  {
    id: 'tpl_travel',
    name: 'Travel & Itineraries',
    category: 'Services',
    layout: 'topbar',
    sections: ['Destination Directory', 'Dynamic Booking Calendar', 'Flight Connection Ledger', 'Travel Guide Network', 'Escrow Insured Payments'],
    colorSystem: { primary: '#0891B2', secondary: '#0E7490', background: '#ECFEFF', surface: '#FFFFFF', accent: '#06B6D4', text: '#083344' },
    typography: { displayFont: 'DM Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'WanderLedger', appsLabel: 'Adventures', merchantLabel: 'Guides', customerLabel: 'Travelers', walletLabel: 'Reserves', affiliateLabel: 'Explorers' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Programmatic travel reservations and tour escrows',
    homepageSubheadline: 'Instant host payout settlement matching check-in telemetry indicators.',
    footerText: 'WanderLedger travel insurances verify automatically via systemic event feeds.',
    emailHeaderHex: '#06B6D4',
    legalPages: [{ title: 'Host Fair Treatment Charter', slug: 'host-terms', content: 'Host bookings settle instantly at checkout, backed by automatic cancellation refund algorithms.' }]
  },
  {
    id: 'tpl_healthcare',
    name: 'Healthcare Portal',
    category: 'Services',
    layout: 'sidebar',
    sections: ['Clinician Schedule Builder', 'Telehealth video interface', 'Prescription Registry', 'Insurance Claims Ledger', 'Symptom Analyzer'],
    colorSystem: { primary: '#1E3A8A', secondary: '#1E40AF', background: '#F0F9FF', surface: '#FFFFFF', accent: '#0D9488', text: '#1E3A8A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'PulseHealth', appsLabel: 'Clinics', merchantLabel: 'Doctors', customerLabel: 'Patients', walletLabel: 'HealthCaps', affiliateLabel: 'Providers' },
    appIds: ['app_business', 'app_pay', 'app_learn'],
    homepageHeadline: 'Secure Clinical Scheduling, Prescriptions, and Claims',
    homepageSubheadline: 'Frictionless, HIPAA-compliant patient operations on standard schemas.',
    footerText: 'PulseHealth medical records are cryptographically sealed to ensure patient sovereignty.',
    emailHeaderHex: '#0D9488',
    legalPages: [{ title: 'HIPAA & Patient Privacy Compliance', slug: 'privacy', content: 'Electronic records encrypt securely. Doctors require patient-signed digital access keys.' }]
  },
  {
    id: 'tpl_agriculture',
    name: 'Agriculture Farm-Link',
    category: 'Retail',
    layout: 'bento',
    sections: ['Produce Futures Exchange', 'Farm Logistics Dispatch', 'Silo Inventory Telemetry', 'Agri-Credit Applications', 'Market Price index'],
    colorSystem: { primary: '#365314', secondary: '#4D7C0F', background: '#F7FEE7', surface: '#FFFFFF', accent: '#65A30D', text: '#1A2E05' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'FarmLink', appsLabel: 'Cooperatives', merchantLabel: 'Growers', customerLabel: 'Agros', walletLabel: 'Seeds', affiliateLabel: 'Resellers' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Direct Produce Futures and Agricultural Logistics',
    homepageSubheadline: 'Eliminate middleman fees. Connect family cooperatives directly to corporate buyers.',
    footerText: 'FarmLink trading is backed by automated invoice and transport telemetry.',
    emailHeaderHex: '#65A30D',
    legalPages: [{ title: 'Fair Trade Sourcing', slug: 'fair-trade', content: 'Buyer pricing formulas ensure cooperative growers pocket 90% of final terminal prices.' }]
  },
  {
    id: 'tpl_industrial',
    name: 'Industrial Spares',
    category: 'E-commerce',
    layout: 'sidebar',
    sections: ['CAD Model blueprint validation', 'OEM Parts catalog', 'Machinery Fleet Telemetry', 'Procurement RFQ Engine', 'Maintenance Logbook'],
    colorSystem: { primary: '#1E293B', secondary: '#334155', background: '#F1F5F9', surface: '#FFFFFF', accent: '#EA580C', text: '#0F172A' },
    typography: { displayFont: 'Sora', bodyFont: 'Inter', baseSize: '15px', lineHeight: 1.65 },
    terminology: { platformName: 'InduSource', appsLabel: 'Warehouses', merchantLabel: 'Suppliers', customerLabel: 'Engineers', walletLabel: 'Credits', affiliateLabel: 'Brokers' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Heavy Equipment Procurement and Fleet Audits',
    homepageSubheadline: 'Programmatic logistics dispatching matched with original manufacturer serial registry verification.',
    footerText: 'InduSource. Verified industrial supply chains and spare tracking catalogs.',
    emailHeaderHex: '#EA580C',
    legalPages: [{ title: 'OEM Warranty Liability', slug: 'warranty', content: 'Machinery warranties maintain on-chain audit trails, tracking run-time hourly load sensors.' }]
  },
  {
    id: 'tpl_b2b',
    name: 'B2B Wholesale Hub',
    category: 'E-commerce',
    layout: 'sidebar',
    sections: ['RFQ Submission Panel', 'Bulk Tier Pricing Calculator', 'Letter of Credit Escrows', 'Corporate KYC Intake', 'Logistics Carrier Registry'],
    colorSystem: { primary: '#0F172A', secondary: '#334155', background: '#F8FAFC', surface: '#FFFFFF', accent: '#2563EB', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniWholesale', appsLabel: 'Distributors', merchantLabel: 'Wholesalers', customerLabel: 'CorporateBuyers', walletLabel: 'LinesOfCredit', affiliateLabel: 'Resellers' },
    appIds: ['app_market', 'app_pay', 'app_business'],
    homepageHeadline: 'Corporate Wholesalers and Letter of Credit Escrows',
    homepageSubheadline: 'Run multi-million dollar contracts on standard programmatic double-entry OMNI ledger layers.',
    footerText: 'OmniWholesale B2B trading framework. Multi-currency and tax compliant.',
    emailHeaderHex: '#2563EB',
    legalPages: [{ title: 'Bulk Supply Disputes', slug: 'disputes', content: 'Commercial disputes hold payment escrows automatically on-ledger during validation cycles.' }]
  },
  {
    id: 'tpl_wholesale',
    name: 'Wholesale Commerce',
    category: 'E-commerce',
    layout: 'topbar',
    sections: ['Wholesale Catalog Directory', 'Direct Logistics Carrier Booking', 'Minimum Order (MOQ) Guards', 'Supplier Audit Logs', 'Consignment Escrow'],
    colorSystem: { primary: '#1E293B', secondary: '#475569', background: '#F1F5F9', surface: '#FFFFFF', accent: '#4F46E5', text: '#0F172A' },
    typography: { displayFont: 'Sora', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.55 },
    terminology: { platformName: 'CoreSupply', appsLabel: 'SupplyLines', merchantLabel: 'Factories', customerLabel: 'Distributors', walletLabel: 'Reserves', affiliateLabel: 'Brokers' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Global Factory-Direct Consignments and Supply Logistics',
    homepageSubheadline: 'Streamline wholesale distributions with integrated cargo and shipping ledger pipelines.',
    footerText: 'CoreSupply wholesale engines operate under international trading frameworks.',
    emailHeaderHex: '#4F46E5',
    legalPages: [{ title: 'Cargo Insurance Allocation', slug: 'insurance', content: 'Consignments auto-insure via smart escrow reserves before freight releases.' }]
  },
  {
    id: 'tpl_local_commerce',
    name: 'Local Neighborhood Commerce',
    category: 'Retail',
    layout: 'bento',
    sections: ['Neighborhood Store Finder', 'Local Courier Dispatcher', 'Community Bulletin', 'Cooperative Pricing Pools', 'Fast Pickup Planner'],
    colorSystem: { primary: '#0F172A', secondary: '#1E293B', background: '#F8FAFC', surface: '#FFFFFF', accent: '#D97706', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'TownSquare', appsLabel: 'Shops', merchantLabel: 'Merchants', customerLabel: 'Neighbors', walletLabel: 'TownTokens', affiliateLabel: 'Promoters' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Sovereign local neighborhood digital trade circles',
    homepageSubheadline: 'Frictionless peer-to-peer commerce and localized fast delivery networks.',
    footerText: 'TownSquare. Support your local community merchants directly.',
    emailHeaderHex: '#D97706',
    legalPages: [{ title: 'Community Trading Charter', slug: 'community-charter', content: 'Merchants commit to ethical sourcing and supporting regional cooperative circles.' }]
  },
  {
    id: 'tpl_services',
    name: 'Professional Services',
    category: 'Services',
    layout: 'sidebar',
    sections: ['Consultant Booking Calendars', 'Project Milestones Tracker', 'Programmatic retainer ledger', 'Client Intake Terminal', 'Audit trail logger'],
    colorSystem: { primary: '#1E293B', secondary: '#334155', background: '#F8FAFC', surface: '#FFFFFF', accent: '#2563EB', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'ConsulNet', appsLabel: 'Schedules', merchantLabel: 'Advisors', customerLabel: 'Clients', walletLabel: 'Retainers', affiliateLabel: 'Agents' },
    appIds: ['app_business', 'app_pay', 'app_learn'],
    homepageHeadline: 'Retainer management and professional booking portals',
    homepageSubheadline: 'Lock project retainer milestones on-ledger, releasing funds upon client verification.',
    footerText: 'ConsulNet retains all operations securely inside Dynasty Global standards.',
    emailHeaderHex: '#2563EB',
    legalPages: [{ title: 'Service Level Agreements (SLA)', slug: 'sla', content: 'Advisor milestone deliveries are subjected to automated audit and verification reviews.' }]
  },
  {
    id: 'tpl_restaurant',
    name: 'Restaurant & Dining',
    category: 'Retail',
    layout: 'minimalist_cards',
    sections: ['Menu Directory', 'Table Booking Calendar', 'Chef Showcases', 'Fast Delivery Dispatch', 'Loyalty Points Center'],
    colorSystem: { primary: '#451A03', secondary: '#78350F', background: '#FFFBEB', surface: '#FFFFFF', accent: '#E11D48', text: '#451A03' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Inter', baseSize: '15px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniDining', appsLabel: 'Kitchens', merchantLabel: 'Chefs', customerLabel: 'Diners', walletLabel: 'Tokens', affiliateLabel: 'Guides' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Exquisite Gastronomy booking and fast dispatch pathways',
    homepageSubheadline: 'Real-time kitchen ticket flow integrated with regional delivery couriers.',
    footerText: 'OmniDining. Fine culinary experiences delivered.',
    emailHeaderHex: '#E11D48',
    legalPages: [{ title: 'Dietary & Allergen Policy', slug: 'allergens', content: 'Menus list comprehensive cross-contamination safeguards audited on kitchen onboarding.' }]
  },
  {
    id: 'tpl_digital_products',
    name: 'Digital Products Shop',
    category: 'E-commerce',
    layout: 'bento',
    sections: ['License Key Registry', 'Download Vault Gateway', 'Developer API Intake', 'Storefront Listing', 'Discount Code Manager'],
    colorSystem: { primary: '#020617', secondary: '#0F172A', background: '#020617', surface: '#0F172A', accent: '#3B82F6', text: '#F8FAFC' },
    typography: { displayFont: 'Sora', bodyFont: 'Sora', baseSize: '15px', lineHeight: 1.6 },
    terminology: { platformName: 'ByteStore', appsLabel: 'Packages', merchantLabel: 'Devs', customerLabel: 'Users', walletLabel: 'Bytes', affiliateLabel: 'Affiliates' },
    appIds: ['app_market', 'app_pay', 'app_books'],
    homepageHeadline: 'Instant License Keys and Digital Download Vaults',
    homepageSubheadline: 'Encrypted asset vaults release downloads instantly after checkout confirmation clears.',
    footerText: 'ByteStore operations. Instant verification, secure distribution files.',
    emailHeaderHex: '#3B82F6',
    legalPages: [{ title: 'Single-User License SLA', slug: 'licensing', content: 'Software licenses are bound cryptographically to user OMNI identity certs.' }]
  },
  {
    id: 'tpl_financial_services',
    name: 'Financial Services Portal',
    category: 'Financial',
    layout: 'sidebar',
    sections: ['Double-entry Ledger Audit', 'Treasury Reserves Ticker', 'Smart Loans Calculator', 'Kyb Verified Portals', 'Operational Status Nodes'],
    colorSystem: { primary: '#1E293B', secondary: '#0F172A', background: '#F8FAFC', surface: '#FFFFFF', accent: '#0D9488', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'OmniLedger', appsLabel: 'Books', merchantLabel: 'Institutions', customerLabel: 'Accounts', walletLabel: 'Capital', affiliateLabel: 'Advisors' },
    appIds: ['app_pay', 'app_capital', 'app_business'],
    homepageHeadline: 'Advanced Sovereign Corporate Treasury and Loan Portals',
    homepageSubheadline: 'Secure asset clearance, direct cross-border payments, and loan underwriting pipelines.',
    footerText: 'OMNI Financial Services operate under strict capital verification rules.',
    emailHeaderHex: '#0D9488',
    legalPages: [{ title: 'Capital Reserves Disclosure', slug: 'reserves', content: 'Our treasury pools hold verified double-entry audits, maintaining 100% reserve standards.' }]
  },
  {
    id: 'tpl_corporate',
    name: 'Corporate Workspace',
    category: 'Corporate',
    layout: 'sidebar',
    sections: ['Global Subsidiary Map', 'Active Project Retainers', 'Subsidiary Budget Balances', 'Operational Audit Logbook', 'Developer Webhooks Tester'],
    colorSystem: { primary: '#0F172A', secondary: '#1E293B', background: '#F8FAFC', surface: '#FFFFFF', accent: '#1E3A8A', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'EnterpriseCore', appsLabel: 'Sectors', merchantLabel: 'Subsidiaries', customerLabel: 'Operators', walletLabel: 'Budgets', affiliateLabel: 'Agents' },
    appIds: ['app_business', 'app_pay', 'app_cloud'],
    homepageHeadline: 'Unified Corporate Operational Retainers and Ledger Routing',
    homepageSubheadline: 'Synchronize payroll, multi-region webhooks, and cloud Spanner ledger accounts.',
    footerText: 'EnterpriseCore. Fully compliant corporate workspace infrastructure.',
    emailHeaderHex: '#1E3A8A',
    legalPages: [{ title: 'Corporate Code of Conduct', slug: 'conduct', content: 'Subsidiary budget allowances are capped dynamically matching operational targets.' }]
  },
  {
    id: 'tpl_government',
    name: 'Government Procurement',
    category: 'Government',
    layout: 'sidebar',
    sections: ['Public Tenders List', 'Procurement Bidding Matrix', 'Citizenship Ledger Directory', 'Sovereign Treasury reserves', 'Audited Public Records'],
    colorSystem: { primary: '#1E3A8A', secondary: '#0F172A', background: '#F1F5F9', surface: '#FFFFFF', accent: '#2563EB', text: '#0F172A' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.65 },
    terminology: { platformName: 'GovPortal', appsLabel: 'Ministries', merchantLabel: 'Contractors', customerLabel: 'Citizens', walletLabel: 'Treasuries', affiliateLabel: 'Auditors' },
    appIds: ['app_business', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Verifiable Municipal Procurement Bidding and Tender Logs',
    homepageSubheadline: 'Publicly transparent double-entry accounting records, eliminating administrative waste.',
    footerText: 'Sovereign GovPortal municipal procurement is audited by citizens under public API rules.',
    emailHeaderHex: '#2563EB',
    legalPages: [{ title: 'Public Procurement Integrity Charter', slug: 'integrity', content: 'Tender bids must commit hashes to public records. Late bids are filtered out automatically.' }]
  },
  {
    id: 'tpl_youth',
    name: 'Youth Creative Network',
    category: 'Creator',
    layout: 'bento',
    sections: ['Soundboard Synthesizer', 'Dynamic Drops Grid', 'Creator Profiles', 'Social Feed', 'Gamified Point Shop'],
    colorSystem: { primary: '#030712', secondary: '#111827', background: '#FAFBFC', surface: '#FFFFFF', accent: '#F59E0B', text: '#030712' },
    typography: { displayFont: 'Sora', bodyFont: 'DM Sans', baseSize: '16px', lineHeight: 1.5 },
    terminology: { platformName: 'LaunchPad', appsLabel: 'Stages', merchantLabel: 'Makers', customerLabel: 'Squads', walletLabel: 'Stickers', affiliateLabel: 'Crew' },
    appIds: ['app_creator', 'app_market', 'app_pay'],
    homepageHeadline: 'Unleash your creative potential on custom ledgers',
    homepageSubheadline: 'Earn reward stickers, synthesize digital music tracks, and build cool projects.',
    footerText: 'LaunchPad creative labs. Fully owned and operated by the community.',
    emailHeaderHex: '#F59E0B',
    legalPages: [{ title: 'Creative Safety Pledge', slug: 'safety', content: 'LaunchPad maintains strict anti-bullying and clean content moderation rules.' }]
  },
  {
    id: 'tpl_minimalist',
    name: 'Minimalist Commerce',
    category: 'E-commerce',
    layout: 'minimalist_cards',
    sections: ['Minimal Showcase', 'Sleek Product Carousel', 'Philosophical Text Blocks', 'Checkout Trigger', 'Negative Space Accent'],
    colorSystem: { primary: '#18181B', secondary: '#27272A', background: '#FFFFFF', surface: '#FAFAFA', accent: '#000000', text: '#18181B' },
    typography: { displayFont: 'Playfair Display', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.7 },
    terminology: { platformName: 'Meso', appsLabel: 'Elements', merchantLabel: 'Makers', customerLabel: 'Buyers', walletLabel: 'Units', affiliateLabel: 'Associates' },
    appIds: ['app_market', 'app_pay'],
    homepageHeadline: 'Deliberate design, mathematical layout, pure commerce',
    homepageSubheadline: 'A premium minimalist theme focusing purely on high-contrast negative space and gorgeous typography.',
    footerText: 'Meso. Quietly elegant, highly functional.',
    emailHeaderHex: '#000000',
    legalPages: [{ title: 'Terms of Restraint', slug: 'terms-restraint', content: 'Our return windows hold standard 30-day boundaries. Returns processed immediately.' }]
  },
  {
    id: 'tpl_technology',
    name: 'Technology Sandbox',
    category: 'developer',
    layout: 'bento',
    sections: ['API Webhook tester', 'Sandbox command terminal', 'Repository sync tracker', 'Active service nodes', 'Ledger debug stream'],
    colorSystem: { primary: '#030712', secondary: '#1F2937', background: '#030712', surface: '#111827', accent: '#3B82F6', text: '#F3F4F6' },
    typography: { displayFont: 'Sora', bodyFont: 'Sora', baseSize: '15px', lineHeight: 1.6 },
    terminology: { platformName: 'DevGrid', appsLabel: 'Protocols', merchantLabel: 'Engineers', customerLabel: 'Users', walletLabel: 'Sovereigns', affiliateLabel: 'Nodes' },
    appIds: ['app_apps', 'app_cloud', 'app_pay'],
    homepageHeadline: 'Deploy TypeScript servers and Spanner databases instantly',
    homepageSubheadline: 'Unified developer dashboards with built-in billing, client authorization, and webhook telemetry.',
    footerText: 'DevGrid developer sandbox. Built on standard ESM architecture.',
    emailHeaderHex: '#3B82F6',
    legalPages: [{ title: 'Service uptime SLA', slug: 'uptime-sla', content: 'Our serverless containers guarantee 99.99% uptime, verified via automatic ping checks.' }]
  },
  {
    id: 'tpl_pan_african',
    name: 'African Marketplace',
    category: 'E-commerce',
    layout: 'bento',
    sections: ['Pan-African Fashion Lookbook', 'Cooperative Artisans Directory', 'Regional Trade corridors', 'Mobile Money ledger ports', 'Audit logs'],
    colorSystem: { primary: '#1C1917', secondary: '#44403C', background: '#FFFDF9', surface: '#FFFFFF', accent: '#C2410C', text: '#1C1917' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Sora', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'SokoGlobal', appsLabel: 'Hubs', merchantLabel: 'Artisans', customerLabel: 'Customers', walletLabel: 'SovereignCoins', affiliateLabel: 'Ambassadors' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'Elegant pan-African fashion & artisanal commerce networks',
    homepageSubheadline: 'Sovereign merchant directories integrating cross-border payouts, mobile money wallets, and cargo forwarding tracking.',
    footerText: 'SokoGlobal is proudly powered by Dynasty Global OMNI infrastructure.',
    emailHeaderHex: '#C2410C',
    legalPages: [{ title: 'African Artisan Trade Charter', slug: 'artisan-charter', content: 'Our platform enforces minimum price guarantees so weavers, tailors, and designers receive fair value.' }]
  },
  {
    id: 'tpl_department_store',
    name: 'Department Store',
    category: 'Retail',
    layout: 'topbar',
    sections: ['Departments Directory', 'Weekly Store Catalogs', 'Reward Points Dashboard', 'Curated Brand Showcases', 'Fast Checkout Cart'],
    colorSystem: { primary: '#0F172A', secondary: '#1E293B', background: '#F8FAFC', surface: '#FFFFFF', accent: '#1D4ED8', text: '#0F172A' },
    typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
    terminology: { platformName: 'Emporium', appsLabel: 'Aisles', merchantLabel: 'Vendors', customerLabel: 'Guests', walletLabel: 'Credits', affiliateLabel: 'Partners' },
    appIds: ['app_market', 'app_pay', 'app_logistics'],
    homepageHeadline: 'The Universal Modern digital department store',
    homepageSubheadline: 'Thousands of items in stock, audited logistics pipelines, and frictionless credit balances.',
    footerText: 'The Emporium. Standard catalog structures verified under OMNI ledger.',
    emailHeaderHex: '#1D4ED8',
    legalPages: [{ title: 'Standard Store Guarantee', slug: 'guarantee', content: 'Faulty items are replaceable instantly within 14 business days, audited via local retail hubs.' }]
  }
];

// Seed initial white-label platforms launched by customers
export const SEED_WHITE_LABEL_PLATFORMS: TenantPlatform[] = [
  {
    id: 'plat_learn_dynasty',
    name: 'Dynasty Professional Academy',
    ownerOrgId: 'org_dynasty',
    ownerUserId: 'usr_gideon',
    level: 'level_1_app',
    slug: 'dynasty-academy',
    templateId: 'tpl_education',
    apps: ['app_learn'],
    domain: {
      subdomain: 'dynasty-academy.omni.com',
      customDomain: 'academy.dynastyholdings.com',
      dnsStatus: 'verified',
      txtRecordName: '_omni-challenge.academy.dynastyholdings.com',
      txtRecordValue: 'omni-txt-challenge-k8s-992a83b2c1f0',
      cnameTarget: 'tenant.omni.com',
      sslStatus: 'active',
      canonicalSelection: 'custom'
    },
    branding: {
      colorSystem: { primary: '#1E3A8A', secondary: '#1E40AF', background: '#EFF6FF', surface: '#FFFFFF', accent: '#3B82F6', text: '#1E3A8A' },
      typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Inter', baseSize: '16px', lineHeight: 1.6 },
      terminology: { platformName: 'Dynasty Academy', appsLabel: 'Syllabi', merchantLabel: 'Professors', customerLabel: 'Scholars', walletLabel: 'Credits', affiliateLabel: 'Ambassadors' },
      homepageHeadline: 'Sovereign leadership training & professional certifications',
      homepageSubheadline: 'Verifiable credentials for corporate executives and infrastructure architects.',
      footerText: 'Powered by Dynasty Global Holdings & OMNI Core.',
      emailHeaderHex: '#1E3A8A',
      navigationItems: [
        { label: 'Courses', href: '#courses' },
        { label: 'Scholars', href: '#scholars' },
        { label: 'Certificate Verification', href: '#verification' }
      ]
    },
    countries: ['US', 'GB', 'DE', 'NG'],
    currencies: ['USD', 'GBP', 'EUR', 'NGN'],
    languages: ['en_US', 'de_DE'],
    pricing: {
      baseMonthlyFee: 299.00,
      revenueSharePercent: 5.0,
      payoutMethod: 'OMNI Pay Ledger Direct'
    },
    commissions: {
      referralRatePercent: 12.0,
      minimumCommitment: 500
    },
    analytics: {
      visitors24h: 1420,
      registrations30d: 480,
      volume30d: 38400.00
    },
    status: 'active',
    createdAt: '2026-03-15T12:00:00Z'
  },
  {
    id: 'plat_soko_oluwalana',
    name: 'SokoGlobal Fashion Market',
    ownerOrgId: 'org_sandbox',
    ownerUserId: 'usr_gideon',
    level: 'level_3_super_platform',
    slug: 'soko-global',
    templateId: 'tpl_pan_african',
    apps: ['app_market', 'app_pay', 'app_logistics', 'app_creator'],
    domain: {
      subdomain: 'soko-global.omni.com',
      customDomain: 'soko.oluwalana.tech',
      dnsStatus: 'verified',
      txtRecordName: '_omni-challenge.soko.oluwalana.tech',
      txtRecordValue: 'omni-txt-challenge-olu-189f2a8f89c0',
      cnameTarget: 'tenant.omni.com',
      sslStatus: 'active',
      canonicalSelection: 'custom'
    },
    branding: {
      colorSystem: { primary: '#1C1917', secondary: '#44403C', background: '#FFFDF9', surface: '#FFFFFF', accent: '#C2410C', text: '#1C1917' },
      typography: { displayFont: 'Plus Jakarta Sans', bodyFont: 'Sora', baseSize: '16px', lineHeight: 1.6 },
      terminology: { platformName: 'Soko Global', appsLabel: 'Corridors', merchantLabel: 'Artisans', customerLabel: 'Buyers', walletLabel: 'SovereignPoints', affiliateLabel: 'Ambassadors' },
      homepageHeadline: 'Elegant pan-African fashion & sovereign artisan commerce',
      homepageSubheadline: 'Cross-border payout infrastructure, unified local delivery, and mobile money ledger integrations.',
      footerText: 'Powered by Oluwalana Technologies & OMNI Logistics.',
      emailHeaderHex: '#C2410C',
      navigationItems: [
        { label: 'Shop Designers', href: '#designers' },
        { label: 'Artisan Directory', href: '#artisans' },
        { label: 'Track Cargo', href: '#logistics' }
      ]
    },
    countries: ['NG', 'KE', 'ZA', 'US', 'GB'],
    currencies: ['NGN', 'KES', 'ZAR', 'USD', 'GBP'],
    languages: ['en_US', 'sw_KE'],
    pricing: {
      baseMonthlyFee: 899.00,
      revenueSharePercent: 3.5,
      payoutMethod: 'OMNI Pay Mobile Money Proxy'
    },
    commissions: {
      referralRatePercent: 15.0,
      minimumCommitment: 1000
    },
    analytics: {
      visitors24h: 4980,
      registrations30d: 1250,
      volume30d: 145900.00
    },
    status: 'active',
    createdAt: '2026-05-01T08:00:00Z'
  }
];

// Seed Reseller Hierarchy Nodes
export const SEED_RESELLER_NODES: ResellerNode[] = [
  { id: 'res_omni_root', name: 'OMNI Global HQ', type: 'omni', parentId: null, status: 'active', level: 0 },
  { id: 'res_master_africa', name: 'Dynasty Master Reseller (Africa)', type: 'master_reseller', parentId: 'res_omni_root', orgId: 'org_dynasty', status: 'active', level: 1 },
  { id: 'res_sub_nigeria', name: 'Oluwalana Tech Reseller (West Africa)', type: 'reseller', parentId: 'res_master_africa', orgId: 'org_sandbox', status: 'active', level: 2 },
  { id: 'res_tenant_soko', name: 'SokoGlobal platform tenant', type: 'tenant', parentId: 'res_sub_nigeria', status: 'active', level: 3 },
  { id: 'res_cust_lagos', name: 'Lagos Design Studio', type: 'end_customer', parentId: 'res_tenant_soko', status: 'active', level: 4 }
];

// Seed Reseller Economics
export const SEED_RESELLER_ECONOMICS: ResellerEconomics[] = [
  {
    id: 'eco_master_africa',
    resellerNodeId: 'res_master_africa',
    wholesalePriceUsd: 120.00, // Pays OMNI $120/mo per tenant
    resellerMarkupPercent: 25.0, // Marks up by 25% (charging sub-resellers $150.00)
    recurringRevenueSharePercent: 20.0, // Retains 20% on sub-tenant licenses
    commissionPercent: 1.5, // Earns 1.5% on processed payments
    minimumCommitmentUsd: 2500.00, // Must spend min $2,500/mo
    tierPricing: [
      { maxTenants: 10, costPerTenantUsd: 120.00 },
      { maxTenants: 50, costPerTenantUsd: 100.00 },
      { maxTenants: 9999, costPerTenantUsd: 80.00 }
    ]
  },
  {
    id: 'eco_sub_nigeria',
    resellerNodeId: 'res_sub_nigeria',
    wholesalePriceUsd: 150.00, // Pays Dynasty $150/mo per tenant
    resellerMarkupPercent: 30.0, // Marks up by 30% (charging tenants $195.00)
    recurringRevenueSharePercent: 15.0, // Retains 15% on tenant licenses
    commissionPercent: 1.0, // Earns 1.0% on processed payments
    minimumCommitmentUsd: 500.00,
    tierPricing: [
      { maxTenants: 5, costPerTenantUsd: 150.00 },
      { maxTenants: 20, costPerTenantUsd: 130.00 },
      { maxTenants: 9999, costPerTenantUsd: 110.00 }
    ]
  }
];
