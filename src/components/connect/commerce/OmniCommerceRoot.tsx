import React, { useState } from 'react';
import {
  ShoppingBag,
  Store,
  Video,
  Package,
  TrendingUp,
  Bot,
  ShieldAlert,
  Activity,
  Plus,
  Zap,
  Globe,
  Tag
} from 'lucide-react';
import {
  CommerceProduct,
  BusinessStorefront,
  ShoppingCart,
  CommerceOrder,
  SocialReview,
  SellerAnalytics,
  CommerceAdminGovernance,
  AiShoppingChatMessage,
  ProductArchetype
} from '../../../types/omni_commerce';
import { ConnectProfile, ConnectNavigationTab } from '../../../types/omni_connect';
import {
  SEED_COMMERCE_PRODUCTS,
  SEED_BUSINESS_STOREFRONTS,
  SEED_SOCIAL_REVIEWS,
  SEED_SHOPPING_CART,
  SEED_COMMERCE_ORDERS,
  SEED_SELLER_ANALYTICS,
  SEED_COMMERCE_ADMIN_GOVERNANCE,
  SEED_AI_SHOPPING_MESSAGES
} from '../../../data/omni_commerce_seed';

import { OmniMarketplaceCatalogView } from './OmniMarketplaceCatalogView';
import { OmniStorefrontView } from './OmniStorefrontView';
import { OmniSocialShoppingFeed } from './OmniSocialShoppingFeed';
import { OmniCartCheckoutModal } from './OmniCartCheckoutModal';
import { OmniOrderManagerView } from './OmniOrderManagerView';
import { OmniSellerDashboardView } from './OmniSellerDashboardView';
import { OmniAiShoppingAssistant } from './OmniAiShoppingAssistant';
import { OmniCommerceAdminControl } from './OmniCommerceAdminControl';
import { OmniCommerceTestSuiteModal } from './OmniCommerceTestSuiteModal';

interface Props {
  activeProfile: ConnectProfile;
  activeNavTab?: ConnectNavigationTab;
  onNavigateTab?: (tab: ConnectNavigationTab) => void;
  onOpenDirectChat?: (recipientId: string, recipientName: string) => void;
}

export type CommerceSubTab =
  | 'marketplace'
  | 'storefront'
  | 'social_shopping'
  | 'orders'
  | 'seller_portal'
  | 'ai_assistant'
  | 'admin_governance';

