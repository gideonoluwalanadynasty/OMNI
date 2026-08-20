import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Star,
  ShieldCheck,
  Zap,
  Tag,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Eye,
  Plus,
  DollarSign,
  Globe,
  Clock,
  Truck,
  Heart,
  Store,
  Award
} from 'lucide-react';
import {
  CommerceProduct,
  ProductArchetype,
  BusinessStorefront,
  SocialReview
} from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  products: CommerceProduct[];
  storefronts: BusinessStorefront[];
  reviews: Record<string, SocialReview[]>;
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  onCurrencyChange: (curr: string) => void;
  currencyExchangeRates: Record<string, number>;
  onAddToCart: (product: CommerceProduct, variantId?: string) => void;
  onDirectBuy: (product: CommerceProduct, variantId?: string) => void;
  onOpenStorefront: (storeSlug: string) => void;
  onOpenChatWithSeller: (sellerId: string, sellerName: string) => void;
}

const ARCHETYPE_TABS: { key: ProductArchetype | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: 'All Catalogues', icon: '✨' },
  { key: 'physical', label: 'Physical', icon: '📦' },
  { key: 'digital', label: 'Digital SDKs', icon: '💻' },
  { key: 'course', label: 'Courses', icon: '🎓' },
  { key: 'service', label: 'Services', icon: '🛠️' },
  { key: 'subscription', label: 'Subscriptions', icon: '⚡' },
  { key: 'appointment', label: 'Advisory (1:1)', icon: '🗓️' },
  { key: 'ticket', label: 'Tickets', icon: '🎟️' },
  { key: 'donation', label: 'Donations', icon: '💝' },
  { key: 'membership', label: 'Memberships', icon: '👑' }
];

