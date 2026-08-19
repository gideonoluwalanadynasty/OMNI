import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Layers,
  Share2,
  ShieldCheck,
  Zap,
  Info,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Tag,
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import {
  OmniMarketProduct,
  ProductCategory,
  OmniPayOrder
} from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';
import { OmniProductCard } from './OmniProductCard';
import { OmniProductDetailView } from './OmniProductDetailView';
import { OmniProductComparisonView } from './OmniProductComparisonView';
import { OmniSellerProfileModal } from './OmniSellerProfileModal';
import { OmniPayCheckoutDrawer } from './OmniPayCheckoutDrawer';
import { OmniAffiliateHubView } from './OmniAffiliateHubView';
import { OmniAiShoppingCopilotModal } from './OmniAiShoppingCopilotModal';

interface OmniCommerceRootProps {
  initialProductId?: string;
  onNavigateUrl?: (url: string) => void;
}

export const OmniCommerceRoot: React.FC<OmniCommerceRootProps> = ({
  initialProductId,
  onNavigateUrl
}) => {
  // Navigation & View Mode
  const [selectedProduct, setSelectedProduct] = useState<OmniMarketProduct | null>(() => {
    if (initialProductId) {
      return omniCommerceService.getProductById(initialProductId) || null;
    }
    return null;
  });
  const [viewMode, setViewMode] = useState<'catalog' | 'detail' | 'compare' | 'affiliate'>(
    initialProductId ? 'detail' : 'catalog'
  );

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'discount'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyVerifiedSellers, setOnlyVerifiedSellers] = useState(false);
  const [onlyDisclosedSponsored, setOnlyDisclosedSponsored] = useState(false);

  // Modals & Drawers
  const [showCheckoutDrawer, setShowCheckoutDrawer] = useState(false);
  const [showAiCopilot, setShowAiCopilot] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);

  // Comparison State
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [cartBadgeCount, setCartBadgeCount] = useState<number>(
    omniCommerceService.getCart().reduce((sum, i) => sum + i.quantity, 0)
  );

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Catalog' },
    { id: 'neural_hardware', label: 'Neural Hardware & TPUs' },
    { id: 'developer_rigs', label: 'Developer Rigs' },
    { id: 'sovereign_security', label: 'Security & FIDO3' },
    { id: 'cloud_appliances', label: 'Private Cloud Storage' },
    { id: 'smart_enclaves', label: 'Smart Enclaves' },
    { id: 'wearables', label: 'Sovereign Wearables' },
    { id: 'peripherals', label: 'Peripherals & Keyboards' }
  ];

  const products = omniCommerceService.getProducts({
    category: selectedCategory,
    searchQuery,
    sortBy,
    onlyInStock,
    onlyVerifiedSellers,
    onlyDisclosedSponsored
  });

  const handleSelectProduct = (product: OmniMarketProduct) => {
    setSelectedProduct(product);
    setViewMode('detail');
  };

  const handleAddToCart = (product: OmniMarketProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    omniCommerceService.addToCart(product, 1);
    setCartBadgeCount(omniCommerceService.getCart().reduce((sum, i) => sum + i.quantity, 0));
  };

  const handleToggleCompare = (product: OmniMarketProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (comparedProductIds.includes(product.id)) {
      setComparedProductIds(comparedProductIds.filter(id => id !== product.id));
    } else {
      if (comparedProductIds.length >= 4) {
        alert('You can compare up to 4 products simultaneously.');
        return;
      }
      setComparedProductIds([...comparedProductIds, product.id]);
    }
  };

  const handleOrderCompleted = (order: OmniPayOrder) => {
    setCartBadgeCount(0);
  };

  return (
    <div id="omni-commerce-root" className="min-h-full bg-stone-950 text-stone-100 font-sans p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Sovereign Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-stone-900 to-stone-950 border border-stone-800 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center shadow-lg">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-100 tracking-tight">OMNI Market</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono font-semibold">
                Sovereign Commerce
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Hardware accelerators, post-quantum security keys & sovereign rigs backed by OMNI Pay escrow.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Shopping Assistant Button */}
          <button
            id="btn-ai-shopping-assistant"
            onClick={() => setShowAiCopilot(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Shopping AI Copilot</span>
          </button>

          {/* Affiliate Hub Button */}
          <button
            onClick={() => setViewMode(viewMode === 'affiliate' ? 'catalog' : 'affiliate')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              viewMode === 'affiliate'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>OMNI Affiliate</span>
          </button>

          {/* Cart & OMNI Pay Drawer Button */}
          <button
            id="btn-open-cart-drawer"
            onClick={() => setShowCheckoutDrawer(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold border border-stone-700 transition-colors shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>OMNI Pay</span>
            {cartBadgeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {cartBadgeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'affiliate' ? (
        <OmniAffiliateHubView
          onBack={() => setViewMode('catalog')}
          onSelectProduct={handleSelectProduct}
        />
      ) : viewMode === 'compare' ? (
        <OmniProductComparisonView
          productIds={comparedProductIds}
          onBack={() => setViewMode('catalog')}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          onRemoveFromCompare={(id) => setComparedProductIds(comparedProductIds.filter(i => i !== id))}
        />
      ) : viewMode === 'detail' && selectedProduct ? (
        <OmniProductDetailView
          product={selectedProduct}
          onBack={() => setViewMode('catalog')}
          onAddToCart={handleAddToCart}
          onOpenCheckout={() => setShowCheckoutDrawer(true)}
          onOpenSeller={(sellerId) => setSelectedSellerId(sellerId)}
          onCompareToggle={handleToggleCompare}
          isCompared={comparedProductIds.includes(selectedProduct.id)}
        />
      ) : (
        /* CATALOG & DISCOVERY VIEW */
        <div className="space-y-6">
          {/* Search, Category Bar & Filters */}
          <div className="space-y-4">
            {/* Search and Sort Row */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search sovereign silicon, FIDO3 keys, ZFS storage appliances, developer rigs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 focus:border-indigo-500 text-xs text-stone-100 placeholder:text-stone-500 outline-none"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="px-3 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-300 text-xs outline-none cursor-pointer"
                >
                  <option value="featured">Featured & Sponsored First</option>
                  <option value="rating">Highest Rated (★)</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="discount">Biggest Discount (%)</option>
                </select>
              </div>
            </div>

            {/* Category Chips Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Filter Badges: In Stock | Verified Sellers | Sponsored Transparency */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="rounded bg-stone-900 border-stone-700 text-indigo-600 focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200">
                <input
                  type="checkbox"
                  checked={onlyVerifiedSellers}
                  onChange={e => setOnlyVerifiedSellers(e.target.checked)}
                  className="rounded bg-stone-900 border-stone-700 text-indigo-600 focus:ring-0"
                />
                <span>Verified Merchants Only</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-200">
                <input
                  type="checkbox"
                  checked={onlyDisclosedSponsored}
                  onChange={e => setOnlyDisclosedSponsored(e.target.checked)}
                  className="rounded bg-stone-900 border-stone-700 text-indigo-600 focus:ring-0"
                />
                <span>Disclosed Sponsored Only</span>
              </label>

              <div className="ml-auto text-[11px] text-stone-500 font-mono">
                Showing {products.length} Products
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-stone-900/40 rounded-3xl border border-stone-800">
              <ShoppingBag className="w-10 h-10 text-stone-600 mx-auto" />
              <h3 className="text-sm font-bold text-stone-300">No products match your criteria</h3>
              <p className="text-xs text-stone-500">Try adjusting your search terms or filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setOnlyInStock(false);
                  setOnlyVerifiedSellers(false);
                  setOnlyDisclosedSponsored(false);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <OmniProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectProduct}
                  onAddToCart={handleAddToCart}
                  onCompareToggle={handleToggleCompare}
                  isCompared={comparedProductIds.includes(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Comparison Drawer (if 1+ products selected) */}
      {comparedProductIds.length > 0 && viewMode !== 'compare' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-stone-900/95 border border-indigo-500/80 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-stone-200">
              {comparedProductIds.length} item{comparedProductIds.length > 1 ? 's' : ''} in comparison queue
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('compare')}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparedProductIds([])}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
              title="Clear Comparison Queue"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <OmniPayCheckoutDrawer
        isOpen={showCheckoutDrawer}
        onClose={() => setShowCheckoutDrawer(false)}
        onOrderCompleted={handleOrderCompleted}
      />

      <OmniAiShoppingCopilotModal
        isOpen={showAiCopilot}
        onClose={() => setShowAiCopilot(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />

      <OmniSellerProfileModal
        sellerId={selectedSellerId}
        onClose={() => setSelectedSellerId(null)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />
    </div>
  );
};
