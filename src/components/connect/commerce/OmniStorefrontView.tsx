import React, { useState } from 'react';
import {
  Store,
  ShieldCheck,
  Star,
  ShoppingBag,
  Tag,
  MessageSquare,
  Users,
  Info,
  Mail,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Plus,
  Zap,
  Globe,
  Award,
  Layers
} from 'lucide-react';
import {
  BusinessStorefront,
  CommerceProduct,
  StoreSectionTab,
  SocialReview
} from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  storefront: BusinessStorefront;
  products: CommerceProduct[];
  reviews: Record<string, SocialReview[]>;
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onAddToCart: (product: CommerceProduct, variantId?: string) => void;
  onDirectBuy: (product: CommerceProduct, variantId?: string) => void;
  onOpenChatWithSeller: (sellerId: string, sellerName: string) => void;
  onBackToMarketplace: () => void;
}

export const OmniStorefrontView: React.FC<Props> = ({
  storefront,
  products,
  reviews,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onAddToCart,
  onDirectBuy,
  onOpenChatWithSeller,
  onBackToMarketplace
}) => {
  const [activeSection, setActiveSection] = useState<StoreSectionTab>('products');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

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

  const storeProducts = products.filter(p => p.sellerId === storefront.profileId);
  const displayedProducts = selectedCollectionId
    ? storeProducts.filter(p => {
        const col = storefront.collections.find(c => c.id === selectedCollectionId);
        return col?.productIds.includes(p.id);
      })
    : storeProducts;

  // Flatten store reviews
  const allStoreReviews = storeProducts.flatMap(p => reviews[p.id] || []);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  return (
    <div id="omni-storefront-view" className="space-y-6">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToMarketplace}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl transition"
        >
          ← Back to Global Marketplace
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Response Time:</span>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{storefront.averageResponseTimeMinutes} mins
          </span>
        </div>
      </div>

      {/* Store Banner & Brand Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Hero Cover Banner */}
        <div className="h-48 md:h-64 w-full relative overflow-hidden bg-slate-950">
          <img
            src={storefront.bannerUrl}
            alt={storefront.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        {/* Identity & KPI Bar */}
        <div className="p-6 md:p-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-5">
              <img
                src={storefront.logoUrl}
                alt={storefront.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl bg-slate-800"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">{storefront.name}</h1>
                  <ShieldCheck className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                </div>
                <p className="text-xs font-mono text-indigo-400">@{storefront.handle}</p>
                <p className="text-xs text-slate-300 max-w-xl line-clamp-1">{storefront.tagline}</p>
              </div>
            </div>

            {/* Store Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenChatWithSeller(storefront.profileId, storefront.name)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                Message Store
              </button>

              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2">
                <Users className="w-4 h-4" />
                Follow Store ({storefront.socialProof.followersCount.toLocaleString()})
              </button>
            </div>
          </div>

          {/* Social Proof & Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Total Sales Volume</div>
              <div className="text-lg font-black text-white mt-0.5">
                ${(storefront.socialProof.totalSalesVolumeUsd / 1000000).toFixed(2)}M+
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Customer Satisfaction</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {storefront.socialProof.satisfactionRate}%
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Origin / Jurisdiction</div>
              <div className="text-lg font-black text-white mt-0.5 flex items-center gap-1">
                <Globe className="w-4 h-4 text-indigo-400" />
                {storefront.country}
              </div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">Escrow Return Policy</div>
              <div className="text-lg font-black text-indigo-300 mt-0.5">
                {storefront.returnPolicyDays} Days Money-Back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Sections Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin">
        {[
          { id: 'products', label: 'All Products', count: storeProducts.length, icon: ShoppingBag },
          { id: 'collections', label: 'Collections', count: storefront.collections.length, icon: Layers },
          { id: 'offers', label: 'Special Offers', count: storefront.specialOffers.length, icon: Tag },
          { id: 'reviews', label: 'Verified Reviews', count: allStoreReviews.length, icon: Star },
          { id: 'about', label: 'About Brand', icon: Info },
          { id: 'contact', label: 'Contact & Support', icon: Mail },
          { id: 'community', label: 'Community', icon: Users }
        ].map(tab => {
          const isActive = activeSection === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id as StoreSectionTab);
                if (tab.id !== 'products') setSelectedCollectionId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PRODUCTS */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          {selectedCollectionId && (
            <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/30 p-3.5 rounded-xl">
              <span className="text-xs text-indigo-200 font-semibold">
                Filtering by Collection: {storefront.collections.find(c => c.id === selectedCollectionId)?.title}
              </span>
              <button
                onClick={() => setSelectedCollectionId(null)}
                className="text-xs text-indigo-400 hover:text-white underline font-medium"
              >
                Clear Filter
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-md hover:shadow-xl transition">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img src={p.mediaUrls[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-900/90 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                    {p.archetype}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.headline}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-white">{formatPrice(p.priceUsd)}</div>
                      {p.compareAtPriceUsd && (
                        <div className="text-xs text-slate-500 line-through">{formatPrice(p.compareAtPriceUsd)}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(p)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
                        title="Add to Cart"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDirectBuy(p)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-md transition flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: COLLECTIONS */}
      {activeSection === 'collections' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storefront.collections.map(col => (
            <div
              key={col.id}
              onClick={() => {
                setSelectedCollectionId(col.id);
                setActiveSection('products');
              }}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer group transition shadow-lg"
            >
              <div className="h-44 relative overflow-hidden bg-slate-950">
                <img src={col.bannerImage} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/80 text-white backdrop-blur-md">
                  {col.productIds.length} Products
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition flex items-center justify-between">
                  <span>{col.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">{col.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: SPECIAL OFFERS */}
      {activeSection === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storefront.specialOffers.map(offer => (
            <div key={offer.id} className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {offer.discountPercentage}% OFF STOREWIDE
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-3">{offer.code}</h3>
                  <p className="text-xs text-slate-300 mt-1">{offer.description}</p>
                </div>
                <button
                  onClick={() => handleCopyCoupon(offer.code)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition shadow-md flex items-center gap-1.5"
                >
                  {copiedCoupon === offer.code ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Tag className="w-3.5 h-3.5" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Minimum Spend: ${offer.minimumSpendUsd}</span>
                <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 4: REVIEWS */}
      {activeSection === 'reviews' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-white">4.96</div>
              <div>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Based on {allStoreReviews.length} verified purchases</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              100% Cryptographically Verified
            </span>
          </div>

          <div className="space-y-3">
            {allStoreReviews.map(rev => (
              <div key={rev.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={rev.authorAvatar} alt={rev.authorName} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{rev.authorName}</div>
                      <div className="text-[10px] text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{rev.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                {rev.sellerReply && (
                  <div className="pl-3 border-l-2 border-indigo-500 text-xs bg-indigo-950/20 p-2.5 rounded-r-xl space-y-0.5 mt-2">
                    <span className="font-bold text-indigo-300">{rev.sellerReply.authorName}:</span>
                    <p className="text-slate-300">{rev.sellerReply.replyText}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: ABOUT BRAND */}
      {activeSection === 'about' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">About {storefront.name}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-3xl">
              {storefront.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Founded In</span>
              <div className="text-base font-bold text-white mt-1">{storefront.establishedYear}</div>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Verification Status</span>
              <div className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Business
              </div>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Headquarters</span>
              <div className="text-base font-bold text-white mt-1">{storefront.country}</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CONTACT & SUPPORT */}
      {activeSection === 'contact' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Merchant Concierge & Support</h3>
            <p className="text-xs text-slate-300 mt-1">
              Reach out directly to the merchant through verified encrypted channels or customer support email.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-slate-400">Official Merchant Email</div>
                  <div className="text-xs font-bold text-white">{storefront.contact.email}</div>
                </div>
              </div>
              <a
                href={`mailto:${storefront.contact.email}`}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition"
              >
                Send Email
              </a>
            </div>

            {storefront.contact.phone && (
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs text-slate-400">Direct Phone Line</div>
                    <div className="text-xs font-bold text-white">{storefront.contact.phone}</div>
                  </div>
                </div>
                <span className="text-xs text-slate-400">Business Hours</span>
              </div>
            )}

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs text-slate-400">OMNI In-App Direct Chat</div>
                  <div className="text-xs font-bold text-white">Response in ~{storefront.averageResponseTimeMinutes} mins</div>
                </div>
              </div>
              <button
                onClick={() => onOpenChatWithSeller(storefront.profileId, storefront.name)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-md transition"
              >
                Open Live Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: COMMUNITY */}
      {activeSection === 'community' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{storefront.name} VIP Customer Space</h3>
              <p className="text-xs text-slate-300 mt-1">
                Access product firmware drops, beta SDK releases, and direct discussions with engineers.
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-md transition flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Join Space
            </button>
          </div>

          <div className="p-6 bg-slate-950/60 border border-slate-800 rounded-xl text-center space-y-2">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Active Discussions & Member Perks</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Over {storefront.socialProof.followersCount.toLocaleString()} sovereign members are currently participating in live design sprints and hardware reviews.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
