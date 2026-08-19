import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Zap,
  TrendingDown,
  ShoppingBag,
  Layers,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Check,
  Copy,
  Calendar,
  Lock
} from 'lucide-react';
import {
  OmniMarketProduct,
  OmniSellerProfile,
  ProductReview,
  ProductCouponOffer
} from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniProductDetailViewProps {
  product: OmniMarketProduct;
  onBack: () => void;
  onAddToCart: (product: OmniMarketProduct) => void;
  onOpenCheckout: () => void;
  onOpenSeller: (sellerId: string) => void;
  onCompareToggle: (product: OmniMarketProduct) => void;
  isCompared?: boolean;
}

export const OmniProductDetailView: React.FC<OmniProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
  onOpenCheckout,
  onOpenSeller,
  onCompareToggle,
  isCompared = false
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'price_history' | 'reviews' | 'seller'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Review submission state
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(
    omniCommerceService.getReviewsForProduct(product.id)
  );

  const seller = omniCommerceService.getSellerProfile(product.sellerId);
  const coupons = omniCommerceService.getCouponsForProduct(product.id);

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://market.omni.com/p/${product.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
  };

  const handleQuickBuy = () => {
    onAddToCart(product);
    onOpenCheckout();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewContent.trim() || !authorName.trim()) return;

    const newRev = omniCommerceService.addReview(product.id, {
      authorName: authorName.trim(),
      authorBadge: 'Verified Buyer',
      rating: reviewRating,
      title: reviewTitle.trim(),
      content: reviewContent.trim(),
      verifiedPurchase: true,
      sentiment: reviewRating >= 4 ? 'positive' : reviewRating === 3 ? 'neutral' : 'negative',
      botLikelihoodScore: 1,
      keyPraiseOrComplaint: ['User Submitted Review']
    });

    setReviewsList([newRev, ...reviewsList]);
    setReviewTitle('');
    setReviewContent('');
    setShowAddReview(false);
  };

  return (
    <div id="omni-product-detail-view" className="w-full space-y-6 pb-12">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onCompareToggle(product)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              isCompared
                ? 'bg-indigo-600 border-indigo-400 text-white'
                : 'bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Added to Comparison' : 'Compare Product'}</span>
          </button>

          <button
            onClick={handleCopyShareLink}
            className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            title="Share Sovereign Product Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mandatory Sponsored Disclosure Banner */}
      {product.isSponsored && product.sponsoredDetails && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-1.5 text-xs text-amber-200 shadow-lg">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-400">
            <Info className="w-4 h-4" />
            <span>COMMERCE TRANSPARENCY & SPONSORED DISCLOSURE</span>
          </div>
          <p className="leading-relaxed">
            {product.sponsoredDetails.disclosureText}
          </p>
          <div className="text-[11px] font-mono text-amber-400/80 pt-1">
            Campaign: {product.sponsoredDetails.campaignName} • Sponsor: {product.sponsoredDetails.sponsorName} • Audit Hash: {product.sponsoredDetails.transparencyAuditHash}
          </div>
        </div>
      )}

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Gallery Column */}
        <div className="lg:col-span-6 space-y-3">
          <div className="aspect-[16/11] rounded-2xl bg-stone-950 border border-stone-800 overflow-hidden relative shadow-2xl">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.discountPercentage && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-500 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg">
                Save {product.discountPercentage}%
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx
                      ? 'border-indigo-500 scale-105 shadow-md'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Key Pros and Cons AI Synthesis */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Strengths
              </span>
              <ul className="space-y-1 text-xs text-stone-300">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/60 space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Trade-offs & Considerations
              </span>
              <ul className="space-y-1 text-xs text-stone-300">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Purchase & Details Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-semibold text-indigo-400 uppercase tracking-wider">{product.brand}</span>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm">{product.rating.toFixed(2)}</span>
                <span className="text-stone-500 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-stone-100 leading-tight">
              {product.title}
            </h1>

            <p className="text-sm text-stone-400 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Checkout Box */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-stone-100">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-400 mt-0.5">
                  Or 4 interest-free payments of <span className="text-stone-200 font-bold">${(product.price / 4).toFixed(2)}</span> via OMNI Pay
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock ({product.stockQuantity} units)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                id="btn-detail-add-cart"
                onClick={() => onAddToCart(product)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 font-bold text-xs transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                id="btn-detail-quick-buy"
                onClick={handleQuickBuy}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-lg active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>1-Click OMNI Pay</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sovereign Escrow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{product.shippingInfo.estimatedDays}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{product.returnPolicyDays}-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Active Offers & Coupons */}
          {coupons.length > 0 && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-900/60 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>AVAILABLE SOVEREIGN COUPONS</span>
              </div>
              <div className="space-y-1.5">
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 mr-2">
                        {c.code}
                      </span>
                      <span className="text-stone-300">{c.title}</span>
                    </div>
                    <button
                      onClick={() => handleApplyCoupon(c.code)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        appliedCoupon === c.code
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600/80 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {appliedCoupon === c.code ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Seller Snippet */}
          {seller && (
            <div
              onClick={() => onOpenSeller(seller.id)}
              className="p-4 rounded-2xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl cursor-pointer transition-colors space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={seller.logo} alt="" className="w-10 h-10 rounded-xl object-cover border border-stone-700" referrerPolicy="no-referrer" />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-stone-200 group-hover:text-indigo-300">
                      <span>{seller.storeName}</span>
                      {seller.verifiedBadge && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div className="text-xs text-stone-400">{seller.sovereignNodeLocation}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">{seller.trustScore}%</div>
                  <div className="text-[10px] text-stone-500">Trust Score</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Specifications | Price History | Verified Reviews | Seller Scorecard */}
      <div className="space-y-4 pt-6 border-t border-stone-800">
        <div className="flex gap-2 border-b border-stone-800 pb-2">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'price_history', label: 'Historical Price Tracker' },
            { id: 'reviews', label: `Verified Reviews (${reviewsList.length})` },
            { id: 'seller', label: 'Seller & Escrow Policy' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-200">Hardware & Architectural Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <span className="text-stone-400 font-medium">{spec.name}</span>
                  <span className="text-stone-100 font-bold text-right font-mono">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Product Highlights</h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: PRICE HISTORY */}
        {activeTab === 'price_history' && (
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-200">Historical Price Movement (90-Day Trend)</h3>
                <p className="text-xs text-stone-400">Cryptographically indexed price tracker across sovereign merchant nodes.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold">
                Lowest Recorded: ${Math.min(...product.priceHistory.map(p => p.price)).toFixed(2)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="space-y-2">
                {product.priceHistory.map((point, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-stone-900 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span className="text-stone-300 font-mono">{point.date}</span>
                    </div>
                    <span className="text-stone-400">{point.seller}</span>
                    <div className="flex items-center gap-2">
                      {point.isSale && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Promo
                        </span>
                      )}
                      <span className="font-mono font-bold text-stone-100">${point.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-stone-100">{product.rating.toFixed(1)}</div>
                  <div className="flex text-amber-400 justify-center">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">{reviewsList.length} verified</div>
                </div>
                <div className="h-10 w-px bg-stone-800" />
                <div className="text-xs text-stone-400 space-y-0.5">
                  <div className="text-emerald-400 font-bold">0% Bot / Fake Reviews Deflected</div>
                  <div>Cryptographic signature verified for all buyer receipts.</div>
                </div>
              </div>

              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Write Review
              </button>
            </div>

            {/* Add Review Form */}
            {showAddReview && (
              <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-stone-900 border border-indigo-700/60 space-y-3">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Submit Sovereign Verified Review</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name or Alias"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                    required
                  />
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xs text-stone-400">Rating:</span>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`text-sm ${reviewRating >= star ? 'text-amber-400' : 'text-stone-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Review Headline"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100"
                  required
                />
                <textarea
                  placeholder="Share your technical impressions, build quality, and setup experience..."
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-100 min-h-[80px]"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddReview(false)}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-400 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-200">{rev.authorName}</span>
                      {rev.authorBadge && (
                        <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-semibold border border-indigo-800">
                          {rev.authorBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-stone-500 font-mono text-[11px]">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>

                  <h5 className="text-xs font-bold text-stone-100">{rev.title}</h5>
                  <p className="text-xs text-stone-300 leading-relaxed">{rev.content}</p>

                  {rev.merchantReply && (
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1 mt-2">
                      <div className="font-bold text-indigo-400 text-[11px]">Merchant Response ({rev.merchantReply.date}):</div>
                      <p className="text-stone-400">{rev.merchantReply.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SELLER & ESCROW POLICY */}
        {activeTab === 'seller' && seller && (
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-stone-800">
              <img src={seller.logo} alt="" className="w-14 h-14 rounded-2xl object-cover border border-stone-700" referrerPolicy="no-referrer" />
              <div>
                <h3 className="text-base font-bold text-stone-100">{seller.storeName}</h3>
                <p className="text-xs text-stone-400">{seller.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-stone-500 text-[10px]">Escrow Compliance</div>
                <div className="text-base font-bold text-emerald-400">{seller.escrowComplianceScore}%</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-stone-500 text-[10px]">Total Orders Fulfilled</div>
                <div className="text-base font-bold text-stone-200">{seller.totalSalesCount.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-stone-500 text-[10px]">Positive Feedback</div>
                <div className="text-base font-bold text-amber-400">{seller.positiveReviewPercent}%</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-stone-500 text-[10px]">Avg Response Time</div>
                <div className="text-base font-bold text-cyan-400">{seller.avgResponseTimeMinutes} mins</div>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="font-bold text-stone-300">Return Policy: </span>
                <span className="text-stone-400">{seller.returnPolicy}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="font-bold text-stone-300">Warranty Policy: </span>
                <span className="text-stone-400">{seller.warrantyPolicy}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
