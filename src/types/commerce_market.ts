export type ProductCategory =
  | 'all'
  | 'neural_hardware'
  | 'developer_rigs'
  | 'sovereign_security'
  | 'cloud_appliances'
  | 'smart_enclaves'
  | 'wearables'
  | 'peripherals';

export interface ProductSpecification {
  category: string;
  name: string;
  value: string;
}

export interface ProductPriceHistoryPoint {
  date: string;
  price: number;
  seller: string;
  isSale?: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  authorAvatar?: string;
  authorBadge?: string;
  rating: number; // 1 to 5
  title: string;
  content: string;
  verifiedPurchase: boolean;
  date: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  botLikelihoodScore: number; // 0 to 100 (0 = authentic, 100 = bot)
  keyPraiseOrComplaint: string[];
  merchantReply?: {
    text: string;
    date: string;
  };
}

export interface ProductCouponOffer {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed' | 'cashback';
  discountValue: number; // e.g. 15 for 15% or 50 for $50
  minOrderAmount?: number;
  expiresAt: string;
  autoApplyEligible: boolean;
  verifiedSuccessRate: number; // e.g. 98%
  isSponsoredDiscount?: boolean;
  isAffiliateCoupon?: boolean;
  affiliateCreatorName?: string;
}

export interface SponsoredDetails {
  campaignName: string;
  sponsorName: string;
  disclosureText: string;
  badge: 'Sponsored' | 'Promoted' | 'Featured Partner';
  bidAmountPerClickUsd?: number;
  transparencyAuditHash: string;
}

export interface OmniMarketProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  brand: string;
  price: number;
  originalPrice?: number;
  currency: string;
  discountPercentage?: number;
  rating: number; // 1 to 5
  reviewCount: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  specifications: ProductSpecification[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  // Sponsored & Affiliate Disclosure Mandate
  isSponsored: boolean;
  sponsoredDetails?: SponsoredDetails;
  isAffiliate: boolean;
  affiliateCommissionRate?: number; // e.g. 8.5%
  // Merchant details
  sellerId: string;
  sellerName: string;
  sellerTrustScore: number; // 0 to 100
  sellerVerified: boolean;
  sellerLocation: string;
  shippingInfo: {
    fee: number;
    estimatedDays: string;
    freeShippingMin?: number;
    sovereignFastShipping: boolean;
  };
  warrantyMonths: number;
  returnPolicyDays: number;
  escrowProtected: boolean;
  priceHistory: ProductPriceHistoryPoint[];
}

export interface OmniSellerProfile {
  id: string;
  storeName: string;
  logo: string;
  banner: string;
  description: string;
  verifiedBadge: boolean;
  trustScore: number; // 0 to 100
  totalSalesCount: number;
  positiveReviewPercent: number;
  memberSince: string;
  sovereignNodeLocation: string;
  avgResponseTimeMinutes: number;
  escrowComplianceScore: number; // 0 to 100
  returnPolicy: string;
  warrantyPolicy: string;
  categories: ProductCategory[];
  badges: string[];
  activeProductsCount: number;
}

export interface OmniProductComparisonMatrix {
  id: string;
  title: string;
  category: string;
  comparedProductIds: string[];
  features: {
    featureName: string;
    values: Record<string, string>; // productId -> formatted spec
    winnerProductId?: string;
  }[];
  aiExecutiveSummary: string;
  bestOverallProductId: string;
  bestBudgetProductId: string;
  bestPerformanceProductId: string;
  priceTradeoffAnalysis: string;
  generatedAt: string;
}

export type OmniPayMethod =
  | 'omni_tokens'
  | 'usdc'
  | 'btc'
  | 'eth'
  | 'sovereign_escrow'
  | 'fiat_card'
  | 'pay_in_4';

export interface OmniCartItem {
  product: OmniMarketProduct;
  quantity: number;
  selectedSpec?: string;
  appliedCoupon?: ProductCouponOffer;
  unitPrice: number;
  totalPrice: number;
}

export interface OmniPayOrder {
  id: string;
  orderNumber: string;
  items: OmniCartItem[];
  subtotal: number;
  discountTotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  paymentMethod: OmniPayMethod;
  paymentStatus: 'escrow_locked' | 'settled' | 'refunded' | 'amortizing';
  escrowReleaseConditions: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
  };
  installmentPlan?: {
    totalInstallments: number;
    paidInstallments: number;
    installmentAmount: number;
    nextDueDate: string;
    zeroInterestVerified: boolean;
  };
  ledgerTransactionId: string;
  createdAt: string;
  deliveredAt?: string;
}

export interface OmniAffiliateLink {
  id: string;
  productId?: string;
  productTitle?: string;
  customCampaignName: string;
  referralCode: string;
  fullUrl: string;
  qrCodeData: string;
  commissionPercent: number;
  clicks: number;
  conversions: number;
  totalEarningsUsd: number;
  createdAt: string;
}

export interface OmniAffiliateStats {
  totalEarningsUsd: number;
  pendingPayoutUsd: number;
  paidOutUsd: number;
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  tier: 'Starter' | 'Silver' | 'Gold' | 'Sovereign Sovereign';
  activeLinksCount: number;
  nextPayoutDate: string;
}

export interface OmniAffiliateCoupon {
  id: string;
  affiliateId: string;
  code: string;
  discountPercent: number;
  creatorCommissionPercent: number;
  usesCount: number;
  active: boolean;
}

export interface OmniShoppingAiRecommendation {
  id: string;
  query: string;
  directRecommendation: string;
  topPickProductId: string;
  alternativePickProductId: string;
  budgetPickProductId: string;
  comparisonHighlights: string[];
  reviewSummary: {
    overallSentiment: string;
    topPraise: string[];
    topCriticisms: string[];
    fakeReviewWarningCount: number;
  };
  sponsoredDisclosures: {
    productId: string;
    productName: string;
    isSponsored: boolean;
    reason: string;
    commissionPercent?: number;
  }[];
  generatedAt: string;
}
