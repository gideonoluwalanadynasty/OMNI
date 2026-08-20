import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Plus,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Users,
  Star,
  Settings,
  Sparkles,
  Zap,
  Globe,
  Upload,
  Calendar,
  Clock
} from 'lucide-react';
import {
  CommerceProduct,
  ProductArchetype,
  SellerAnalytics,
  ProductVariantOption
} from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  products: CommerceProduct[];
  analytics: SellerAnalytics;
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onCreateProduct: (product: CommerceProduct) => void;
}

export const OmniSellerDashboardView: React.FC<Props> = ({
  products,
  analytics,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onCreateProduct
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProductArchetype, setNewProductArchetype] = useState<ProductArchetype>('physical');

  // Form State
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [priceUsd, setPriceUsd] = useState(199);
  const [compareAtPriceUsd, setCompareAtPriceUsd] = useState(249);
  const [inventoryCount, setInventoryCount] = useState(50);
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80');
  const [tagsInput, setTagsInput] = useState('hardware, nfc, security');
  const [creationSuccessMsg, setCreationSuccessMsg] = useState<string | null>(null);

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

  const sellerProducts = products.filter(p => p.sellerId === activeProfile.id || p.sellerStoreSlug === 'aethelgard-lab');

  const handleSaveProduct = () => {
    if (!name.trim()) return;

    const newProd: CommerceProduct = {
      id: `prod-${Date.now()}`,
      sellerId: activeProfile.id,
      sellerName: activeProfile.displayName,
      sellerStoreSlug: 'storefront',
      sellerAvatar: activeProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      archetype: newProductArchetype,
      name,
      headline: headline || name,
      description: description || 'High performance item curated on OMNI Network.',
      category,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      priceUsd: Number(priceUsd),
      compareAtPriceUsd: compareAtPriceUsd ? Number(compareAtPriceUsd) : undefined,
      currency: selectedCurrency,
      inventoryCount: Number(inventoryCount),
      mediaUrls: [mediaUrl],
      variants: [],
      shippingInfo: newProductArchetype === 'physical' ? {
        weightKg: 0.3,
        originCountry: 'United Kingdom',
        freeShippingThresholdUsd: 200,
        estimatedDeliveryDays: { min: 2, max: 5 },
        methods: [
          { id: 'ship-std', name: 'Standard Tracked Shipping', costUsd: 15, carrier: 'DHL Express' }
        ]
      } : undefined,
      availability: 'in_stock',
      salesCount: 0,
      isFeaturedMarketplace: true,
      isOmniPrimeEligible: true,
      attachedSocialMediaCount: 0,
      sellerBadge: 'verified_creator',
      sellerRating: 5.0,
      averageRating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onCreateProduct(newProd);
    setShowCreateModal(false);
    setCreationSuccessMsg(`Product "${name}" successfully deployed to OMNI Marketplace.`);
    setTimeout(() => setCreationSuccessMsg(null), 3500);

    // Reset
    setName('');
    setHeadline('');
    setDescription('');
  };

  return (
    <div id="omni-seller-dashboard-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              MERCHANT & CREATOR CONSOLE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
            OMNI Seller Portal & Business Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Manage your sovereign multi-archetype catalogue, inventory alerts, escrow settlements, and customer CRM synchronization.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Product (9 Archetypes)
        </button>
      </div>

      {creationSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{creationSuccessMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {formatPrice(analytics.totalRevenueUsd)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
            <span>+{analytics.growthRateMonthOverMonth}% vs last month</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Payouts</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-indigo-300 mt-1">
            {formatPrice(analytics.netEarningsUsd)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Settled via OMNI Finance OS
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Orders Settled</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {analytics.totalOrdersCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Avg Order Value: {formatPrice(analytics.averageOrderValueUsd)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Escrow Guarantee Balance</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            {formatPrice(analytics.escrowPendingPayoutUsd)}
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1">
            Auto-releases upon parcel delivery
          </div>
        </div>
      </div>

      {/* Archetype Sales Breakdown Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Revenue Contribution by Product Archetype
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {(Object.entries(analytics.salesByArchetype) as [string, number][]).map(([arch, amount]) => (
            <div key={arch} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-500/20">
                {arch}
              </span>
              <div className="text-base font-bold text-white">{formatPrice(amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Inventory & Products Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-400" />
            Active Catalogue Inventory ({sellerProducts.length} Items)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Archetype</th>
                <th className="p-3">Price</th>
                <th className="p-3">Inventory</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sellerProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.mediaUrls[0]} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <span className="font-bold text-white">{p.name}</span>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/30">
                      {p.archetype}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white">{formatPrice(p.priceUsd)}</td>
                  <td className="p-3">
                    {p.inventoryCount < 10 ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {p.inventoryCount} units
                      </span>
                    ) : (
                      <span className="text-slate-300">{p.inventoryCount} units</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{p.averageRating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW PRODUCT MODAL (9 ARCHETYPES) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Create Catalogue Item</h3>
                <p className="text-xs text-slate-400">Select any of the 9 sovereign OMNI product archetypes.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Archetype Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Choose Product Archetype:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'physical', label: '📦 Physical Good' },
                  { key: 'digital', label: '💻 Digital SDK / Asset' },
                  { key: 'course', label: '🎓 Masterclass Course' },
                  { key: 'service', label: '🛠️ Professional Service' },
                  { key: 'subscription', label: '⚡ Recurring Sub' },
                  { key: 'appointment', label: '🗓️ 1:1 Consultation' },
                  { key: 'ticket', label: '🎟️ Event Ticket' },
                  { key: 'donation', label: '💝 Creator Patronage' },
                  { key: 'membership', label: '👑 VIP Membership' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setNewProductArchetype(item.key as ProductArchetype)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left transition border ${
                      newProductArchetype === item.key
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sovereign Biometric Titanium Card"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Headline Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Ultra-fast hardware key with zero-knowledge credentials"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  rows={3}
                  placeholder="Full technical specifications or course curriculum..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full mt-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Price ($ USD)</label>
                  <input
                    type="number"
                    value={priceUsd}
                    onChange={e => setPriceUsd(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Compare At Price ($)</label>
                  <input
                    type="number"
                    value={compareAtPriceUsd}
                    onChange={e => setCompareAtPriceUsd(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Initial Stock</label>
                  <input
                    type="number"
                    value={inventoryCount}
                    onChange={e => setInventoryCount(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Cover Image URL</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={e => setMediaUrl(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 text-xs font-semibold text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg transition"
              >
                Publish to OMNI Marketplace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
