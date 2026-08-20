import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Star,
  ShieldCheck,
  Tag,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Calendar,
  ShoppingBag,
  Users,
  Briefcase,
  Play,
  FileText,
  Video,
  UserCheck,
  CheckCircle2,
  Filter,
  X,
  Compass
} from 'lucide-react';
import {
  OmniSearchEntityType,
  OmniSearchMode,
  OmniSearchSortOrder,
  OmniSearchFilterState,
  OmniSearchResultItem,
  OmniRecommendationPrivacyConsent
} from '../../../types/omni_discovery';
import { SEED_SEARCH_ITEMS, executeOmniSearch } from './discoveryData';

interface OmniUniversalSearchProps {
  initialQuery?: string;
  initialEntityType?: OmniSearchEntityType;
  privacyConsent: OmniRecommendationPrivacyConsent;
  onSelectItem?: (item: OmniSearchResultItem) => void;
  onNavigateToBusiness?: () => void;
}

export const OmniUniversalSearch: React.FC<OmniUniversalSearchProps> = ({
  initialQuery = '',
  initialEntityType = 'all',
  privacyConsent,
  onSelectItem,
  onNavigateToBusiness
}) => {
  const [filterState, setFilterState] = useState<OmniSearchFilterState>({
    query: initialQuery,
    mode: 'ai_search',
    entityType: initialEntityType,
    sortBy: 'relevance',
    verifiedOnly: false,
    priceFilter: 'all',
    locationFilter: 'all',
    languageFilter: 'all',
    minRating: 0,
    dateRange: 'all',
    availability: 'all'
  });

  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [selectedItemDetail, setSelectedItemDetail] = useState<OmniSearchResultItem | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const entityTabs: { type: OmniSearchEntityType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { type: 'all', label: 'All Entities (11)', icon: Compass },
    { type: 'people', label: 'People', icon: Users },
    { type: 'businesses', label: 'Businesses', icon: Briefcase },
    { type: 'creators', label: 'Creators', icon: Sparkles },
    { type: 'communities', label: 'Communities', icon: Users },
    { type: 'posts', label: 'Posts & Articles', icon: FileText },
    { type: 'videos', label: 'Videos & Moments', icon: Video },
    { type: 'products', label: 'Products', icon: ShoppingBag },
    { type: 'services', label: 'Services', icon: Briefcase },
    { type: 'courses', label: 'Courses', icon: BookOpen },
    { type: 'events', label: 'Events', icon: Calendar },
    { type: 'documents', label: 'Documents', icon: FileText }
  ];

  const searchResults = useMemo(() => {
    return executeOmniSearch(SEED_SEARCH_ITEMS, filterState, privacyConsent);
  }, [filterState, privacyConsent]);

  const handleActionClick = (item: OmniSearchResultItem) => {
    setActionSuccessMessage(`Successfully executed action "${item.actionLabel}" for ${item.title}`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
    if (onSelectItem) onSelectItem(item);
  };

  const getEntityIcon = (type: OmniSearchEntityType) => {
    switch (type) {
      case 'people': return <UserCheck className="w-4 h-4 text-sky-400" />;
      case 'businesses': return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'creators': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'communities': return <Users className="w-4 h-4 text-indigo-400" />;
      case 'posts': return <FileText className="w-4 h-4 text-slate-400" />;
      case 'videos': return <Play className="w-4 h-4 text-rose-400" />;
      case 'products': return <ShoppingBag className="w-4 h-4 text-teal-400" />;
      case 'services': return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'courses': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'events': return <Calendar className="w-4 h-4 text-orange-400" />;
      case 'documents': return <FileText className="w-4 h-4 text-cyan-400" />;
      default: return <Compass className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6" id="omni-universal-search-container">
      {/* Top Banner with Search Mode Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Universal Ecosystem Search
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
                11 Entity Indices Active
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">Universal OMNI Search Engine</h2>
            <p className="text-xs text-slate-400">
              Query people, businesses, creators, spaces, moments, products, services, courses, and cryptographic docs across the global sovereign mesh.
            </p>
          </div>

          {/* Search Mode Segmented Switch */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              id="search-mode-ai"
              onClick={() => setFilterState(prev => ({ ...prev, mode: 'ai_search' }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                filterState.mode === 'ai_search'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Search (Gemini)
            </button>
            <button
              id="search-mode-semantic"
              onClick={() => setFilterState(prev => ({ ...prev, mode: 'semantic' }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                filterState.mode === 'semantic'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semantic Vector
            </button>
            <button
              id="search-mode-keyword"
              onClick={() => setFilterState(prev => ({ ...prev, mode: 'keyword' }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                filterState.mode === 'keyword'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Keyword Exact
            </button>
          </div>
        </div>

        {/* Big Search Input Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="omni-search-main-input"
            type="text"
            value={filterState.query}
            onChange={(e) => setFilterState(prev => ({ ...prev, query: e.target.value }))}
            placeholder="Search anything: 'Dr. Elena', 'Smart contract audit', 'Hardware node', 'AI agent tutorial', 'Developer summit'..."
            className="w-full pl-12 pr-28 py-3.5 bg-slate-950/90 border border-slate-700/80 hover:border-slate-600 focus:border-indigo-500 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
          />
          <div className="absolute inset-y-0 right-2 flex items-center gap-1.5">
            {filterState.query && (
              <button
                onClick={() => setFilterState(prev => ({ ...prev, query: '' }))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              id="toggle-filter-drawer-btn"
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                showFilterDrawer || filterState.verifiedOnly || filterState.minRating > 0 || filterState.priceFilter !== 'all'
                  ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {(filterState.verifiedOnly || filterState.minRating > 0 || filterState.priceFilter !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              )}
            </button>
          </div>
        </div>

        {/* Entity Type Horizontal Scroll Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {entityTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = filterState.entityType === tab.type;
            return (
              <button
                key={tab.type}
                id={`entity-filter-${tab.type}`}
                onClick={() => setFilterState(prev => ({ ...prev, entityType: tab.type }))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 border transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-1">
          <span className="text-slate-500 font-medium">Suggested queries:</span>
          {['AI Agents', 'Elena Rostova', 'Aegis Security', 'Developer Summit', 'Hardware Node', 'Treasury BaaS'].map(sug => (
            <button
              key={sug}
              onClick={() => setFilterState(prev => ({ ...prev, query: sug }))}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 hover:text-indigo-300 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Drawer / Accordion */}
      {showFilterDrawer && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              Advanced Multi-Criteria Filtering & Ranking
            </h3>
            <button
              onClick={() => setFilterState(prev => ({
                ...prev,
                verifiedOnly: false,
                priceFilter: 'all',
                locationFilter: 'all',
                minRating: 0,
                sortBy: 'relevance'
              }))}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Sort Order */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Rank & Sort By</label>
              <select
                value={filterState.sortBy}
                onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as OmniSearchSortOrder }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="relevance">Relevance Score</option>
                <option value="engagement">Engagement Velocity</option>
                <option value="affinity">Relationship Affinity</option>
                <option value="rating">Top Rated (Stars)</option>
                <option value="recency">Newest & Recent</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Pricing Model</label>
              <select
                value={filterState.priceFilter}
                onChange={(e) => setFilterState(prev => ({ ...prev, priceFilter: e.target.value as any }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Pricing Tiers</option>
                <option value="free">Free / Open Access</option>
                <option value="paid">Paid / Commercial</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium">Minimum Rating</label>
              <select
                value={filterState.minRating}
                onChange={(e) => setFilterState(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="0">Any Rating</option>
                <option value="4.5">★ 4.5 & Above</option>
                <option value="4.8">★ 4.8 & Above</option>
              </select>
            </div>

            {/* Verified Toggle */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filterState.verifiedOnly}
                  onChange={(e) => setFilterState(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-semibold text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Entities Only
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Action Banner Notification */}
      {actionSuccessMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {actionSuccessMessage}
        </div>
      )}

      {/* Generative AI Search Overview (if AI Search mode active and query entered) */}
      {searchResults.aiSummary && filterState.mode === 'ai_search' && (
        <div className="bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">
                OMNI AI Generative Synthesis (Gemini 2.5)
              </h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-mono">
              Confidence: 99.4%
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{searchResults.aiSummary}</p>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{searchResults.results.length}</strong> verified ecosystem items
          {filterState.query ? ` matching "${filterState.query}"` : ''}
        </span>
        <span className="text-slate-500">
          Ranked by <strong className="text-slate-300 capitalize">{filterState.sortBy}</strong> • Sub-18ms Index
        </span>
      </div>

      {/* Results Grid */}
      {searchResults.results.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-white">No items found for "{filterState.query}"</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search keywords, switching entity tabs, or resetting filter constraints.
          </p>
          <button
            onClick={() => setFilterState({
              query: '',
              mode: 'ai_search',
              entityType: 'all',
              sortBy: 'relevance',
              verifiedOnly: false,
              priceFilter: 'all',
              locationFilter: 'all',
              languageFilter: 'all',
              minRating: 0,
              dateRange: 'all',
              availability: 'all'
            })}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="omni-search-results-grid">
          {searchResults.results.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200 group"
            >
              <div className="space-y-3.5">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.title}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-700 flex-shrink-0"
                      />
                    ) : item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-10 h-10 rounded-2xl object-cover border border-slate-700 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                        {getEntityIcon(item.entityType)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </h4>
                        {item.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" title="Cryptographically Verified" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 flex-shrink-0">
                    {getEntityIcon(item.entityType)}
                    {item.entityType}
                  </span>
                </div>

                {/* Media preview if available */}
                {item.imageUrl && !item.avatarUrl && (
                  <div className="rounded-2xl overflow-hidden h-36 border border-slate-800">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Meta details (Rating, Location, Price) */}
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-[10px] text-slate-500 py-0.5">+{item.tags.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono">
                  <span>Match: {item.relevanceScore}%</span>
                  <span className="text-slate-600">•</span>
                  <span>Affinity: {item.affinityScore}%</span>
                </div>
                <button
                  id={`search-action-${item.id}`}
                  onClick={() => handleActionClick(item)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
                >
                  {item.actionLabel}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
