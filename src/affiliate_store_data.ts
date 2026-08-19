import { 
  Affiliate, AffiliateOpportunity, AffiliateClick, AffiliateLead, AffiliateConversion, 
  AffiliateCommission, GrowthReward, AttributionSettings, AffiliateFraudAlert 
} from './types';

// Standard helper to generate stable dates
const dateAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const SEED_AFFILIATES: Affiliate[] = [
  {
    id: 'aff_gideon_dynasty',
    userId: 'usr_gideon',
    name: 'Gideon Dynasty Group',
    email: 'gideonoluwalanadynasty@gmail.com',
    partnerType: 'regional_representative',
    affiliateId: 'GIDEON2026',
    level: 'platinum',
    referralLink: 'https://omni.io/?ref=GIDEON2026',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=GIDEON2026',
    joinedDate: dateAgo(120),
    status: 'active',
    clicksCount: 14205,
    leadsCount: 890,
    conversionsCount: 142,
    earningsPending: 3500.00,
    earningsApproved: 24850.00,
    earningsRejected: 450.00
  },
  {
    id: 'aff_olivia_infl',
    userId: 'usr_olivia',
    name: 'Olivia Sterling Media',
    email: 'olivia.sterling@influx.io',
    partnerType: 'influencer',
    affiliateId: 'OLIVIA50',
    level: 'gold',
    referralLink: 'https://omni.io/?ref=OLIVIA50',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=OLIVIA50',
    joinedDate: dateAgo(80),
    status: 'active',
    clicksCount: 9480,
    leadsCount: 420,
    conversionsCount: 56,
    earningsPending: 1200.00,
    earningsApproved: 6400.00,
    earningsRejected: 0.00
  },
  {
    id: 'aff_pixel_agency',
    userId: 'usr_pixel_corp',
    name: 'Pixel Growth Agency',
    email: 'partner@pixelgrowth.agency',
    partnerType: 'agency',
    affiliateId: 'PIXELCORP',
    level: 'platinum',
    referralLink: 'https://omni.io/?ref=PIXELCORP',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=PIXELCORP',
    joinedDate: dateAgo(200),
    status: 'active',
    clicksCount: 38200,
    leadsCount: 2950,
    conversionsCount: 410,
    earningsPending: 12500.00,
    earningsApproved: 89600.00,
    earningsRejected: 1200.00
  },
  {
    id: 'aff_kwame_rep',
    userId: 'usr_kwame',
    name: 'Kwame Mensah',
    email: 'kwame@omni-regional.gh',
    partnerType: 'regional_representative',
    affiliateId: 'KWAMEREP',
    level: 'silver',
    referralLink: 'https://omni.io/?ref=KWAMEREP',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=KWAMEREP',
    joinedDate: dateAgo(45),
    status: 'active',
    clicksCount: 3120,
    leadsCount: 154,
    conversionsCount: 18,
    earningsPending: 450.00,
    earningsApproved: 1800.00,
    earningsRejected: 0.00
  },
  {
    id: 'aff_spammer_x',
    userId: 'usr_spammer',
    name: 'Shadow Clicker LLC',
    email: 'shadowy@botclick.net',
    partnerType: 'referral_partner',
    affiliateId: 'EASYMONEY',
    level: 'bronze',
    referralLink: 'https://omni.io/?ref=EASYMONEY',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=EASYMONEY',
    joinedDate: dateAgo(15),
    status: 'suspended',
    clicksCount: 152000,
    leadsCount: 12,
    conversionsCount: 1,
    earningsPending: 0.00,
    earningsApproved: 0.00,
    earningsRejected: 1500.00
  }
];

export const SEED_AFFILIATE_OPPORTUNITIES: AffiliateOpportunity[] = [
  {
    id: 'opp_omni_family',
    appName: 'OMNI Family Suite',
    productName: 'OMNI Household Premium Subscription',
    description: 'Promote our core unified subscription suite designed for families and power browsers. Includes multi-device sharing, unlimited cloud vaults, and priority smart agent routines.',
    commissionType: 'percentage',
    commissionValue: 20, // 20% Recurring
    isRecurring: true,
    recurringPeriodMonths: 12,
    promoCode: 'OMNIFAMILY20',
    payoutFrequency: 'Monthly terms',
    category: 'Productivity'
  },
  {
    id: 'opp_omni_ads',
    appName: 'OMNI Ads',
    productName: 'Advertiser Managed Account Setup',
    description: 'Earn massive instant commissions for onboarding new businesses to the OMNI Ads bid publisher network. Triggers on initial ad budget deposit.',
    commissionType: 'fixed',
    commissionValue: 150.00, // $150 flat commission
    isRecurring: false,
    promoCode: 'OMNIADSFIRST',
    payoutFrequency: '7-Day Fast Settle',
    category: 'Marketing'
  },
  {
    id: 'opp_omni_learn',
    appName: 'OMNI Learn',
    productName: 'Institutional Enterprise Academy Licence',
    description: 'High-ticket enterprise referral opportunities for schools, coding bootcamps, and executive learning boards. Multi-year recurring shares available.',
    commissionType: 'percentage',
    commissionValue: 30, // 30% first year recurring
    isRecurring: true,
    recurringPeriodMonths: 24,
    promoCode: 'OMNILEARNPRO',
    payoutFrequency: 'Monthly terms',
    category: 'Education'
  },
  {
    id: 'opp_omni_passport',
    appName: 'OMNI Passport',
    productName: 'Developer Custom DID Integration Settle',
    description: 'Promote secure decentralized credentials (DID) for SaaS developers looking for secure single sign-on alternatives.',
    commissionType: 'fixed',
    commissionValue: 80.00,
    isRecurring: false,
    payoutFrequency: 'Monthly terms',
    category: 'Developer Tools'
  }
];