export const OmniCommerceRoot: React.FC<Props> = ({
  activeProfile,
  activeNavTab,
  onNavigateTab,
  onOpenDirectChat
}) => {
  // Master state
  const [products, setProducts] = useState<CommerceProduct[]>(SEED_COMMERCE_PRODUCTS);
  const [storefronts, setStorefronts] = useState<BusinessStorefront[]>(SEED_BUSINESS_STOREFRONTS);
  const [reviews, setReviews] = useState<Record<string, SocialReview[]>>(SEED_SOCIAL_REVIEWS);
  const [cart, setCart] = useState<ShoppingCart>(SEED_SHOPPING_CART);
  const [orders, setOrders] = useState<CommerceOrder[]>(SEED_COMMERCE_ORDERS);
  const [analytics, setAnalytics] = useState<SellerAnalytics>(SEED_SELLER_ANALYTICS);
  const [adminConfig, setAdminConfig] = useState<CommerceAdminGovernance>(SEED_COMMERCE_ADMIN_GOVERNANCE);
  const [aiMessages, setAiMessages] = useState<AiShoppingChatMessage[]>(SEED_AI_SHOPPING_MESSAGES);

  // Sub-navigation & modals
  const [activeSubTab, setActiveSubTab] = useState<CommerceSubTab>('marketplace');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('aethelgard-lab');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isTestSuiteOpen, setIsTestSuiteOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // Convert supportedCurrencies to dictionary for formatters
  const currencyRatesRecord = adminConfig.supportedCurrencies.reduce((acc, curr) => {
    acc[curr.code] = curr.exchangeRateToUsd;
    return acc;
  }, {} as Record<string, number>);

  // Handle direct buy shortcut
  const handleDirectBuy = (product: CommerceProduct, variantId?: string) => {
    handleAddToCart(product, variantId);
    setIsCartModalOpen(true);
  };

  // Cart operations
  const handleAddToCart = (product: CommerceProduct, variantId?: string) => {
    const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
    const unitPrice = product.priceUsd + (variant?.priceDeltaUsd || 0);

    setCart(prev => {
      const existingItemIndex = prev.items.findIndex(
        i => i.productId === product.id && i.variantId === variantId && !i.isSavedForLater
      );

      let newItems = [...prev.items];
      if (existingItemIndex >= 0) {
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems.push({
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: product.id,
          productName: product.name,
          archetype: product.archetype,
          variantId: variant?.id,
          variantName: variant ? `${variant.name}: ${variant.value}` : undefined,
          sellerId: product.sellerId,
          sellerName: product.sellerName,
          priceUsd: unitPrice,
          quantity: 1,
          imageUrl: product.mediaUrls[0],
          isSavedForLater: false
        });
      }

      return {
        ...prev,
        items: newItems,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      let newItems = prev.items.map(item => {
        if (item.id === cartItemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });

      return {
        ...prev,
        items: newItems,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== cartItemId);
      return {
        ...prev,
        items: newItems,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleToggleSaveForLater = (cartItemId: string) => {
    setCart(prev => {
      const newItems = prev.items.map(item => {
        if (item.id === cartItemId) {
          return { ...item, isSavedForLater: !item.isSavedForLater };
        }
        return item;
      });

      return {
        ...prev,
        items: newItems,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleApplyCoupon = (code: string) => {
    setCart(prev => {
      if (prev.appliedCoupons.some(c => c.code === code)) return prev;

      let discountAmount = 20.0;
      if (code === 'BUILDER50') discountAmount = 50.0;

      const newCoupons = [
        ...prev.appliedCoupons,
        {
          code,
          discountAmountUsd: discountAmount
        }
      ];

      return {
        ...prev,
        appliedCoupons: newCoupons,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleRemoveCoupon = (code: string) => {
    setCart(prev => {
      const newCoupons = prev.appliedCoupons.filter(c => c.code !== code);
      return {
        ...prev,
        appliedCoupons: newCoupons,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleCompleteCheckout = (newOrder: CommerceOrder) => {
    setOrders(prev => [newOrder, ...prev]);

    // Clear active cart items
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i.isSavedForLater),
      appliedCoupons: [],
      lastUpdated: new Date().toISOString()
    }));

    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      totalRevenueUsd: prev.totalRevenueUsd + newOrder.totalAmountUsd,
      ordersCount: prev.ordersCount + 1,
      netEarningsUsd: prev.netEarningsUsd + newOrder.financialSettlement.netSellerPayoutUsd
    }));
  };

  const handleRefundOrder = (orderId: string, reason: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: 'refunded',
            cancellationReason: reason,
            financialSettlement: {
              ...o.financialSettlement,
              settlementStatus: 'refunded'
            },
            updatedAt: new Date().toISOString()
          };
        }
        return o;
      })
    );
  };

  const handleCreateProduct = (newProduct: CommerceProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleOpenStorefront = (slug: string) => {
    setSelectedStoreSlug(slug);
    setActiveSubTab('storefront');
  };

  const handleOpenChatWithSeller = (sellerId: string, sellerName: string) => {
    if (onOpenDirectChat) {
      onOpenDirectChat(sellerId, sellerName);
    }
  };

  const handleAiSendMessage = (userText: string) => {
    const userMsg: AiShoppingChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toISOString()
    };

    setAiMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = `I analyzed the OMNI Catalogue for "${userText}". Here are the sovereign verified items matching your requirements:`;
      let matchedProds = products.slice(0, 2);

      if (userText.toLowerCase().includes('ring') || userText.toLowerCase().includes('hardware')) {
        replyText = `The Titanium Zero-Knowledge Key Ring is the top rated physical hardware item. It includes biometric tap-to-sign NFC and 128-bit elliptic curve key storage.`;
        matchedProds = products.filter(p => p.archetype === 'physical');
      } else if (userText.toLowerCase().includes('course') || userText.toLowerCase().includes('class')) {
        replyText = `We found the Zero-Knowledge Cryptography & Sovereign Auth Masterclass by OmniAcademy. It includes live cohorts and verifiable on-chain certificates.`;
        matchedProds = products.filter(p => p.archetype === 'course');
      }

      const aiMsg: AiShoppingChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'omni_ai',
        text: replyText,
        recommendations: matchedProds.map(p => ({
          productId: p.id,
          productName: p.name,
          archetype: p.archetype,
          priceUsd: p.priceUsd,
          matchScorePct: 96,
          justification: 'High match based on verified technical specifications and high customer ratings.',
          pros: ['Instant authentication', 'Quantum-resistant encryption', 'Escrow protection'],
          cons: ['Standard delivery window'],
          isSponsored: false
        })),
        timestamp: new Date().toISOString()
      };

      setAiMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const activeCartCount = cart.items.filter(i => !i.isSavedForLater).reduce((acc, i) => acc + i.quantity, 0);
  const currentStorefront = storefronts.find(s => s.handle === selectedStoreSlug) || storefronts[0];

  return (
    <div id="omni-commerce-root" className="space-y-6">
      {/* Top Commerce Navigation Sub-Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex items-center justify-between gap-3 shadow-lg">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          {[
            { id: 'marketplace', label: 'Marketplace Catalogue', icon: ShoppingBag },
            { id: 'storefront', label: 'Storefront View', icon: Store },
            { id: 'social_shopping', label: 'Social Feed & Drops', icon: Video },
            { id: 'orders', label: 'My Orders', icon: Package, badge: orders.length },
            { id: 'seller_portal', label: 'Seller Portal', icon: TrendingUp },
            { id: 'ai_assistant', label: 'AI Concierge', icon: Bot },
            { id: 'admin_governance', label: 'Super Admin', icon: ShieldAlert }
          ].map(tab => {
            const isActive = activeSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as CommerceSubTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Cart Button & Diagnostics Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsTestSuiteOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 border border-slate-700 rounded-xl transition flex items-center gap-1.5"
            title="Run 8-Point Diagnostic Test Suite"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Diagnostic Suite</span>
          </button>

          <button
            onClick={() => setIsCartModalOpen(true)}
            className="relative px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {activeCartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center -mr-1">
                {activeCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE COMMERCE VIEW */}
      {activeSubTab === 'marketplace' && (
        <OmniMarketplaceCatalogView
          products={products}
          storefronts={storefronts}
          reviews={reviews}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenStorefront={handleOpenStorefront}
          onOpenChatWithSeller={handleOpenChatWithSeller}
        />
      )}

      {activeSubTab === 'storefront' && (
        <OmniStorefrontView
          storefront={currentStorefront}
          products={products}
          reviews={reviews}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenChatWithSeller={handleOpenChatWithSeller}
          onBackToMarketplace={() => setActiveSubTab('marketplace')}
        />
      )}

      {activeSubTab === 'social_shopping' && (
        <OmniSocialShoppingFeed
          products={products}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenStorefront={handleOpenStorefront}
          onOpenChatWithSeller={handleOpenChatWithSeller}
        />
      )}

      {activeSubTab === 'orders' && (
        <OmniOrderManagerView
          orders={orders}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onRefundOrder={handleRefundOrder}
          onOpenStorefront={handleOpenStorefront}
        />
      )}

      {activeSubTab === 'seller_portal' && (
        <OmniSellerDashboardView
          products={products}
          analytics={analytics}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onCreateProduct={handleCreateProduct}
        />
      )}

      {activeSubTab === 'ai_assistant' && (
        <OmniAiShoppingAssistant
          products={products}
          messages={aiMessages}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onSendMessage={handleAiSendMessage}
          onAddToCart={handleAddToCart}
          onDirectBuy={handleDirectBuy}
          onOpenStorefront={handleOpenStorefront}
        />
      )}

      {activeSubTab === 'admin_governance' && (
        <OmniCommerceAdminControl
          config={adminConfig}
          onUpdateConfig={setAdminConfig}
        />
      )}

      {/* SHOPPING CART & CHECKOUT MODAL */}
      {isCartModalOpen && (
        <OmniCartCheckoutModal
          cart={cart}
          activeProfile={activeProfile}
          selectedCurrency={selectedCurrency}
          currencyExchangeRates={currencyRatesRecord}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onToggleSaveForLater={handleToggleSaveForLater}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          onCompleteCheckout={handleCompleteCheckout}
          onClose={() => setIsCartModalOpen(false)}
        />
      )}

      {/* TEST SUITE MODAL */}
      {isTestSuiteOpen && (
        <OmniCommerceTestSuiteModal
          products={products}
          cart={cart}
          orders={orders}
          onClose={() => setIsTestSuiteOpen(false)}
        />
      )}
    </div>
  );
};
