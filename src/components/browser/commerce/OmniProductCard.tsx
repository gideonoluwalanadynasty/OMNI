import React from 'react';
import {
  Star,
  ShieldCheck,
  Zap,
  TrendingDown,
  ShoppingBag,
  Layers,
  Award,
  CheckCircle2,
  Info,
  ExternalLink
} from 'lucide-react';
import { OmniMarketProduct } from '../../../types/commerce_market';

interface OmniProductCardProps {
  product: OmniMarketProduct;
  onSelect: (product: OmniMarketProduct) => void;
  onAddToCart: (product: OmniMarketProduct, e: React.MouseEvent) => void;
  onCompareToggle?: (product: OmniMarketProduct, e: React.MouseEvent) => void;
  isCompared?: boolean;
}

export const OmniProductCard: React.FC<OmniProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onCompareToggle,
  isCompared = false
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-indigo-600/70 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/40" />

        {/* Top Badges: Sponsored Disclosure & Discounts */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
          {product.isSponsored ? (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow-md backdrop-blur-sm"
              title={product.sponsoredDetails?.disclosureText || 'Sponsored merchant placement'}
            >
              <Info className="w-3 h-3" />
              {product.sponsoredDetails?.badge || 'Sponsored'}
            </span>
          ) : product.discountPercentage ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/90 text-stone-950 font-bold text-[10px] uppercase tracking-wider shadow-md">
              <TrendingDown className="w-3 h-3" />
              Save {product.discountPercentage}%
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-800/80 text-stone-300 font-medium text-[10px] border border-stone-700/60 backdrop-blur-sm">
              {product.category.replace('_', ' ')}
            </span>
          )}

          {product.escrowProtected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-700/80 text-indigo-300 text-[10px] font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              Escrow Protected
            </span>
          )}
        </div>

        {/* Quick Compare Toggle */}
        {onCompareToggle && (
          <button
            type="button"
            onClick={(e) => onCompareToggle(product, e)}
            className={`absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors backdrop-blur-md shadow-md ${
              isCompared
                ? 'bg-indigo-600 text-white border border-indigo-400'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700'
            }`}
            title="Add to multi-product comparison matrix"
          >
            <Layers className="w-3 h-3" />
            <span>{isCompared ? 'Compared' : '+ Compare'}</span>
          </button>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-medium text-stone-300 truncate max-w-[150px]">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-500 font-normal text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-stone-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>

          <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 text-[10px] font-mono border border-stone-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-stone-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>{product.inStock ? 'In Stock (Sovereign Node)' : 'Backorder'}</span>
            </div>
          </div>

          <button
            type="button"
            id={`btn-add-cart-${product.id}`}
            onClick={(e) => onAddToCart(product, e)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-sm active:scale-95"
            title="Add to OMNI Pay Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
