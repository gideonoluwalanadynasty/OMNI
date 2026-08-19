import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Search,
  DollarSign,
  Download,
  CreditCard
} from 'lucide-react';
import { ConnectCommerceProduct, ConnectProfile } from '../../types/omni_connect';

interface Props {
  products: ConnectCommerceProduct[];
  activeProfile: ConnectProfile;
  onPurchase: (productId: string) => void;
}

export const OmniConnectMarketplaceView: React.FC<Props> = ({
  products,
  activeProfile,
  onPurchase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  const handleBuy = (id: string) => {
    onPurchase(id);
    setPurchasedId(id);
    setTimeout(() => setPurchasedId(null), 4000);
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="omni-connect-marketplace-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                1-CLICK OMNI PAY CHECKOUT
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-indigo-400" />
              Social Commerce & Sovereign Storefronts
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Buy digital downloads, developer SDKs, courses, services, and verified tickets directly from creators and enterprises with escrow protection.
            </p>
          </div>

          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search storefront..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {purchasedId && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Purchase completed! Settled atomically through OMNI Finance OS multi-currency wallet with instant digital delivery.</span>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            id={`product-card-${prod.id}`}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-slate-950">
                <img
                  src={prod.mediaUrls[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80'}
                  alt={prod.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  ${prod.priceUsd.toFixed(2)} {prod.currency}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-indigo-400">{prod.sellerName}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {prod.sellerRating.toFixed(1)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{prod.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{prod.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 pt-3 border-t border-slate-800">
                <span>{prod.salesCount} orders settled</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
                </span>
              </div>

              <button
                id={`btn-buy-product-${prod.id}`}
                onClick={() => handleBuy(prod.id)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <CreditCard className="w-4 h-4" />
                <span>1-Click OmniPay Buy (${prod.priceUsd.toFixed(2)})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
