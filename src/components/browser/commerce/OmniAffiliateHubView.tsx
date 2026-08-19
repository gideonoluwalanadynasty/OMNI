import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  DollarSign,
  TrendingUp,
  Award,
  Link,
  QrCode,
  Copy,
  Check,
  Plus,
  Sparkles,
  Zap,
  Tag,
  Users,
  ShieldCheck
} from 'lucide-react';
import {
  OmniAffiliateLink,
  OmniAffiliateStats,
  OmniMarketProduct
} from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniAffiliateHubViewProps {
  onBack: () => void;
  onSelectProduct: (product: OmniMarketProduct) => void;
}

export const OmniAffiliateHubView: React.FC<OmniAffiliateHubViewProps> = ({
  onBack,
  onSelectProduct
}) => {
  const [stats, setStats] = useState<OmniAffiliateStats>(omniCommerceService.getAffiliateStats());
  const [links, setLinks] = useState<OmniAffiliateLink[]>(omniCommerceService.getAffiliateLinks());

  // Link generator modal
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('prod_neural_tpu_v4');
  const [campaignName, setCampaignName] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const allProducts = omniCommerceService.getProducts();

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = omniCommerceService.createAffiliateLink(selectedProductId, campaignName);
    setLinks([newLink, ...links]);
    setStats(omniCommerceService.getAffiliateStats());
    setCampaignName('');
    setShowGenerateModal(false);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div id="omni-affiliate-hub-view" className="w-full space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Marketplace</span>
          </button>
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-400" />
              <span>OMNI Sovereign Affiliate & Creator Network</span>
            </h2>
            <p className="text-xs text-stone-400">
              Zero-cookie cryptographic attribution • Instant commission payouts via OMNI Pay
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowGenerateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Tracking Link</span>
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-stone-100 font-mono">
            ${stats.totalEarningsUsd.toFixed(2)}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold">
            +${stats.pendingPayoutUsd.toFixed(2)} pending next settlement
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Creator Tier</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-amber-300">
            {stats.tier}
          </div>
          <div className="text-[10px] text-stone-400">
            Commission Rate: up to 25%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Audience Clicks</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-stone-100 font-mono">
            {stats.totalClicks.toLocaleString()}
          </div>
          <div className="text-[10px] text-stone-400">
            From {stats.activeLinksCount} active links
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-300 font-mono">
            {stats.conversionRate}%
          </div>
          <div className="text-[10px] text-stone-400">
            {stats.totalConversions} confirmed sales
          </div>
        </div>
      </div>

      {/* Zero-Cookie Cryptographic Tracking Guarantee */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-900/60 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold text-indigo-200">Zero-Cookie Sovereign Attribution Protocol</span>
            <p className="text-stone-300">
              Unlike legacy surveillance affiliate networks, OMNI links use cryptographic referral hashes. No user telemetry or cross-site tracking cookies are ever dropped.
            </p>
          </div>
        </div>
      </div>

      {/* Active Affiliate Links List */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
        <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
          <Link className="w-4 h-4 text-indigo-400" />
          <span>Active Referral Links & Attribution Metrics</span>
        </h3>

        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-100">{link.customCampaignName}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-mono border border-indigo-800">
                    {link.commissionPercent}% Commission
                  </span>
                </div>
                <div className="text-stone-400 truncate">{link.productTitle}</div>
                <div className="font-mono text-stone-500 text-[11px] truncate max-w-md">
                  {link.fullUrl}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-emerald-400 font-mono">${link.totalEarningsUsd.toFixed(2)}</div>
                  <div className="text-[10px] text-stone-500">{link.clicks} clicks • {link.conversions} sales</div>
                </div>

                <button
                  onClick={() => handleCopy(link.fullUrl, link.id)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedLink === link.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Tracking Link Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form onSubmit={handleCreateLink} className="max-w-md w-full p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 shadow-2xl">
            <h4 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Generate Sovereign Affiliate Link</span>
            </h4>

            <div className="space-y-1 text-xs">
              <label className="text-stone-400 font-medium">Select Catalog Item</label>
              <select
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs"
              >
                {allProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} (${p.price.toFixed(2)} - {p.affiliateCommissionRate}% Comm)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-stone-400 font-medium">Campaign / Platform Name</label>
              <input
                type="text"
                placeholder="e.g. YouTube Review, Tech Blog, Podcast"
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-400 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                Generate Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
