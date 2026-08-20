/**
 * OMNI COMMERCE ENGINE — COMPREHENSIVE DOMAIN TYPES
 * Architectural Subsystem: OMNI Connect Commerce, Catalogue, Storefront & Marketplace Integration
 * 
 * Invariants:
 * - Integrates with OMNI Finance OS, OMNI Marketplace, OMNI Pay, OMNI Wallet, OMNI Ads, OMNI CRM.
 * - Supports 9 Product Archetypes.
 * - Every transaction produces an atomic financial ledger settlement, tax record, and audit trace.
 * - AI Shopping Assistant enforces strict non-autonomous purchase confirmation and no undisclosed sponsorships.
 */

import { ConnectProfile } from './omni_connect';

// ============================================================================
// 1. PRODUCT ARCHETYPES & CATALOGUE MODELS
// ============================================================================

export type ProductArchetype =
  | 'physical'
  | 'digital'
  | 'course'
  | 'service'
  | 'subscription'
  | 'appointment'
  | 'ticket'
  | 'donation'
  | 'membership';

export type ProductAvailability =
  | 'in_stock'
  | 'low_stock'
  | 'pre_order'
  | 'sold_out'
  | 'on_demand';

export interface ProductVariantOption {
  id: string;
  name: string; // e.g. "Size", "Color", "Tier", "License"
  value: string; // e.g. "XL", "Midnight Black", "Enterprise License"
  priceDeltaUsd: number;
  inventoryCount: number;
  sku: string;
}

export interface ProductShippingInfo {
  weightKg?: number;
  originCountry: string;
  freeShippingThresholdUsd?: number;
  estimatedDeliveryDays: { min: number; max: number };
  methods: {
    id: string;
    name: string;
    costUsd: number;
    carrier: string;
  }[];
}

export interface DigitalAssetInfo {
  fileFormat: string;
  fileSizeBytes: number;
  downloadUrl?: string;
  instantDeliveryMethod: 'download_link' | 'api_license_key' | 'invite_code' | 'access_grant';
  licenseType: 'personal' | 'commercial' | 'extended' | 'unlimited';
}

export interface CourseCurriculumSummary {
  modulesCount: number;
  totalHours: number;
  certificationOffered: boolean;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  includesLiveCohort: boolean;
}

export interface AppointmentSlotInfo {
  durationMinutes: number;
  bookingPlatform: 'omni_calendar' | 'google_meet' | 'in_person';
  bufferMinutes: number;
  timezone: string;
  availableDays: string[]; // ['Monday', 'Tuesday', ...]
}

export interface SocialReview {
  id: string;
  productId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
  helpfulVotes: number;
  createdAt: string;
  sellerReply?: {
    authorName: string;
    replyText: string;
    repliedAt: string;
  };
}

export interface CommerceProduct {
  id: string;
  sellerId: string; // foreign key to ConnectProfile
  sellerName: string;
  sellerAvatar: string;
  sellerBadge: 'verified_creator' | 'verified_business' | 'verified_official';
  sellerRating: number; // 0 - 5.0
  sellerStoreSlug: string;
  
  name: string;
  headline: string;
  description: string;
  archetype: ProductArchetype;
  category: string;
  tags: string[];
  
  priceUsd: number;
  compareAtPriceUsd?: number;
  currency: string; // 'USD' | 'EUR' | 'GBP' | 'OMNI' | 'USDT' | 'NGN' | 'BRL'
  
  inventoryCount: number;
  availability: ProductAvailability;
  mediaUrls: string[];
  videoPreviewUrl?: string;
  
  variants: ProductVariantOption[];
  shippingInfo?: ProductShippingInfo;
  digitalAssetInfo?: DigitalAssetInfo;
  courseCurriculum?: CourseCurriculumSummary;
  appointmentInfo?: AppointmentSlotInfo;
  
  averageRating: number;
  reviewsCount: number;
  salesCount: number;
  isFeaturedMarketplace: boolean;
  isOmniPrimeEligible: boolean;
  