export const SEED_AFFILIATE_CLICKS: AffiliateClick[] = [
  {
    id: 'click_001',
    affiliateId: 'aff_gideon_dynasty',
    opportunityId: 'opp_omni_family',
    timestamp: dateAgo(2),
    ipAddress: '198.51.100.42',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    referer: 'https://gideon-blog.io/review-omni-os',
    campaign: 'summer_growth_2026',
    country: 'US',
    isSpam: false,
    cookieStuffed: false
  },
  {
    id: 'click_002',
    affiliateId: 'aff_olivia_infl',
    opportunityId: 'opp_omni_family',
    timestamp: dateAgo(1),
    ipAddress: '172.56.21.109',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)',
    referer: 'https://instagram.com/p/Co_olivia',
    campaign: 'bio_link',
    country: 'CA',
    isSpam: false,
    cookieStuffed: false
  },
  {
    id: 'click_003',
    affiliateId: 'aff_spammer_x',
    opportunityId: 'opp_omni_ads',
    timestamp: dateAgo(3),
    ipAddress: '203.0.113.150',
    userAgent: 'BotClicker/v2.1 (Crawler agent emulation)',
    referer: '',
    campaign: 'spam_blast_blackhat',
    country: 'CN',
    isSpam: true,
    cookieStuffed: true
  },
  {
    id: 'click_004',
    affiliateId: 'aff_pixel_agency',
    opportunityId: 'opp_omni_learn',
    timestamp: dateAgo(4),
    ipAddress: '88.132.40.92',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0.0.0',
    referer: 'https://pixelgrowth.agency/resources',
    campaign: 'enterprise_q3',
    country: 'DE',
    isSpam: false,
    cookieStuffed: false
  }
];

export const SEED_AFFILIATE_LEADS: AffiliateLead[] = [
  {
    id: 'lead_101',
    clickId: 'click_001',
    affiliateId: 'aff_gideon_dynasty',
    opportunityId: 'opp_omni_family',
    email: 'prospective.buyer@nyc-tech.com',
    timestamp: dateAgo(1),
    status: 'converted',
    customerType: 'individual'
  },
  {
    id: 'lead_102',
    clickId: 'click_004',
    affiliateId: 'aff_pixel_agency',
    opportunityId: 'opp_omni_learn',
    email: 'academics-director@berlin-academy.de',
    timestamp: dateAgo(3),
    status: 'pending',
    customerType: 'enterprise'
  }
];

export const SEED_AFFILIATE_CONVERSIONS: AffiliateConversion[] = [
  {
    id: 'conv_201',
    leadId: 'lead_101',
    clickId: 'click_001',
    affiliateId: 'aff_gideon_dynasty',
    opportunityId: 'opp_omni_family',
    amount: 120.00, // Annual subscription purchase
    currency: 'USD',
    timestamp: dateAgo(1),
    orderId: 'ord_910485901',
    planId: 'prod_household_premium',
    customerType: 'individual',
    country: 'US',
    campaign: 'summer_growth_2026',
    isSuspicious: false
  },
  {
    id: 'conv_202',
    clickId: 'click_002',
    affiliateId: 'aff_olivia_infl',
    opportunityId: 'opp_omni_family',
    amount: 29.00, // Monthly premium buy
    currency: 'USD',
    timestamp: dateAgo(0.5),
    orderId: 'ord_120349812',
    planId: 'prod_browser_premium',
    customerType: 'individual',
    country: 'CA',
    campaign: 'bio_link',
    isSuspicious: false
  },
  {
    id: 'conv_bot_scam',
    clickId: 'click_003',
    affiliateId: 'aff_spammer_x',
    opportunityId: 'opp_omni_ads',
    amount: 1500.00,
    currency: 'USD',
    timestamp: dateAgo(2),
    orderId: 'ord_fraud_dummy',
    planId: 'prod_ads_bid_credits',
    customerType: 'individual',
    country: 'CN',
    campaign: 'spam_blast_blackhat',
    isSuspicious: true,
    fraudType: 'cookie_stuffing'
  }
];