export const OmniMarketplaceCatalogView: React.FC<Props> = ({
  products,
  storefronts,
  reviews,
  activeProfile,
  selectedCurrency,
  onCurrencyChange,
  currencyExchangeRates,
  onAddToCart,
  onDirectBuy,
  onOpenStorefront,
  onOpenChatWithSeller
}) => {
  const [selectedArchetype, setSelectedArchetype] = useState<ProductArchetype | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<CommerceProduct | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const [quickBuySuccessMsg, setQuickBuySuccessMsg] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const formatPrice = (priceUsd: number) => {
    const rate = currencyExchangeRates[selectedCurrency] || 1.0;
    const converted = priceUsd * rate;
    
    if (selectedCurrency === 'USD') return `$${converted.toFixed(2)}`;
    if (selectedCurrency === 'EUR') return `€${converted.toFixed(2)}`;
    if (selectedCurrency === 'GBP') return `£${converted.toFixed(2)}`;
    if (selectedCurrency === 'OMNI') return `⚡${(priceUsd / 4.5).toFixed(2)} OMNI`;
    if (selectedCurrency === 'USDC') return `₮${priceUsd.toFixed(2)} USDC`;
    if (selectedCurrency === 'NGN') return `₦${(priceUsd * 1540).toLocaleString()}`;
    if (selectedCurrency === 'BRL') return `R$${(priceUsd * 5.5).toFixed(2)}`;
    return `$${priceUsd.toFixed(2)}`;
  };

  const filteredProducts = products.filter(p => {
    const matchesArchetype = selectedArchetype === 'all' || p.archetype === selectedArchetype;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesArchetype && matchesSearch;
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleOpenDetail = (p: CommerceProduct) => {
    setSelectedProductForModal(p);
    setSelectedVariantId(p.variants[0]?.id);
  };

  const handleAddToCartWithAlert = (p: CommerceProduct, varId?: string) => {
    onAddToCart(p, varId);
    setQuickBuySuccessMsg(`Added "${p.name}" to your OMNI Cart`);
    setTimeout(() => setQuickBuySuccessMsg(null), 3000);
  };

  return (
    <div id="omni-marketplace-catalog-view" className="space-y-6">
      {/* Top Banner / Marketplace Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                SOVEREIGN ESCROW PROTECTED
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                OMNI PAY 1-CLICK
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-7 h-7 text-indigo-400" />
              OMNI Marketplace & Social Catalogue
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Discover physical security hardware, verified developer SDKs, live cohort courses, consulting, and memberships from sovereign creators and verified enterprises.
            </p>
          </div>

          {/* Currency Switcher & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Currency:</span>
              <select
                value={selectedCurrency}
                onChange={e => onCurrencyChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                <option value="OMNI" className="bg-slate-900 text-white">OMNI (⚡)</option>
                <option value="USDC" className="bg-slate-900 text-white">USDC (₮)</option>
                <option value="NGN" className="bg-slate-900 text-white">NGN (₦)</option>
                <option value="BRL" className="bg-slate-900 text-white">BRL (R$)</option>
              </select>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, sellers, SDKs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Featured Storefronts Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
            <Store className="w-3.5 h-3.5 text-indigo-400" />
            Verified Stores:
          </span>
          {storefronts.map(sf => (
            <button
              key={sf.id}
              onClick={() => onOpenStorefront(sf.handle)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl text-xs text-slate-200 whitespace-nowrap transition group"
            >
              <img src={sf.logoUrl} alt={sf.name} className="w-4 h-4 rounded-full object-cover" />
              <span className="font-medium group-hover:text-indigo-300">{sf.name}</span>
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Success Notification Alert */}
      {quickBuySuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center justify-between shadow-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{quickBuySuccessMsg}</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">Synchronized with OMNI Cart</span>
        </div>
      )}

      {/* 9 Archetype Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {ARCHETYPE_TABS.map(tab => {
          const isActive = selectedArchetype === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedArchetype(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {tab.key === 'all' ? products.length : products.filter(p => p.archetype === tab.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => {
          const isWishlisted = wishlist.has(p.id);
          const currentVariant = p.variants[0];
          const calculatedPrice = p.priceUsd + (currentVariant?.priceDeltaUsd || 0);

          return (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col transition group shadow-md hover:shadow-xl"
            >
              {/* Media Thumbnail & Overlay Badges */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => handleOpenDetail(p)}>
                <img
                  src={p.mediaUrls[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {p.archetype}
                  </span>
                  {p.isFeaturedMarketplace && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 backdrop-blur-md">
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={e => toggleWishlist(p.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition ${
                    isWishlisted ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
                </button>

                {/* Bottom Media Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-md">
                    {p.category}
                  </span>
                  {p.inventoryCount < 10 && p.inventoryCount > 0 && (
                    <span className="text-[10px] font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-500/30">
                      Only {p.inventoryCount} left
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Seller Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() => onOpenStorefront(p.sellerStoreSlug)}
                      className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-300 transition group/seller"
                    >
                      <img src={p.sellerAvatar} alt={p.sellerName} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-medium truncate max-w-[140px]">{p.sellerName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    </button>

                    <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{p.averageRating.toFixed(1)}</span>
                      <span className="text-slate-500 text-[10px]">({p.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => handleOpenDetail(p)}
                    className="text-base font-bold text-white hover:text-indigo-300 transition cursor-pointer line-clamp-1"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.headline}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Purchase Actions */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <div className="text-lg font-extrabold text-white">
                        {formatPrice(calculatedPrice)}
                      </div>
                      {p.compareAtPriceUsd && (
                        <div className="text-xs text-slate-500 line-through">
                          {formatPrice(p.compareAtPriceUsd)}
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                      {p.archetype === 'physical' ? 'Tracked Delivery' : 'Instant Delivery'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCartWithAlert(p, currentVariant?.id)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => onDirectBuy(p, currentVariant?.id)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 mt-1">Try switching categories or clearing search keywords.</p>
        </div>
      )}

      {/* DETAILED PRODUCT QUICK-VIEW MODAL */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedProductForModal.archetype}
                </span>
                <span className="text-xs text-slate-400">• {selectedProductForModal.category}</span>
              </div>
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg text-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Gallery */}
              <div className="space-y-3">
                <img
                  src={selectedProductForModal.mediaUrls[0]}
                  alt={selectedProductForModal.name}
                  className="w-full aspect-square object-cover rounded-xl border border-slate-800"
                />
                {selectedProductForModal.mediaUrls.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProductForModal.mediaUrls.map((url, idx) => (
                      <img key={idx} src={url} alt="thumbnail" className="h-16 w-full object-cover rounded-lg border border-slate-800" />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Specifications & Order Box */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() => {
                        setSelectedProductForModal(null);
                        onOpenStorefront(selectedProductForModal.sellerStoreSlug);
                      }}
                      className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:underline"
                    >
                      <Store className="w-3.5 h-3.5" />
                      {selectedProductForModal.sellerName}
                    </button>
                    <button
                      onClick={() => onOpenChatWithSeller(selectedProductForModal.sellerId, selectedProductForModal.sellerName)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                    >
                      <MessageSquare className="w-3 h-3 text-indigo-400" />
                      Chat with Seller
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-white">{selectedProductForModal.name}</h2>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedProductForModal.description}</p>

                  {/* Variants Selector */}
                  {selectedProductForModal.variants.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Select Option / Variant:</label>
                      <div className="space-y-1.5">
                        {selectedProductForModal.variants.map(v => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariantId(v.id)}
                            className={`w-full p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition border ${
                              selectedVariantId === v.id
                                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span>{v.name}: {v.value}</span>
                            <span className="font-bold text-indigo-300">
                              {v.priceDeltaUsd > 0 ? `+${formatPrice(v.priceDeltaUsd)}` : 'Included'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Shipping / Delivery Info Box */}
                  <div className="mt-4 p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      <Truck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Fulfillment & Escrow Warranty</span>
                    </div>
                    {selectedProductForModal.shippingInfo ? (
                      <p className="text-slate-400">
                        Dispatched from {selectedProductForModal.shippingInfo.originCountry} in {selectedProductForModal.shippingInfo.estimatedDeliveryDays.min}-{selectedProductForModal.shippingInfo.estimatedDeliveryDays.max} business days.
                      </p>
                    ) : (
                      <p className="text-slate-400">
                        Instant digital credential delivery to your OMNI account upon blockchain transaction confirmation.
                      </p>
                    )}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Total Amount:</span>
                    <span className="text-xl font-black text-white">
                      {formatPrice(
                        selectedProductForModal.priceUsd +
                        (selectedProductForModal.variants.find(v => v.id === selectedVariantId)?.priceDeltaUsd || 0)
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        handleAddToCartWithAlert(selectedProductForModal, selectedVariantId);
                        setSelectedProductForModal(null);
                      }}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        onDirectBuy(selectedProductForModal, selectedVariantId);
                        setSelectedProductForModal(null);
                      }}
                      className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
                    >
                      <Zap className="w-4 h-4 text-amber-400" />
                      Instant Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Reviews Section in Modal */}
            {reviews[selectedProductForModal.id] && reviews[selectedProductForModal.id].length > 0 && (
              <div className="border-t border-slate-800 pt-5 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  Verified Social Reviews ({reviews[selectedProductForModal.id].length})
                </h4>

                <div className="space-y-3">
                  {reviews[selectedProductForModal.id].map(rev => (
                    <div key={rev.id} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rev.authorAvatar} alt={rev.authorName} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-semibold text-white">{rev.authorName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-200">{rev.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{rev.comment}</p>
                      {rev.sellerReply && (
                        <div className="pl-3 border-l-2 border-indigo-500 text-xs text-indigo-300 space-y-0.5 mt-2 bg-indigo-950/30 p-2 rounded-r-lg">
                          <span className="font-bold">{rev.sellerReply.authorName}:</span>
                          <p className="text-slate-300">{rev.sellerReply.replyText}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