  attachedSocialMediaCount: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 2. BUSINESS STOREFRONT MODEL
// ============================================================================

export type StoreSectionTab =
  | 'products'
  | 'collections'
  | 'offers'
  | 'reviews'
  | 'about'
  | 'contact'
  | 'community';

export interface StoreCollection {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  productIds: string[];
  isFeatured: boolean;
}

export interface StoreOffer {
  id: string;
  code: string;
  discountPercentage: number;
  description: string;
  validUntil: string;
  minimumSpendUsd: number;
}

export interface BusinessStorefront {
  id: string;
  profileId: string;
  handle: string; // e.g. "aethelgard-lab"
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  verificationBadge: 'verified_business' | 'verified_creator' | 'verified_official';
  
  establishedYear: number;
  country: string;
  returnPolicyDays: number;
  averageResponseTimeMinutes: number;
  
  collections: StoreCollection[];
  specialOffers: StoreOffer[];
  featuredProductIds: string[];
  
  socialProof: {
    totalSalesVolumeUsd: number;
    satisfactionRate: number; // 0 - 100%
    followersCount: number;
  };
  
  contact: {
    email: string;
    phone?: string;
    supportChannelUrl: string;
  };
  
  activeSections: StoreSectionTab[];
  customThemeColor?: string;
}

// ============================================================================
// 3. SOCIAL SHOPPING EMBEDS & CART
// ============================================================================

export interface SocialPostProductTag {
  productId: string;
  productName: string;
  priceUsd: number;
  mediaThumbnail: string;
  pinnedInPostId?: string;
  taggedInMomentId?: string;
  taggedInMessageId?: string;
  taggedInChannelId?: string;
  coordinateX?: number; // 0 - 100%
  coordinateY?: number; // 0 - 100%
}

export interface CartItem {
  id: string; // cart item id
  productId: string;
  variantId?: string;
  variantName?: string;
  sellerId: string;
  sellerName: string;
  productName: string;
  archetype: ProductArchetype;
  priceUsd: number;
  quantity: number;
  imageUrl: string;
  isSavedForLater: boolean;
  selectedShippingMethodId?: string;
}

export interface ShoppingCart {
  id: string;
  userId: string;
  items: CartItem[];
  appliedCoupons: {
    code: string;
    discountAmountUsd: number;
    sellerId?: string; // specific seller or global
  }[];
  notesForSeller?: string;
  lastUpdated: string;
}

// ============================================================================
// 4. CHECKOUT & OMNI FINANCE TRANSACTION
// ============================================================================

export type PaymentMethodType =
  | 'omni_wallet'
  | 'omni_pay_1click'
  | 'debit_credit_card'
  | 'bank_wire_transfer'
  | 'crypto_usdc'
  | 'subscription_autopay';

export interface CheckoutSession {
  sessionId: string;
  cartId: string;
  subtotalUsd: number;
  discountUsd: number;
  shippingUsd: number;
  taxUsd: number;
  totalUsd: number;
  currency: string;
  
  selectedPaymentMethod: PaymentMethodType;
  escrowProtectionEnabled: boolean;
  
  shippingAddress?: {
    fullName: string;
    street: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  
  billingAddressSameAsShipping: boolean;
}

// ============================================================================
// 5. ORDER MANAGEMENT & FINANCIAL SETTLEMENT
// ============================================================================

export type OrderStatus =
  | 'created'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItemRecord {
  productId: string;
  productName: string;
  archetype: ProductArchetype;
  variantName?: string;
  unitPriceUsd: number;
  quantity: number;
  totalPriceUsd: number;
  thumbnailUrl: string;
  digitalDeliveryCode?: string;
}

export interface FinancialSettlementRecord {
  ledgerTxId: string;
  grossAmountUsd: number;
  platformTakeRateFeeUsd: number; // e.g. 2.5%
  escrowFeeUsd: number;
  affiliateCommissionUsd: number;
  taxCollectedUsd: number;
  netSellerPayoutUsd: number;
  settlementStatus: 'held_in_escrow' | 'released_to_wallet' | 'refunded';
  settlementReleaseTime: string;
  cryptographicMerkleHash: string;
}

export interface CommerceOrder {
  id: string;
  orderNumber: string; // e.g. "ORD-99824"
  buyerProfileId: string;
  buyerName: string;
  buyerEmail: string;
  sellerProfileId: string;
  sellerName: string;
  sellerStoreSlug: string;
  
