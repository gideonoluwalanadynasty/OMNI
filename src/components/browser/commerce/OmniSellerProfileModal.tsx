import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Star,
  Award,
  Clock,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { OmniSellerProfile, OmniMarketProduct } from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniSellerProfileModalProps {
  sellerId: string | null;
  onClose: () => void;
  onSelectProduct: (product: OmniMarketProduct) => void;
  onAddToCart: (product: OmniMarketProduct) => void;
}

export const OmniSellerProfileModal: React.FC<OmniSellerProfileModalProps> = ({
  sellerId,
  onClose,
  onSelectProduct,
  onAddToCart
}) => {
  if (!sellerId) return null;

  const seller: OmniSellerProfile | undefined = omniCommerceService.getSellerProfile(sellerId);
  if (!seller) return null;

  const sellerProducts = omniCommerceService.getProducts().filter(p => p.sellerId === seller.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Banner & Header */}
        <div className="relative">
          <div className="h-32 bg-stone-900 overflow-hidden relative">
            <img src={seller.banner} alt="" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/60" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Identity Row */}
          <div className="px-6 -mt-10 relative flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={seller.logo}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover border-4 border-stone-950 bg-stone-900 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-0.5 pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-100">{seller.storeName}</h3>
                  {seller.verifiedBadge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Merchant
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>{seller.sovereignNodeLocation}</span>
                  <span>•</span>
                  <span>Member since {seller.memberSince}</span>
                </div>
              </div>
            </div>

            <div className="text-right pb-1">
              <div className="text-xl font-extrabold text-emerald-400 font-mono">{seller.trustScore}%</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Trust Score</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <p className="text-xs text-stone-300 leading-relaxed">
            {seller.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {seller.badges.map((b, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-xl bg-stone-900 text-stone-300 border border-stone-800 text-xs flex items-center gap-1.5 font-medium"
              >
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>{b}</span>
              </span>
            ))}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="text-stone-500 text-[10px]">Escrow Compliance</div>
              <div className="text-base font-bold text-emerald-400 font-mono">{seller.escrowComplianceScore}%</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="text-stone-500 text-[10px]">Verified Sales</div>
              <div className="text-base font-bold text-stone-100 font-mono">{seller.totalSalesCount.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="text-stone-500 text-[10px]">Positive Rating</div>
              <div className="text-base font-bold text-amber-400 font-mono">{seller.positiveReviewPercent}%</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
              <div className="text-stone-500 text-[10px]">Response Time</div>
              <div className="text-base font-bold text-cyan-400 font-mono">{seller.avgResponseTimeMinutes} min</div>
            </div>
          </div>

          {/* Active Storefront Catalog */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Storefront Catalog ({sellerProducts.length} items)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sellerProducts.map(prod => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                >
                  <img
                    src={prod.images[0]}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover bg-stone-950 border border-stone-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h5
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="font-bold text-stone-200 hover:text-indigo-300 cursor-pointer truncate"
                    >
                      {prod.title}
                    </h5>
                    <div className="text-sm font-extrabold text-stone-100 font-mono mt-0.5">
                      ${prod.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 text-xs text-stone-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All sales backed by 100% OMNI Multi-Sig Sovereign Escrow</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
