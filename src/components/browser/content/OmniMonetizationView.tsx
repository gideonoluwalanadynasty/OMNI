import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Tv,
  Users,
  Link2,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Lock,
  Download,
  Star,
  ExternalLink,
  Plus,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Eye,
  Percent
} from 'lucide-react';
import {
  OmniAdsConfig,
  OmniSubscriptionPlanTier,
  OmniCreatorSubscriber,
  OmniAffiliateItem,
  OmniCreatorDigitalProduct
} from '../../../types';
import { omniContentPublishingService } from '../../../sdk/browser-services/OmniContentPublishingService';

export const OmniMonetizationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ads' | 'subscriptions' | 'affiliate' | 'marketplace'>('ads');

  // Ads state
  const [adsConfig, setAdsConfig] = useState<OmniAdsConfig>(omniContentPublishingService.getAdsConfig());

  // Subscriptions state
  const [tiers, setTiers] = useState<OmniSubscriptionPlanTier[]>(omniContentPublishingService.getSubscriptionTiers());
  const [subscribers, setSubscribers] = useState<OmniCreatorSubscriber[]>(omniContentPublishingService.getSubscribers());

  // Affiliate state
  const [affiliates, setAffiliates] = useState<OmniAffiliateItem[]>(omniContentPublishingService.getAffiliates());
  const [newAffProduct, setNewAffProduct] = useState('');
  const [newAffVendor, setNewAffVendor] = useState('');
  const [newAffRate, setNewAffRate] = useState(15);
  const [newAffUrl, setNewAffUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Marketplace state
  const [marketplaceItems, setMarketplaceItems] = useState<OmniCreatorDigitalProduct[]>(
    omniContentPublishingService.getMarketplaceItems()
  );
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleAds = () => {
    const updated = omniContentPublishingService.updateAdsConfig({ adsEnabled: !adsConfig.adsEnabled });
    setAdsConfig(updated);
    showNotification(updated.adsEnabled ? 'Contextual Ads enabled.' : 'Contextual Ads disabled.');
  };

  const handleTogglePlacement = (placementKey: keyof OmniAdsConfig['adPlacements']) => {
    const updated = omniContentPublishingService.updateAdsConfig({
      adPlacements: {
        ...adsConfig.adPlacements,
        [placementKey]: !adsConfig.adPlacements[placementKey]
      }
    });
    setAdsConfig(updated);
  };

  const handleCreateAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffProduct || !newAffUrl) return;

    omniContentPublishingService.addAffiliateProduct({
      productName: newAffProduct,
      vendorName: newAffVendor || 'Partner Merchant',
      category: 'Hardware & Tools',
      commissionRate: newAffRate,
      affiliateUrl: newAffUrl,
      shortCode: newAffProduct.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 16),
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80'
    });

    setAffiliates(omniContentPublishingService.getAffiliates());
    setNewAffProduct('');
    setNewAffVendor('');
    setNewAffUrl('');
    showNotification('Created sovereign affiliate tracking shortcode.');
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(`https://store.omni.com/aff/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
    showNotification('Copied affiliate link to clipboard.');
  };

  const handleBuyMarketplaceItem = (id: string) => {
    omniContentPublishingService.unlockMarketplaceItem(id);
    setMarketplaceItems(omniContentPublishingService.getMarketplaceItems());
    showNotification('Item purchased & unlocked via OMNI Pay double-entry settlement!');
  };

  return (
    <div id="omni-monetization-view" className="space-y-6">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-emerald-950/40 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <span>OMNI MONETISATION & SOVEREIGN REVENUE SUITE</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
              0% Platform Take Rate
            </span>
          </div>
          <h2 className="text-xl font-black text-stone-100 tracking-tight">
            Ads, Paid Subscriptions, Affiliates & Marketplace Store
          </h2>
          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            Direct cryptographic monetization with instant payouts, privacy-preserving contextual ads, and paywalled reader tiers.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-1.5 rounded-2xl shrink-0 text-xs">
          {[
            { id: 'ads', label: 'OMNI Ads', icon: <Tv className="w-3.5 h-3.5" /> },
            { id: 'subscriptions', label: 'Subscriptions', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'affiliate', label: 'Affiliate Links', icon: <Link2 className="w-3.5 h-3.5" /> },
            { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag className="w-3.5 h-3.5" /> }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. TAB: OMNI ADS PLATFORM */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          {/* Revenue & RPM Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Monthly Ad Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${adsConfig.currentMonthlyEarnings.toFixed(2)}
              </div>
              <div className="text-[11px] text-stone-400">Direct double-entry settlement</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Average Contextual RPM</span>
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-indigo-400 font-mono">
                ${adsConfig.averageRpm.toFixed(2)}
              </div>
              <div className="text-[11px] text-stone-400">Per 1,000 verified impressions</div>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
              <div className="text-xs text-stone-400 flex items-center justify-between">
                <span>Verified Ad Impressions</span>
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400 font-mono">
                {adsConfig.totalAdImpressions.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400">Zero ad-fraud bot filtering</div>
            </div>
          </div>

          {/* Ad Configuration Controls */}
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                  <Tv className="w-4 h-4 text-emerald-400" />
                  <span>Privacy-Preserving Contextual Ad Engine</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Ads are matched strictly on article context without tracking cookies or cross-site fingerprinting.
                </p>
              </div>

              <button
                onClick={handleToggleAds}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${
                  adsConfig.adsEnabled ? 'bg-emerald-600' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    adsConfig.adsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Placement Toggles */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-stone-300">Active Monetisation Placements</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'inlineArticle',
                    label: 'Inline Article Native Cards',
                    desc: 'Discrete contextual sponsor callout embedded midway through long articles'
                  },
                  {
                    key: 'feedNative',
                    label: 'Discover Feed Sponsored Articles',
                    desc: 'Highlighted sponsored research articles inside OMNI Discover stream'
                  },
                  {
                    key: 'sidebarBanner',
                    label: 'Sidebar Sponsor Badge',
                    desc: 'Clean, non-intrusive sponsor banner in reader sidebar'
                  },
                  {
                    key: 'audioPreRoll',
                    label: 'Podcast Audio Sponsor Intro',
                    desc: '5-second synthetic voice sponsor acknowledgment before podcast episodes'
                  }
                ].map(p => {
                  const isChecked = adsConfig.adPlacements[p.key as keyof OmniAdsConfig['adPlacements']];
                  return (
                    <div
                      key={p.key}
                      onClick={() => handleTogglePlacement(p.key as any)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-stone-950 border-emerald-800/80 text-stone-200'
                          : 'bg-stone-950/40 border-stone-800 text-stone-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-100">{p.label}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-emerald-600 rounded"
                        />
                      </div>
                      <p className="text-[11px] text-stone-400 mt-1">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: SUBSCRIPTIONS & SUBSCRIBER CRM */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          {/* Subscription Tiers Grid */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-300 flex items-center justify-between">
              <span>Configured Subscriber Membership Tiers</span>
              <span className="text-stone-400 font-mono text-[11px]">Total MRR: $3,894.00</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tiers.map(tier => (
                <div
                  key={tier.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                    tier.isPopular
                      ? 'bg-gradient-to-b from-indigo-950/40 to-stone-900 border-indigo-700/80 shadow-xl'
                      : 'bg-stone-900/90 border-stone-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-100">{tier.tierName}</span>
                      {tier.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-stone-100 font-mono">
                        ${tier.priceMonthly}
                      </span>
                      <span className="text-xs text-stone-400">/ month</span>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed">{tier.description}</p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono text-stone-500 uppercase">Included Perks:</div>
                      {tier.perks.map((perk, idx) => (
                        <div key={idx} className="text-xs text-stone-300 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono">
                      {tier.activeSubscribersCount} active members
                    </span>
                    <span className="text-indigo-400 font-bold">Manage</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Subscribers CRM Table */}
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Subscriber Management & Engagement CRM</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 font-mono text-[11px]">
                    <th className="pb-3 font-semibold">Subscriber</th>
                    <th className="pb-3 font-semibold">Tier</th>
                    <th className="pb-3 font-semibold">Joined Date</th>
                    <th className="pb-3 font-semibold">Avg Open Rate</th>
                    <th className="pb-3 font-semibold">Lifetime Value</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {subscribers.map(sub => (
                    <tr key={sub.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="py-3 flex items-center gap-2.5">
                        <img
                          src={sub.avatar}
                          alt={sub.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-stone-700"
                        />
                        <div>
                          <div className="font-bold text-stone-200">{sub.name}</div>
                          <div className="text-[11px] text-stone-500 font-mono">{sub.email}</div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md bg-stone-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
                          {sub.tier}
                        </span>
                      </td>
                      <td className="py-3 text-stone-400 font-mono">{sub.joinedAt}</td>
                      <td className="py-3 font-mono text-emerald-400 font-bold">{sub.openRateAvg}%</td>
                      <td className="py-3 font-mono text-stone-200 font-bold">${sub.lifetimeValue}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono font-bold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB: AFFILIATE NETWORK */}
      {activeTab === 'affiliate' && (
        <div className="space-y-6">
          {/* Create Affiliate Shortcode Form */}
          <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-4">
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <span>Generate Sovereign Affiliate Tracking Link</span>
            </h3>

            <form onSubmit={handleCreateAffiliate} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-stone-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={newAffProduct}
                  onChange={e => setNewAffProduct(e.target.value)}
                  placeholder="e.g. Ledger Stax Hardware"
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-400 block mb-1">Vendor / Merchant</label>
                <input
                  type="text"
                  value={newAffVendor}
                  onChange={e => setNewAffVendor(e.target.value)}
                  placeholder="e.g. Ledger SAS"
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-400 block mb-1">Destination URL</label>
                <input
                  type="url"
                  value={newAffUrl}
                  onChange={e => setNewAffUrl(e.target.value)}
                  placeholder="https://ledger.com/stax"
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded-xl text-stone-200"
                  required
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Link</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Affiliate Products List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {affiliates.map(aff => {
              const isCopied = copiedCode === aff.shortCode;
              return (
                <div
                  key={aff.id}
                  className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950">
                      <img
                        src={aff.imageUrl}
                        alt={aff.productName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 text-emerald-300 text-[10px] font-mono font-bold">
                        {aff.commissionRate}% Commission
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-stone-400">{aff.vendorName}</div>
                      <h4 className="text-sm font-bold text-stone-100 leading-snug">{aff.productName}</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                        <div className="font-bold text-stone-200">{aff.totalClicks}</div>
                        <div className="text-[10px] text-stone-500">Clicks</div>
                      </div>
                      <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                        <div className="font-bold text-indigo-400">{aff.conversions}</div>
                        <div className="text-[10px] text-stone-500">Sales</div>
                      </div>
                      <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                        <div className="font-bold text-emerald-400">${aff.earnedCommission}</div>
                        <div className="text-[10px] text-stone-500">Earned</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleCopy(aff.shortCode)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-400" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-stone-500">/aff/{aff.shortCode}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB: CREATOR DIGITAL MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Creator Digital Products & Course Marketplace</span>
              </h3>
              <p className="text-xs text-stone-400">
                Sell downloadable blueprints, interactive courses, spreadsheet models, and audio production packs directly to your audience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {marketplaceItems.map(item => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-950">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 text-amber-300 text-[10px] font-mono font-bold uppercase">
                      {item.category}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-400">{item.authorName}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                        <span className="text-stone-500">({item.reviewsCount})</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-stone-100 leading-snug">{item.title}</h4>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-1 pt-1">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="text-[11px] text-stone-300 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-emerald-400 font-mono">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-stone-500">{item.salesCount} purchases</div>
                  </div>

                  {item.isUnlocked ? (
                    <button className="px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <Download className="w-4 h-4" />
                      <span>Download Assets</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuyMarketplaceItem(item.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Buy via OMNI Pay</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