  items: OrderItemRecord[];
  
  subtotalUsd: number;
  shippingFeeUsd: number;
  taxUsd: number;
  totalAmountUsd: number;
  currency: string;
  
  status: OrderStatus;
  paymentMethod: PaymentMethodType;
  isEscrowProtected: boolean;
  
  tracking?: {
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    estimatedDelivery: string;
  };
  
  financialSettlement: FinancialSettlementRecord;
  customerNotes?: string;
  cancellationReason?: string;
  
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// 6. SELLER DASHBOARD & ANALYTICS
// ============================================================================

export interface SellerAnalytics {
  period: 'today' | '7_days' | '30_days' | 'all_time';
  totalRevenueUsd: number;
  netEarningsUsd: number;
  ordersCount: number;
  averageOrderValueUsd: number;
  conversionRatePct: number;
  topSellingProducts: {
    productId: string;
    productName: string;
    unitsSold: number;
    revenueUsd: number;
  }[];
  salesByArchetype: Record<ProductArchetype, number>;
  escrowBalancePendingUsd: number;
  availableWalletBalanceUsd: number;
}

// ============================================================================
// 7. AI SHOPPING ASSISTANT & SAFETY POLICY
// ============================================================================

export interface AiShoppingRecommendation {
  productId: string;
  productName: string;
  archetype: ProductArchetype;
  priceUsd: number;
  matchScorePct: number; // 0 - 100%
  justification: string;
  pros: string[];
  cons: string[];
  isSponsored: boolean;
}

export interface AiShoppingChatMessage {
  id: string;
  sender: 'user' | 'omni_ai';
  text: string;
  recommendations?: AiShoppingRecommendation[];
  comparisonTable?: {
    features: string[];
    products: { name: string; values: string[] }[];
  };
  reviewSummary?: {
    productId: string;
    sentimentScorePct: number;
    keyThemes: string[];
    prosSummary: string;
    consSummary: string;
  };
  safetyNotice?: string;
  timestamp: string;
}

// ============================================================================
// 8. SUPER ADMIN COMMERCE GOVERNANCE
// ============================================================================

export interface CommerceAdminGovernance {
  isCommerceGloballyActive: boolean;
  platformTakeRatePct: number; // e.g. 2.5%
  escrowHoldDurationDays: number; // e.g. 7 days or upon delivery
  minimumPayoutThresholdUsd: number;
  supportedCurrencies: {
    code: string;
    symbol: string;
    exchangeRateToUsd: number;
    isCrypto: boolean;
  }[];
  allowedArchetypes: ProductArchetype[];
  restrictedProductKeywords: string[];
  totalGlobalSalesVolumeUsd: number;
  activeSellersCount: number;
  totalOrdersProcessed: number;
}

// ============================================================================
// 9. AUTOMATED COMMERCE TEST SUITE SCENARIO
// ============================================================================

export interface CommerceTestScenario {
  id: string;
  title: string;
  description: string;
  targetModule: 'product_creation' | 'checkout' | 'payment_gateway' | 'settlement' | 'refund' | 'inventory' | 'seller_permissions' | 'cross_border';
  status: 'idle' | 'running' | 'passed' | 'failed';
  executionTimeMs?: number;
  assertionSteps: {
    name: string;
    expected: string;
    actual?: string;
    passed: boolean;
  }[];
  logs: string[];
}
