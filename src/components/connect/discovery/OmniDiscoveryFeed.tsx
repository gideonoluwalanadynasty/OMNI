import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
  BookOpen,
  Calendar,
  ShoppingBag,
  Video,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Sliders,
  CheckCircle2,
  Lock,
  Eye,
  Heart,
  Share2
} from 'lucide-react';
import {
  OmniDiscoveryCategory,
  OmniSearchResultItem,
  OmniRecommendationPrivacyConsent
} from '../../../types/omni_discovery';
import { SEED_SEARCH_ITEMS } from './discoveryData';

interface OmniDiscoveryFeedProps {
  privacyConsent: OmniRecommendationPrivacyConsent;
  onOpenSearchCategory: (category: string) => void;
  onOpenPrivacySettings: () => void;
  onNavigateToBusiness: () => void;
}

export const OmniDiscoveryFeed: React.FC<OmniDiscoveryFeedProps> = ({
  privacyConsent,
  onOpenSearchCategory,
  onOpenPrivacySettings,
  onNavigateToBusiness
}) => {
  const [activeCategory, setActiveCategory] = useState<OmniDiscoveryCategory>('for_you');
  const [notification, setNotification] = useState<string | null>(null);

  const categories: { id: OmniDiscoveryCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'for_you', label: 'For You (AI Match)', icon: Sparkles },
    { id: 'trending', label: 'Trending Velocity', icon: TrendingUp },
    { id: 'people', label: 'People & Mentors', icon: Users },
    { id: 'communities', label: 'Communities & Spaces', icon: Users },
    { id: 'businesses', label: 'Businesses & Hubs', icon: Briefcase },
    { id: 'creators', label: 'Creators & VIPs', icon: Sparkles },
    { id: 'products', label: 'Products & Hardware', icon: ShoppingBag },
    { id: 'services', label: 'Services & Audits', icon: Briefcase },
    { id: 'courses', label: 'Courses & Cohorts', icon: BookOpen },
    { id: 'events', label: 'Events & Summits', icon: Calendar }
  ];

  const handleAction = (item: OmniSearchResultItem) => {
    setNotification(`Action completed: ${item.actionLabel} for "${item.title}"`);
    setTimeout(() => setNotification(null), 3500);
  };

  const getFilteredItems = () => {
    if (activeCategory === 'for_you') {
      return SEED_SEARCH_ITEMS.filter(item => item.affinityScore >= 85);
    }
    if (activeCategory === 'trending') {
      return [...SEED_SEARCH_ITEMS].sort((a, b) => b.engagementScore - a.engagementScore);
    }
    return SEED_SEARCH_ITEMS.filter(item => item.entityType === activeCategory);
  };

  const items = getFilteredItems();

  return (
    <div className="space-y-6" id="omni-discovery-feed-container">
      {/* Discovery Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                <Compass className="w-3 h-3" />
                OMNI Discover
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Zero Foundation Training
              </span>
            </div>
            <h2 className="text-xl font-black text-white">Ecosystem Discovery & Recommendation Mesh</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Curated by 8 sovereign signals (Interests, Relationships, Engagement, Spaces, Transactions, Geolocation, and Language) with 100% user consent compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrivacySettings}
              className="px-3.5 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Signal Weights & Privacy
            </button>
            <button
              onClick={onNavigateToBusiness}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Business Directory
            </button>
          </div>
        </div>

        {/* 8-Signal Transparency Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-[10px]">
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Interests</span>
            <span className="text-indigo-400 font-bold">25% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Social Graph</span>
            <span className="text-indigo-400 font-bold">20% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Engagement</span>
            <span className="text-indigo-400 font-bold">15% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Communities</span>
            <span className="text-indigo-400 font-bold">10% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Watch & Dwell</span>
            <span className="text-indigo-400 font-bold">10% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Purchases</span>
            <span className="text-indigo-400 font-bold">10% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Location</span>
            <span className="text-indigo-400 font-bold">5% Weight</span>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 text-center">
            <span className="text-slate-400 block font-medium">Language</span>
            <span className="text-indigo-400 font-bold">5% Weight</span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`discover-tab-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {notification}
        </div>
      )}

      {/* Discovery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="omni-discovery-items-grid">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              {/* Card Top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt={item.title} className="w-10 h-10 rounded-2xl object-cover border border-slate-700" />
                  ) : item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-2xl object-cover border border-slate-700" />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                      {item.title.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h4>
                      {item.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{item.subtitle}</p>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 font-bold capitalize flex-shrink-0">
                  {item.entityType}
                </span>
              </div>

              {/* Cover Image if available */}
              {item.imageUrl && !item.avatarUrl && (
                <div className="rounded-2xl overflow-hidden h-36 border border-slate-800">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                {item.rating && (
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {item.rating} ({item.reviewCount || 0})
                  </span>
                )}
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {item.location}
                  </span>
                )}
                {item.priceDisplay && (
                  <span className="text-emerald-400 font-bold">
                    {item.priceDisplay}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Action Section */}
            <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[10px] text-slate-400 font-mono">
                <span className="text-indigo-400 font-bold">{item.affinityScore}%</span> AI Match
              </div>
              <button
                onClick={() => handleAction(item)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
              >
                {item.actionLabel}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
