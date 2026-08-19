import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Check,
  X,
  ShoppingBag,
  Star,
  ShieldCheck,
  Info,
  ExternalLink,
  Award,
  Zap,
  TrendingDown
} from 'lucide-react';
import { OmniMarketProduct, OmniProductComparisonMatrix } from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniProductComparisonViewProps {
  productIds: string[];
  onBack: () => void;
  onSelectProduct: (product: OmniMarketProduct) => void;
  onAddToCart: (product: OmniMarketProduct) => void;
  onRemoveFromCompare: (productId: string) => void;
}

export const OmniProductComparisonView: React.FC<OmniProductComparisonViewProps> = ({
  productIds,
  onBack,
  onSelectProduct,
  onAddToCart,
  onRemoveFromCompare
}) => {
  const products = productIds
    .map(id => omniCommerceService.getProductById(id))
    .filter((p): p is OmniMarketProduct => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <Layers className="w-12 h-12 text-stone-600 mx-auto" />
        <h3 className="text-base font-bold text-stone-300">No Products Selected for Comparison</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Add up to 4 sovereign hardware items to view side-by-side technical teardowns and AI trade-off analysis.
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const comparisonMatrix: OmniProductComparisonMatrix = omniCommerceService.generateComparisonMatrix(
    products.map(p => p.id)
  );

  return (
    <div id="omni-product-comparison-view" className="w-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Multi-Product Technical Comparison Matrix</span>
            </h2>
            <p className="text-xs text-stone-400">
              Side-by-side architecture, latency, pricing, and sovereign security teardown.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-stone-400">
          Comparing {products.length} Items
        </div>
      </div>

      {/* AI Executive Verdict */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-stone-900 border border-indigo-500/40 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>OMNI Shopping Intelligence AI Verdict</span>
          </div>
          <span className="text-[11px] font-mono text-indigo-300/70">
            Real-Time Analysis
          </span>
        </div>

        <p className="text-xs text-stone-200 leading-relaxed font-medium">
          {comparisonMatrix.aiExecutiveSummary}
        </p>

        <div className="text-xs text-stone-300 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
          <span className="font-bold text-indigo-300">Price-to-Value Delta: </span>
          {comparisonMatrix.priceTradeoffAnalysis}
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[700px] border border-stone-800 rounded-2xl bg-stone-900 overflow-hidden shadow-2xl">
          {/* Header Row: Products */}
          <div className="grid grid-cols-12 bg-stone-950 border-b border-stone-800 p-4 gap-4 items-start">
            <div className="col-span-3 text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center h-full">
              Attributes / Models
            </div>

            {products.map(product => {
              const isBestOverall = comparisonMatrix.bestOverallProductId === product.id;
              const isBestBudget = comparisonMatrix.bestBudgetProductId === product.id;

              return (
                <div key={product.id} className={`${products.length === 2 ? 'col-span-4' : products.length === 3 ? 'col-span-3' : 'col-span-2'} space-y-2 relative`}>
                  <button
                    onClick={() => onRemoveFromCompare(product.id)}
                    className="absolute -top-1 -right-1 p-1 rounded-full bg-stone-800 hover:bg-rose-900 text-stone-400 hover:text-rose-200 border border-stone-700 transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {isBestOverall && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px] uppercase">
                      <Award className="w-3 h-3" />
                      Top Pick
                    </span>
                  )}
                  {isBestBudget && !isBestOverall && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase">
                      <TrendingDown className="w-3 h-3" />
                      Best Value
                    </span>
                  )}

                  <h4
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-bold text-stone-100 hover:text-indigo-300 cursor-pointer line-clamp-2"
                  >
                    {product.title}
                  </h4>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-extrabold text-stone-100">${product.price.toFixed(2)}</span>
                    <div className="flex items-center text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {product.rating}
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Feature Rows */}
          <div className="divide-y divide-stone-800/60">
            {comparisonMatrix.features.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-12 p-3.5 gap-4 items-center hover:bg-stone-800/40 transition-colors text-xs">
                <div className="col-span-3 font-semibold text-stone-300">
                  {feature.featureName}
                </div>

                {products.map(product => {
                  const val = feature.values[product.id] || '—';
                  return (
                    <div key={product.id} className={`${products.length === 2 ? 'col-span-4' : products.length === 3 ? 'col-span-3' : 'col-span-2'} font-mono text-stone-200`}>
                      {val}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Seller & Escrow Row */}
            <div className="grid grid-cols-12 p-3.5 gap-4 items-center bg-stone-950/40 text-xs">
              <div className="col-span-3 font-semibold text-stone-300">
                Seller Trust & Escrow
              </div>

              {products.map(product => (
                <div key={product.id} className={`${products.length === 2 ? 'col-span-4' : products.length === 3 ? 'col-span-3' : 'col-span-2'} text-stone-300 space-y-1`}>
                  <div className="font-bold text-indigo-400">{product.sellerName}</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    {product.sellerTrustScore}% Trust Score
                  </div>
                </div>
              ))}
            </div>

            {/* Warranty & Return Policy Row */}
            <div className="grid grid-cols-12 p-3.5 gap-4 items-center text-xs">
              <div className="col-span-3 font-semibold text-stone-300">
                Warranty & Return Terms
              </div>

              {products.map(product => (
                <div key={product.id} className={`${products.length === 2 ? 'col-span-4' : products.length === 3 ? 'col-span-3' : 'col-span-2'} text-stone-400 text-[11px]`}>
                  <div>{product.warrantyMonths} Months Hardware Warranty</div>
                  <div className="text-stone-300 font-medium">{product.returnPolicyDays} Days Free Return</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