export const SEED_AFFILIATE_COMMISSIONS: AffiliateCommission[] = [
  {
    id: 'comm_301',
    affiliateId: 'aff_gideon_dynasty',
    conversionId: 'conv_201',
    opportunityId: 'opp_omni_family',
    amount: 24.00, // 20% of $120
    currency: 'USD',
    status: 'approved',
    isRecurring: true,
    createdAt: dateAgo(1),
    approvedAt: dateAgo(0.8)
  },
  {
    id: 'comm_302',
    affiliateId: 'aff_olivia_infl',
    conversionId: 'conv_202',
    opportunityId: 'opp_omni_family',
    amount: 5.80, // 20% of $29
    currency: 'USD',
    status: 'pending',
    isRecurring: true,
    createdAt: dateAgo(0.5)
  },
  {
    id: 'comm_bot_block',
    affiliateId: 'aff_spammer_x',
    conversionId: 'conv_bot_scam',
    opportunityId: 'opp_omni_ads',
    amount: 150.00,
    currency: 'USD',
    status: 'rejected',
    rejectionReason: 'Flagged by OMNI Fraud Sentry - Cookie Stuffing detected',
    isRecurring: false,
    createdAt: dateAgo(2)
  }
];

// Distinct rewards system for legitimate ecosystem contributions.
// DO NOT call reward points shares! Let's name them "Growth Reward Points".
export const SEED_GROWTH_REWARDS: GrowthReward[] = [
  {
    id: 'reward_001',
    recipientId: 'aff_gideon_dynasty',
    recipientName: 'Gideon Dynasty Group',
    points: 12500, // points, not shares!
    activityType: 'verified_customer_acquisition',
    description: 'Onboarded 100 enterprise tenants with complete double-entry active ledgers',
    timestamp: dateAgo(30),
    status: 'allocated'
  },
  {
    id: 'reward_002',
    recipientId: 'aff_pixel_agency',
    recipientName: 'Pixel Growth Agency',
    points: 25000,
    activityType: 'merchant_acquisition',
    description: 'Integrated 15 regional fintech partners to M-Pesa dynamic billing adapters',
    timestamp: dateAgo(15),
    status: 'allocated'
  },
  {
    id: 'reward_003',
    recipientId: 'aff_kwame_rep',
    recipientName: 'Kwame Mensah',
    points: 4000,
    activityType: 'geographic_expansion',
    description: 'Established and verified legal tax compliance nodes for West African hub (Ghana, Nigeria)',
    timestamp: dateAgo(5),
    status: 'allocated'
  },
  {
    id: 'reward_004',
    recipientId: 'aff_gideon_dynasty',
    recipientName: 'Gideon Dynasty Group',
    points: 8000,
    activityType: 'useful_content',
    description: 'Authored ultimate developer deployment blueprints for OMNI smart decentralized agents',
    timestamp: dateAgo(10),
    status: 'redeemed',
    redemptionMethod: 'Redeemed for $800 Infrastructure Server Credits'
  }
];

export const DEFAULT_ATTRIBUTION_SETTINGS: AttributionSettings = {
  model: 'last_click',
  windowDays: 30
};

export const SEED_FRAUD_ALERTS: AffiliateFraudAlert[] = [
  {
    id: 'alert_001',
    timestamp: dateAgo(2),
    affiliateId: 'aff_spammer_x',
    affiliateName: 'Shadow Clicker LLC',
    type: 'cookie_stuffing',
    severity: 'high',
    description: 'Injected 50,000 hidden iFrame tags on sub-partner ad domains with automatic script redirection triggers.',
    status: 'flagged',
    evidence: 'Header injection script tracing: script src="https://omni.io/?ref=EASYMONEY" loaded from hidden 0px pixels'
  },
  {
    id: 'alert_002',
    timestamp: dateAgo(5),
    affiliateId: 'aff_gideon_dynasty',
    affiliateName: 'Gideon Dynasty Group',
    type: 'self_referral',
    severity: 'low',
    description: 'User usr_gideon attempted to sign up as customer under their own regional representative invite code.',
    status: 'resolved_suspended',
    evidence: 'IP Address match: Sign-up request IP (198.51.100.42) identical to Affiliate session login IP.'
  },
  {
    id: 'alert_003',
    timestamp: dateAgo(1),
    affiliateId: 'aff_spammer_x',
    affiliateName: 'Shadow Clicker LLC',
    type: 'click_spam',
    severity: 'high',
    description: 'Identified automated script firing 1500 concurrent clicks per minute from rotated proxy addresses.',
    status: 'flagged',
    evidence: 'Click sequence rate: 45 clicks per second over 30 minutes from AWS EC2 subnet ip range.'
  }
];
